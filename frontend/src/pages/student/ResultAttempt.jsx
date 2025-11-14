// src/pages/ResultAttempt.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Trophy, Award, BarChart2, Clock, Check, X,
  ChevronRight, Download, ArrowLeft, RotateCcw, BookOpen
} from "lucide-react";
import { http } from "../../utils/http";
import { isLoggedIn, requireAuth } from "../../utils/auth";

/* ===== Theme ===== */
const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";

/* ===== Helpers ===== */
const fmtTime = (s) => {
  if (typeof s !== "number") return "--:--";
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

const safeJSON = {
  get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k)   { try { localStorage.removeItem(k); } catch {} },
};

function choiceIdsFromAnswerVal(val) {
  if (!val) return [];
  if (val instanceof Set) return Array.from(val);
  if (Array.isArray(val)) return val;
  return [val]; // single id
}

/** Chuẩn hoá dữ liệu for-review:
 * Kỳ vọng API: GET /api/{examId}/question-exams/for-review
 * trả:
 *   { status, message, data: [{ id, content, imageUrl, type, choices: [{ id, content, isCorrect }] }, ...] }
 */
function normalizeReviewPayload(payload) {
  const raw = Array.isArray(payload?.data) ? payload.data : [];
  const items = raw.map((q, idx) => {
    const options = Array.isArray(q?.choices)
      ? q.choices.map((c) => ({
          id: c.id,
          label: c.content,
          isCorrect: !!c.isCorrect,
        }))
      : [];
    const correctIds = options.filter(o => o.isCorrect).map(o => o.id);
    return {
      id: q.id,
      num: (q?.order ?? idx) + 1,
      type: q?.type || "SingleChoice",
      question: q?.content || `Câu hỏi ${idx + 1}`,
      imageUrl: q?.imageUrl || null,
      options,
      correctIds, // mảng id đáp án đúng
    };
  });
  return items;
}

/** So sánh câu trả lời người dùng với đáp án đúng */
function isAnswerCorrect(userChoiceIds, correctIds) {
  const a = new Set(userChoiceIds || []);
  const b = new Set(correctIds || []);
  if (a.size !== b.size) return false;
  for (const id of a) if (!b.has(id)) return false;
  return true;
}

/** Xuất CSV đơn giản */
function exportCSV(filename, rows) {
  const csv = rows.map(r => r.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/** Xoá cache attempt cho 1 exam */
function clearAttemptsForExam(examId) {
  const prefix = `attempt_${examId}_`;
  const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
  keys.forEach((k) => safeJSON.del(k));
}

/** Tạo attemptId đơn giản */
function genAttemptId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ResultAttempt() {
  const { attemptId } = useParams(); // id của attempt trong URL hiển thị
  const location = useLocation();
  const navigate = useNavigate();
  const reviewRef = useRef(null);

  // State được truyền từ QuizTest.jsx
  // state: { serverResult?, answers?, examId, autoSubmit? }
  const stateFromQuiz = location.state || {};
  const examId = stateFromQuiz.examId || null;

  /* ===== Guard đăng nhập ===== */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoggedIn()) {
      requireAuth(navigate, location.pathname + location.search);
    }
  }, [attemptId, navigate, location]);

  /* ===== API config ===== */
  const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
  const REVIEW_URL = examId ? `${API_BASE}/api/${examId}/question-exams/for-review` : null;
  const EXAM_URL = examId ? `${API_BASE}/api/exams/${examId}` : null;

  /* ===== STATE cho data hiển thị ===== */
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // clientAnswers: map num -> choiceId(s)
  // Ưu tiên nhận từ stateFromQuiz.answers; nếu không có thì fallback localStorage
  const lsKeyPrefix = examId ? `attempt_${examId}_` : null;
  const latestLsKey = useMemo(() => {
    if (!lsKeyPrefix) return null;
    const keys = Object.keys(localStorage).filter(k => k.startsWith(lsKeyPrefix));
    if (!keys.length) return null;
    // lấy key mới nhất theo tên (thực tế có thể sort theo updatedAt nếu bạn lưu)
    return keys.sort().slice(-1)[0];
  }, [lsKeyPrefix]);

  const restoredAttempt = latestLsKey ? safeJSON.get(latestLsKey, null) : null;
  const clientAnswersRaw = stateFromQuiz.answers || restoredAttempt?.answers || {};
  // chuẩn hoá answers: { [num]: string | string[] }
  const clientAnswers = useMemo(() => {
    const out = {};
    Object.entries(clientAnswersRaw).forEach(([num, v]) => {
      if (v instanceof Set) out[num] = Array.from(v);
      else out[num] = v;
    });
    return out;
  }, [clientAnswersRaw]);

  // Thời lượng dùng & giới hạn (nếu cần)
  const [timeLimitSec, setTimeLimitSec] = useState(null);
  const [timeUsedSec, setTimeUsedSec] = useState(null);

  // Danh sách câu hỏi for-review (đã có correctIds)
  const [reviewQuestions, setReviewQuestions] = useState([]); // [{id, num, question, options[{id,label,isCorrect}], correctIds}]
  // Bảng tra nhanh để hiển thị label từ id
  const choiceLabelMap = useMemo(() => {
    const map = new Map();
    reviewQuestions.forEach((q) => q.options.forEach((o) => map.set(o.id, o.label)));
    return map;
  }, [reviewQuestions]);

  // Điểm & breakdown
  const total = reviewQuestions.length;
  const score = useMemo(() => {
    if (!total) return 0;
    let c = 0;
    reviewQuestions.forEach((q) => {
      const picked = choiceIdsFromAnswerVal(clientAnswers[q.num]);
      if (isAnswerCorrect(picked, q.correctIds)) c++;
    });
    return c;
  }, [reviewQuestions, clientAnswers, total]);

  const accuracy = total ? Math.round((score / total) * 100) : 0;
  const pass = accuracy >= 60;

  /* ===== FETCH: review data (nếu không có serverResult đầy đủ) + exam để lấy duration ===== */
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // Nếu serverResult đã có đủ thông tin để render (tuỳ backend của bạn),
        // bạn có thể ưu tiên dùng serverResult ở đây.
        // Ở bản này vẫn fetch for-review để đảm bảo hiển thị chi tiết từng câu.
        if (EXAM_URL) {
          try {
            const ex = await http(EXAM_URL, { signal: ac.signal, headers: { accept: "*/*" } });
            if (ex.ok) {
              const d = await ex.json();
              if (typeof d?.durationMinutes === "number") {
                setTimeLimitSec(Math.max(1, d.durationMinutes) * 60);
              }
            }
          } catch {}
        }

        if (!REVIEW_URL) {
          setReviewQuestions([]);
          return;
        }

        const res = await http(REVIEW_URL, { signal: ac.signal, headers: { accept: "*/*" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        const normalized = normalizeReviewPayload(payload);
        setReviewQuestions(normalized);

        // Nếu QuizTest truyền duration/timeSpent qua stateFromQuiz.serverResult, bạn có thể lấy ở đây
        // Ở bản này, nếu không có thì để null (hiển thị "--:--")
        if (typeof stateFromQuiz?.serverResult?.timeSpentSec === "number") {
          setTimeUsedSec(stateFromQuiz.serverResult.timeSpentSec);
        } else if (typeof stateFromQuiz?.duration === "number") {
          setTimeUsedSec(stateFromQuiz.duration);
        } else {
          setTimeUsedSec(null);
        }
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [REVIEW_URL, EXAM_URL]);

  /* ===== Actions ===== */
  const onRetake = () => {
    if (!examId) return navigate("/exam", { replace: true });
    // dọn cache cũ tránh “kẹt đã nộp”
    clearAttemptsForExam(examId);
    const newAttempt = genAttemptId();
    // Nếu router của bạn là /exam/:examId/start (không có attemptId) → navigate(`/exam/${examId}/start`)
    // Ở đây dùng bản có attemptId để chắc chắn reset
    navigate(`/exam/${examId}/start/${newAttempt}`, { replace: false });
  };

  const onExportCSV = () => {
    const rows = [["num", "question", "selected_labels", "correct_labels", "is_correct"]];
    reviewQuestions.forEach((q) => {
      const pickedIds = choiceIdsFromAnswerVal(clientAnswers[q.num]);
      const pickedLabels = pickedIds.map((id) => choiceLabelMap.get(id) || id).join(" | ");
      const correctLabels = q.correctIds.map((id) => choiceLabelMap.get(id) || id).join(" | ");
      const ok = isAnswerCorrect(pickedIds, q.correctIds) ? "1" : "0";
      rows.push([q.num, q.question, pickedLabels, correctLabels, ok]);
    });
    exportCSV(`result_${attemptId || "attempt"}.csv`, rows);
  };

  /* ===== UI ===== */
  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/exam" className="hover:underline" style={{ color: PRIMARY }}>
              Thư viện đề thi
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800">Kết quả</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Kết quả bài thi #{attemptId}
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={onExportCSV}
                className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
              >
                <Download className="w-4 h-4 inline mr-2" />
                Xuất CSV
              </button>
              <Link
                to="/s/resultstest"
                className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
              >
                Lịch sử
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="w-full px-6 lg:px-12 py-8">
        {loading && (
          <div className="bg-white border border-[#e0e0e0] rounded-lg p-8 text-center text-sm text-[#677788] mb-8">
            Đang tải kết quả…
          </div>
        )}

        {err && !loading && (
          <div className="bg-white border border-red-200 rounded-lg p-8 text-center text-sm text-red-600 mb-8">
            Không thể tải dữ liệu (chi tiết: {err})
          </div>
        )}

        {!loading && !err && (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* LEFT: Summary + Review */}
            <section className="space-y-6">
              {/* Summary cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl border bg-white p-5">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Điểm
                  </div>
                  <div className="mt-2 text-2xl font-extrabold text-gray-900">
                    {score} / {total}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Độ chính xác: {accuracy}%</div>
                </div>

                <div className="rounded-2xl border bg-white p-5">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4" /> Trạng thái
                  </div>
                  <div className={`mt-2 text-lg font-bold ${pass ? "text-green-700" : "text-red-700"}`}>
                    {pass ? "Đạt" : "Chưa đạt"}
                  </div>
                  {stateFromQuiz.autoSubmit && (
                    <div className="text-xs text-amber-700 mt-1">Tự nộp do hết giờ</div>
                  )}
                </div>

                <div className="rounded-2xl border bg-white p-5">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Thời gian
                  </div>
                  <div className="mt-2 text-lg font-semibold text-gray-900">
                    {fmtTime(timeUsedSec)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Giới hạn: {fmtTime(timeLimitSec)}
                  </div>
                </div>

                <div className="rounded-2xl border bg-white p-5">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Huy hiệu
                  </div>
                  <div className="mt-2 text-lg font-semibold text-gray-900">
                    {accuracy >= 90 ? "Master" : accuracy >= 75 ? "Pro" : accuracy >= 60 ? "Rising" : "Learner"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Dựa trên % chính xác</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => reviewRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-xl text-white px-4 py-2 text-sm font-semibold transition"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                >
                  Xem lại đáp án
                </button>
                <button
                  onClick={onRetake}
                  className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  Làm lại
                </button>
                <Link
                  to="/exam"
                  className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Thư viện đề
                </Link>
                <Link
                  to="/courses"
                  className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Khóa học liên quan
                </Link>
              </div>

              {/* Review detail */}
              <div ref={reviewRef} className="bg-white border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Xem lại câu trả lời</h2>
                  <div className="text-sm text-gray-600">
                    Đúng <span className="font-semibold text-green-700">{score}</span> / {total}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviewQuestions.map((q) => {
                    const pickedIds = choiceIdsFromAnswerVal(clientAnswers[q.num]);
                    const ok = isAnswerCorrect(pickedIds, q.correctIds);

                    const pickedLabels = pickedIds.map((id) => choiceLabelMap.get(id) || id).join(" | ");
                    const correctLabels = q.correctIds.map((id) => choiceLabelMap.get(id) || id).join(" | ");

                    return (
                      <article
                        key={q.id}
                        className={`rounded-xl border p-4 ${ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                      >
                        <p className="font-medium text-gray-900 mb-2">
                          Câu {q.num}. {q.question}
                        </p>

                        {q.imageUrl && (
                          <div className="mb-2">
                            <img
                              src={q.imageUrl}
                              alt={`review-${q.num}`}
                              className="max-h-64 rounded-lg border object-contain"
                            />
                          </div>
                        )}

                        <div className="text-sm">
                          <div className="mb-1">
                            {ok ? (
                              <span className="inline-flex items-center gap-1 text-green-700">
                                <Check className="w-4 h-4" /> Chính xác
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-700">
                                <X className="w-4 h-4" /> Chưa chính xác
                              </span>
                            )}
                          </div>

                          <div className="text-gray-800">
                            <span className="text-gray-600">Bạn chọn: </span>
                            <b>{pickedLabels || "—"}</b>
                          </div>
                          <div className="text-gray-800">
                            <span className="text-gray-600">Đáp án đúng: </span>
                            <b>{correctLabels}</b>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* RIGHT: Breakdown (đơn giản theo toàn bài) */}
            <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
              <div className="bg-white border rounded-2xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3">Thống kê</h4>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-800">Toàn bài</span>
                    <span className="text-gray-700">{score}/{total}</span>
                  </div>
                  <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${accuracy}%`,
                        backgroundColor: PRIMARY,
                        transition: "width .3s ease",
                      }}
                    />
                  </div>
                  <div className="mt-1 text-xs text-gray-600">{accuracy}% chính xác</div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">Gợi ý tiếp theo</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Ôn lại câu sai và làm lại sau 24h để ghi nhớ.</li>
                  <li>• Học nội dung liên quan trong khoá học để lấp lỗ hổng.</li>
                  <li>• Khi đạt ≥ 80%, thử đề nâng cao.</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
