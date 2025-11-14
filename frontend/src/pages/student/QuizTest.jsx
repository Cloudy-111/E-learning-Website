// src/pages/QuizTest.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Clock, Check } from "lucide-react";
import { isLoggedIn, requireAuth } from "../../utils/auth";
import { http } from "../../utils/http";

/* ===== Theme ===== */
const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";

/* ===== Helpers ===== */
const fmtTime = (s) => {
  if (typeof s !== "number" || Number.isNaN(s) || s < 0) return "--:--";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

const safeJSON = {
  get(k, fb) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : fb;
    } catch {
      return fb;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
  del(k) {
    try {
      localStorage.removeItem(k);
    } catch {}
  },
};

/* ===== Chuẩn hoá dữ liệu câu hỏi từ API /api/{examId}/question-exams/for-exam =====
  Input mẫu:
  {
    status: "success",
    message: "...",
    data: [
      {
        id, examId, content, imageUrl, type, score, isRequired, order, isNewest,
        choices: [{ id, questionExamId, content }, ...]
      }, ...
    ]
  }
  Output cho UI:
    sections = [{ id: "SEC", title: "Bài thi" }]
    questionsBySec = {
      SEC: [{
        id,                 // question id
        num,                // số thứ tự (order hoặc index + 1)
        type,               // "TrueFalse" | "MultiSelectChoice" | ...
        question,           // content
        imageUrl,           // (nếu có)
        options: [{ id, label }],  // dùng id để submit
      }, ...]
    }
*/
function normalizeForExamPayload(payload) {
  const raw = Array.isArray(payload?.data) ? payload.data : [];
  const items = raw.map((q, idx) => ({
    id: q.id,
    num: (q?.order ?? idx) + 1,
    type: q?.type || "SingleChoice",
    question: q?.content || `Câu hỏi ${idx + 1}`,
    imageUrl: q?.imageUrl || null,
    options: Array.isArray(q?.choices)
      ? q.choices.map((c) => ({ id: c.id, label: c.content }))
      : [],
  }));
  return {
    sections: [{ id: "SEC", title: "Bài thi" }],
    questionsBySec: { SEC: items },
  };
}

/* ===== Component chính ===== */
export default function QuizTest() {
  const { id: examId, attemptId } = useParams(); // route: /exam/:id/start/:attemptId (hoặc /exam/:id/start)
  const navigate = useNavigate();
  const location = useLocation();

  /* ===== API config ===== */
  const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
  const EXAM_URL = `${API_BASE}/api/exams/${examId}`;
  const QUESTIONS_URL = `${API_BASE}/api/${examId}/question-exams/for-exam`;
  const SUBMIT_URL = `${API_BASE}/api/submit/${examId}`;

  /* ===== RESTORE KEY (mỗi attempt một key riêng) ===== */
  const LS_KEY = `attempt_${examId}_${attemptId || "default"}`;
  const restored = safeJSON.get(LS_KEY, null);

  /* ===== STATES ===== */
  // answers: với SingleChoice → { [num]: choiceId }
  //          với MultiSelectChoice → { [num]: Set<choiceId> } (lưu tạm Set, khi persist chuyển thành mảng)
  const [answers, setAnswers] = useState(restored?.answers || {});
  const [submitted, setSubmitted] = useState(!!restored?.submitted || false);
  const [section, setSection] = useState(restored?.section || "SEC");
  const [timeLeft, setTimeLeft] = useState(
    typeof restored?.timeLeft === "number" ? restored.timeLeft : null
  );

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // dữ liệu đã chuẩn hoá từ server
  const [sections, setSections] = useState([{ id: "SEC", title: "Bài thi" }]);
  const [questionsBySec, setQuestionsBySec] = useState({ SEC: [] });
  const [canClientGrade] = useState(false); // for-exam KHÔNG trả đáp án đúng → server chấm

  /* ===== GUARD: bắt buộc đăng nhập (client-only) ===== */
  useEffect(() => {
    if (!isLoggedIn()) {
      // Lưu lại chính URL trang start hiện tại để quay lại đúng nơi sau login
      requireAuth(navigate, location.pathname + location.search);
      return;
    }
    window.scrollTo(0, 0);
  }, [navigate, location]);

  /* ===== Khi attemptId thay đổi → reset state "volatile" để đảm bảo không kẹt trạng thái ===== */
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setSection("SEC");
    setTimeLeft(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId, examId]);

  /* ===== FETCH: exam.durationMinutes + questions for-exam ===== */
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // 1) Lấy thời lượng bài thi
        let durationMinutes = 15;
        try {
          const ex = await http(EXAM_URL, {
            signal: ac.signal,
            headers: { accept: "*/*" },
          });
          if (ex.ok) {
            const d = await ex.json();
            if (typeof d?.durationMinutes === "number" && !Number.isNaN(d.durationMinutes)) {
              durationMinutes = Math.max(1, d.durationMinutes);
            }
          }
        } catch {}

        setTimeLeft((prev) =>
          typeof prev === "number" ? prev : durationMinutes * 60
        );

        // 2) Lấy câu hỏi for-exam
        const qres = await http(QUESTIONS_URL, {
          signal: ac.signal,
          headers: { accept: "*/*" },
        });
        if (!qres.ok) throw new Error(`HTTP ${qres.status}`);
        const payload = await qres.json();

        const normalized = normalizeForExamPayload(payload);
        setSections(normalized.sections);
        setQuestionsBySec(normalized.questionsBySec);

        // section mặc định
        if (!restored?.section) setSection("SEC");
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId, attemptId]);

  /* ===== EFFECTS: Timer, Auto-submit, Persist ===== */
  // Đếm ngược
  useEffect(() => {
    if (submitted || typeof timeLeft !== "number" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // Tự nộp khi hết giờ
  useEffect(() => {
    if (!submitted && timeLeft === 0) doSubmit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, submitted]);

  // Lưu tiến trình (chuyển Set -> array để serializable)
  useEffect(() => {
    const serializableAnswers = {};
    Object.entries(answers).forEach(([num, val]) => {
      if (val instanceof Set) serializableAnswers[num] = Array.from(val);
      else serializableAnswers[num] = val;
    });
    safeJSON.set(LS_KEY, { answers: serializableAnswers, submitted, section, timeLeft });
  }, [answers, submitted, section, timeLeft, LS_KEY]);

  // Cảnh báo thoát nếu chưa nộp
  useEffect(() => {
    const warn = (e) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [submitted]);

  /* ===== DERIVED ===== */
  const currentQuestions = useMemo(() => {
    return questionsBySec[section] || [];
  }, [questionsBySec, section]);

  const flatQuestions = useMemo(
    () => Object.values(questionsBySec).flat(),
    [questionsBySec]
  );

  /* ===== HANDLERS ===== */
  // Chọn đáp án:
  // - Single: set choiceId
  // - Multi: toggle choiceId trong Set
  const handleAnswer = (q, choiceId) => {
    const isMulti = String(q.type || "").toLowerCase().includes("multi");
    setAnswers((prev) => {
      const next = { ...prev };
      if (isMulti) {
        const cur =
          prev[q.num] instanceof Set
            ? new Set(prev[q.num])
            : new Set(Array.isArray(prev[q.num]) ? prev[q.num] : []);
        if (cur.has(choiceId)) cur.delete(choiceId);
        else cur.add(choiceId);
        next[q.num] = cur;
      } else {
        next[q.num] = choiceId;
      }
      return next;
    });
  };

  const isChosen = (q, choiceId) => {
    const val = answers[q.num];
    if (!val) return false;
    if (val instanceof Set) return val.has(choiceId);
    if (Array.isArray(val)) return val.includes(choiceId);
    return val === choiceId;
  };

  const doSubmit = async (auto = false) => {
    if (!auto) {
      const ok = window.confirm("Bạn có chắc chắn muốn nộp bài?");
      if (!ok) return;
    }
    setSubmitted(true);

    try {
      // Build payload cho server: [{ questionId, choiceIds: [...] }]
      const payloadAnswers = flatQuestions.map((q) => {
        const val = answers[q.num];
        let choiceIds = [];
        if (val instanceof Set) choiceIds = Array.from(val);
        else if (Array.isArray(val)) choiceIds = val;
        else if (val) choiceIds = [val];
        return { questionId: q.id, choiceIds };
      });

      const res = await http(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "*/*" },
        body: JSON.stringify({ answers: payloadAnswers }),
      });

      // Nếu server chấm và trả kết quả
      let serverResult = null;
      try {
        serverResult = await res.json();
      } catch {}

      // thời gian đã dùng (nếu đã có timeLeft khởi tạo)
      const usedSec = typeof timeLeft === "number" ? null : null; // giữ nguyên để ResultAttempt đọc nếu backend trả
      navigate(`/s/results/${attemptId || "attempt"}`, {
        state: {
          serverResult,      // nếu backend trả
          answers,           // selections client
          examId,            // để làm lại
          autoSubmit: auto,
          // timeSpentSec: usedSec, // nếu muốn gửi sang kết quả
        },
        replace: true,
      });
    } catch (e) {
      // fallback vẫn điều hướng để không kẹt UI
      navigate(`/s/results/${attemptId || "attempt"}`, {
        state: {
          answers,
          examId,
          autoSubmit: auto,
        },
        replace: true,
      });
    }
  };

  /* ===== UI ===== */
  return (
    <div className="min-h-screen w-screen max-w-none bg-white text-gray-900">
      <Header />

      {/* Sticky bar */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="w-full px-6 lg:px-12 py-3 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-extrabold" style={{ color: PRIMARY }}>
            🧪 Làm bài thi #{examId}
          </h1>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className={`font-semibold ${timeLeft <= 30 ? "text-red-600" : "text-gray-900"}`}>
                {fmtTime(timeLeft)}
              </span>
            </div>

            {!submitted ? (
              <button
                onClick={() => doSubmit(false)}
                className="rounded-lg text-white px-4 py-2 text-sm font-semibold transition"
                style={{ backgroundColor: PRIMARY }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                type="button"
              >
                Nộp bài
              </button>
            ) : (
              <div className="text-sm font-semibold text-green-700">✅ Đã nộp</div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="w-full px-6 lg:px-12 py-8">
        {loading && (
          <div className="bg-white border border-[#e0e0e0] rounded-lg p-8 text-center text-sm text-[#677788] mb-8">
            Đang tải câu hỏi…
          </div>
        )}

        {err && !loading && (
          <div className="bg-white border border-red-200 rounded-lg p-8 text-center text-sm text-red-600 mb-8">
            Không thể tải dữ liệu (chi tiết: {err}). Kiểm tra API {QUESTIONS_URL}.
          </div>
        )}

        {!loading && !err && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* LEFT: câu hỏi */}
            <section className="space-y-8">
              {/* Tabs (hiện 1 tab “Bài thi” để sau mở rộng group) */}
              <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      section === s.id ? "text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    style={section === s.id ? { backgroundColor: PRIMARY } : {}}
                    type="button"
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              {currentQuestions.map((q) => {
                const isMulti = String(q.type || "").toLowerCase().includes("multi");
                const chosenVal = answers[q.num];
                const chosenCount =
                  chosenVal instanceof Set
                    ? chosenVal.size
                    : Array.isArray(chosenVal)
                    ? chosenVal.length
                    : chosenVal
                    ? 1
                    : 0;

                return (
                  <div
                    key={q.id}
                    id={`q-${q.num}`}
                    className="bg-white border rounded-2xl p-6 hover:shadow-sm transition"
                  >
                    <p className="font-semibold mb-4 text-gray-900">
                      Câu {q.num}. {q.question}
                    </p>

                    {q.imageUrl && (
                      <div className="mb-4">
                        <img
                          src={q.imageUrl}
                          alt={`question-${q.num}`}
                          className="max-h-80 rounded-lg border object-contain"
                        />
                      </div>
                    )}

                    <div className="mb-3 text-xs text-gray-600">
                      {isMulti ? "Chọn một hoặc nhiều đáp án" : "Chọn một đáp án"}
                      {chosenCount > 0 && <span> • Đã chọn {chosenCount}</span>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt) => {
                        const chosen = isChosen(q, opt.id);
                        const base = "text-left border rounded-lg px-4 py-3 transition";
                        let style = "border-gray-200 hover:border-blue-400";

                        if (!submitted && chosen)
                          style = "border-[#2c65e6] bg-[#eef3ff] text-[#1b3ea9]";

                        // Sau khi nộp: không có đáp án đúng (for-exam) → chỉ khoá nút
                        return (
                          <button
                            key={`${q.id}_${opt.id}`}
                            disabled={submitted}
                            onClick={() => handleAnswer(q, opt.id)}
                            className={`${base} ${style}`}
                            type="button"
                          >
                            {opt.label}
                            {submitted && chosen ? (
                              <Check className="inline ml-2 text-gray-500" size={18} />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>

            {/* RIGHT: danh sách câu hỏi */}
            <aside className="space-y-4 lg:sticky lg:top-[64px] h-fit">
              <div className="bg-white border rounded-2xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3">Danh sách câu hỏi</h4>
                {sections.map((s) => (
                  <div key={s.id} className="mb-5">
                    <p className="text-sm font-medium text-gray-700 mb-2">{s.title}</p>
                    <div className="grid grid-cols-5 gap-2">
                      {(questionsBySec[s.id] || []).map((q) => {
                        const val = answers[q.num];
                        const hasChosen =
                          val instanceof Set
                            ? val.size > 0
                            : Array.isArray(val)
                            ? val.length > 0
                            : !!val;

                        const baseCls =
                          "w-9 h-9 rounded-lg text-sm font-semibold transition flex items-center justify-center";
                        let cls = "";
                        let style = {};

                        if (!hasChosen) {
                          cls = "bg-gray-100 text-gray-700 hover:bg-gray-200";
                        } else {
                          cls = "text-white";
                          style = { backgroundColor: PRIMARY };
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => {
                              setSection(s.id);
                              document
                                .getElementById(`q-${q.num}`)
                                ?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={baseCls + " " + cls}
                            style={style}
                            type="button"
                          >
                            {q.num}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {!submitted && (
                <button
                  onClick={() => doSubmit(false)}
                  className="w-full rounded-lg text-white px-4 py-3 text-sm font-semibold transition"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                  type="button"
                >
                  Nộp bài
                </button>
              )}
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}



