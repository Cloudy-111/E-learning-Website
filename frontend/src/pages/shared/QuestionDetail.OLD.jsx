












// src/pages/forum/QuestionDetail.jsx
"use client";

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";
import { isLoggedIn } from "../../utils/auth";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
const TARGET_TYPE = "ForumQuestion"; // Nếu BE dùng chữ thường: "forumquestion"
const BORDER = "#e5e7eb";
const PRIMARY = "#2563eb";
const PRIMARY_HOVER = "#1d4ed8";

function getToken() {
  try {
    const t = JSON.parse(localStorage.getItem("auth_token") || "null");
    if (t?.accessToken) return t.accessToken;
  } catch { }
  try {
    const t = localStorage.getItem("access_token");
    if (t) return t;
  } catch { }
  return null;
}
function authHeaders(extra = {}) {
  const tk = getToken();
  return tk ? { ...extra, Authorization: `Bearer ${tk}` } : { ...extra };
}

function renderContent(contentJson, fallback) {
  try {
    const j = typeof contentJson === "string" ? JSON.parse(contentJson) : contentJson;
    const blocks = Array.isArray(j?.blocks) ? j.blocks : [];
    const text = blocks.map((b) => b.text).join("\n\n").trim();
    return text || fallback || "";
  } catch {
    return fallback || "";
  }
}

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [answers, setAnswers] = useState([]);
  const [ansText, setAnsText] = useState("");
  const [posting, setPosting] = useState(false);

  const canAnswer = isLoggedIn();

  // ----- fetch question (BỎ hiển thị lỗi AbortError) -----
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await http(`${API_BASE}/api/ForumQuestion/${id}`, {
          headers: { accept: "*/*" },
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setQ(data?.data || data);
      } catch (e) {
        // Ignore AbortError (StrictMode dev re-run)
        if (e?.name !== "AbortError") setErr(e?.message || "Fetch error");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [id]);

  // ----- fetch answers -----
  const fetchAnswers = async (signal) => {
    try {
      const res = await http(
        `${API_BASE}/api/Discussion/${TARGET_TYPE}/${id}`,
        { headers: { accept: "*/*" }, signal }
      );
      if (!res.ok) return setAnswers([]);
      const data = await res.json();
      setAnswers(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
    } catch (e) {
      if (e?.name === "AbortError") return;
      // im lặng cho phần trả lời
    }
  };
  useEffect(() => {
    const ac = new AbortController();
    fetchAnswers(ac.signal);
    return () => ac.abort();
  }, [id]);

  // ----- submit answer -----
  const submitAnswer = async (e) => {
    e?.preventDefault?.();
    const content = ansText.trim();
    if (!content || posting) return;
    if (!canAnswer) return navigate(`/login?redirect=/forum/${id}`);
    try {
      setPosting(true);
      const body = { content }; // Nếu BE cần contentJson: JSON.stringify({blocks:[{text: content}]})
      const res = await http(`${API_BASE}/api/Discussion/${TARGET_TYPE}/${id}`, {
        method: "POST",
        headers: authHeaders({ "Content-Type": "application/json", accept: "*/*" }),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setAnsText("");
      await fetchAnswers(); // refetch
    } catch (e) {
      alert("Không gửi trả lời được: " + (e?.message || "error"));
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <section className="w-screen px-6 lg:px-12 pt-8">
          <div className="text-sm text-slate-500">
            <Link to="/forum" className="hover:text-blue-600">Hỏi – Đáp</Link> / <span>Chi tiết</span>
          </div>

          {loading ? (
            <div className="mt-6 rounded-xl border bg-white p-6 animate-pulse" style={{ borderColor: BORDER }}>
              Đang tải…
            </div>
          ) : err ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
              Không thể tải câu hỏi (chi tiết: {err})
            </div>
          ) : (
            q && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-6">
                <article className="lg:col-span-2">
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">{q.title}</h1>
                  <div className="text-sm text-slate-600 mt-2">
                    {q.authorName || "Người hỏi"} •{" "}
                    {new Date(q.createdAt || Date.now()).toLocaleString("vi-VN", { hour12: false })}
                  </div>

                  <div className="mt-4 rounded-2xl border bg-white p-5" style={{ borderColor: BORDER }}>
                    <div className="whitespace-pre-wrap text-slate-800">
                      {renderContent(q.contentJson, q.content)}
                    </div>
                  </div>

                  <section className="mt-8">
                    <h3 className="font-semibold text-slate-900">Trả lời ({answers.length})</h3>

                    {answers.length === 0 && (
                      <div className="mt-3 text-sm text-slate-600">Chưa có trả lời nào.</div>
                    )}

                    <div className="mt-3 grid gap-3">
                      {answers.map((a) => (
                        <div key={a.id} className="rounded-xl border bg-white p-4" style={{ borderColor: BORDER }}>
                          <div className="text-sm text-slate-600">
                            <b className="text-slate-800">{a.authorName || "Người dùng"}</b>{" "}
                            • {new Date(a.createdAt || Date.now()).toLocaleString("vi-VN", { hour12: false })}
                          </div>
                          <div className="mt-2 whitespace-pre-wrap text-slate-800">
                            {a.content || renderContent(a.contentJson, "")}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      {canAnswer ? (
                        <form onSubmit={submitAnswer} className="rounded-xl border bg-white p-4 grid gap-3" style={{ borderColor: BORDER }}>
                          <textarea
                            value={ansText}
                            onChange={(e) => setAnsText(e.target.value)}
                            rows={4}
                            placeholder="Nhập câu trả lời của bạn…"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                            style={{ borderColor: BORDER }}
                          />
                          <div className="text-right">
                            <button
                              type="submit"
                              disabled={posting || !ansText.trim()}
                              className="rounded-full text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
                              style={{ background: PRIMARY }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = PRIMARY_HOVER)}
                              onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
                            >
                              {posting ? "Đang gửi…" : "Gửi trả lời"}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="text-sm text-slate-600">
                          <Link to={`/login?redirect=/forum/${id}`} className="text-blue-600 underline">Đăng nhập</Link>{" "}
                          để gửi trả lời.
                        </div>
                      )}
                    </div>
                  </section>
                </article>

                <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
                  <div className="rounded-2xl border bg-white p-5" style={{ borderColor: BORDER }}>
                    <div className="text-sm text-slate-600">Tác giả</div>
                    <div className="mt-1 font-medium">{q.authorName || "—"}</div>
                    <div className="mt-4">
                      <Link to={`/forum/${id}/edit`} className="text-blue-600 hover:underline">Chỉnh sửa câu hỏi</Link>
                    </div>
                  </div>
                </aside>
              </div>
            )
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
