// src/pages/shared/Forum/QuestionDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { http } from "../../../utils/http";
import {
    API_BASE,
    BORDER,
    PRIMARY,
    PRIMARY_HOVER,
    TARGET_TYPE,
} from "./utils/constants";
import { isLoggedIn, authHeaders } from "./utils/helpers";
import { AnswerList } from "./components";

function renderContent(contentJson, fallback) {
    try {
        const j =
            typeof contentJson === "string" ? JSON.parse(contentJson) : contentJson;
        const blocks = Array.isArray(j?.blocks) ? j.blocks : [];
        return blocks.map((b) => b.text).join("\n\n") || fallback || "";
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
    const [ansLoading, setAnsLoading] = useState(false);

    // Form trả lời
    const [myAnswer, setMyAnswer] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // 1. Fetch Question
    useEffect(() => {
        let ac = new AbortController();
        (async () => {
            try {
                setLoading(true);
                setErr(null);
                const res = await http(`${API_BASE}/api/ForumQuestion/${id}`, {
                    headers: { accept: "*/*" },
                    signal: ac.signal,
                });
                if (!res.ok) {
                    if (res.status === 404) throw new Error("Không tìm thấy câu hỏi");
                    throw new Error(`HTTP ${res.status}`);
                }
                const data = await res.json();
                setQ(data?.data || data);
            } catch (e) {
                if (e.name === "AbortError") return;
                setErr(e?.message || "Lỗi tải câu hỏi");
            } finally {
                setLoading(false);
            }
        })();
        return () => ac.abort();
    }, [id]);

    // 2. Fetch Answers
    const fetchAnswers = async (signal) => {
        try {
            setAnsLoading(true);
            const res = await http(
                `${API_BASE}/api/Discussion/${TARGET_TYPE}/${id}`,
                {
                    headers: { accept: "*/*" },
                    signal,
                }
            );
            if (!res.ok) return; // ignore error
            const data = await res.json();
            const list = Array.isArray(data)
                ? data
                : Array.isArray(data?.data)
                    ? data.data
                    : [];
            setAnswers(list);
        } catch (e) {
            if (e.name !== "AbortError") console.error(e);
        } finally {
            setAnsLoading(false);
        }
    };

    useEffect(() => {
        if (!q) return;
        const ac = new AbortController();
        fetchAnswers(ac.signal);
        return () => ac.abort();
    }, [q, id]);

    // 3. Submit Answer
    const submitAnswer = async (e) => {
        e?.preventDefault?.();
        if (!myAnswer.trim()) return;
        if (!isLoggedIn()) {
            navigate(`/login?redirect=/forum/${id}`);
            return;
        }

        try {
            setSubmitting(true);
            const body = { content: myAnswer.trim() };
            const res = await http(`${API_BASE}/api/Discussion/${TARGET_TYPE}/${id}`, {
                method: "POST",
                headers: authHeaders({
                    "Content-Type": "application/json",
                    accept: "*/*",
                }),
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error("Không thể gửi trả lời");

            setMyAnswer("");
            // reload answers
            await fetchAnswers();
        } catch (e) {
            alert(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="w-screen h-[50vh] grid place-items-center text-slate-500">
                    Đang tải câu hỏi...
                </div>
                <Footer />
            </>
        );
    }

    if (err || !q) {
        return (
            <>
                <Header />
                <div className="w-screen px-6 lg:px-12 py-12 text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Đã có lỗi</h2>
                    <p className="text-slate-600">{err || "Không tìm thấy dữ liệu"}</p>
                    <Link
                        to="/forum"
                        className="inline-block mt-4 text-blue-600 hover:underline"
                    >
                        Quay lại diễn đàn
                    </Link>
                </div>
                <Footer />
            </>
        );
    }

    const contentText = renderContent(q.contentJson, q.content);

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden bg-slate-50 min-h-screen">
                {/* Breadcrumb */}
                <div className="w-screen px-6 lg:px-12 py-4 bg-white border-b border-slate-200">
                    <div className="text-sm text-slate-500 flex items-center gap-2">
                        <Link to="/forum" className="hover:text-blue-600">
                            Hỏi – Đáp
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-medium truncate max-w-[200px]">
                            {q.title}
                        </span>
                    </div>
                </div>

                <div className="w-screen px-6 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Question Detail */}
                        <article
                            className="rounded-2xl border bg-white p-6"
                            style={{ borderColor: BORDER }}
                        >
                            <h1 className="text-2xl font-bold text-slate-900 mb-4">
                                {q.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 pb-4 border-b border-slate-100">
                                <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                    {q.authorName || "Người hỏi"}
                                </span>
                                <span>
                                    {new Date(
                                        q.createdAt || q.updatedAt || Date.now()
                                    ).toLocaleString("vi-VN")}
                                </span>
                                <span>{q.views ?? 0} lượt xem</span>
                            </div>

                            <div className="prose prose-slate max-w-none text-slate-800 whitespace-pre-wrap leading-relaxed">
                                {contentText}
                            </div>

                            {/* Tags */}
                            {q.tags && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {q.tags.split(",").map((t, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                        >
                                            #{t.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </article>

                        {/* Answers List */}
                        <AnswerList answers={answers} />

                        {/* Reply Form */}
                        <div
                            className="rounded-2xl border bg-white p-6"
                            style={{ borderColor: BORDER }}
                        >
                            <h3 className="font-bold text-slate-900 mb-4">
                                Câu trả lời của bạn
                            </h3>
                            {!isLoggedIn() ? (
                                <div className="bg-slate-50 p-4 rounded-xl text-center text-sm text-slate-600">
                                    Vui lòng{" "}
                                    <Link
                                        to={`/login?redirect=/forum/${id}`}
                                        className="text-blue-600 font-semibold hover:underline"
                                    >
                                        đăng nhập
                                    </Link>{" "}
                                    để trả lời.
                                </div>
                            ) : (
                                <form onSubmit={submitAnswer}>
                                    <textarea
                                        rows={5}
                                        value={myAnswer}
                                        onChange={(e) => setMyAnswer(e.target.value)}
                                        placeholder="Chia sẻ kiến thức của bạn..."
                                        className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 mb-3"
                                        style={{ borderColor: BORDER }}
                                    />
                                    <div className="text-right">
                                        <button
                                            type="submit"
                                            disabled={!myAnswer.trim() || submitting}
                                            className="rounded-full text-white px-6 py-2.5 font-medium disabled:opacity-60"
                                            style={{ background: PRIMARY }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.background = PRIMARY_HOVER)
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.background = PRIMARY)
                                            }
                                        >
                                            {submitting ? "Đang gửi..." : "Gửi trả lời"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar (Optional) */}
                    <div className="hidden lg:block space-y-6">
                        <div
                            className="rounded-2xl border bg-white p-5"
                            style={{ borderColor: BORDER }}
                        >
                            <h3 className="font-bold text-slate-900 mb-3">Mẹo đặt câu hỏi</h3>
                            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                                <li>Mô tả rõ vấn đề bạn gặp phải</li>
                                <li>Đính kèm code hoặc ảnh lỗi nếu có</li>
                                <li>Kiểm tra lại chính tả trước khi đăng</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
