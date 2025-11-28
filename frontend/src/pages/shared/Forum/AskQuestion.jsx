// src/pages/shared/Forum/AskQuestion.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { http } from "../../../utils/http";
import {
    API_BASE,
    BORDER,
    PRIMARY,
    PRIMARY_HOVER,
} from "./utils/constants";
import { isLoggedIn, requireAuth, authHeaders } from "./utils/helpers";

export default function AskQuestion() {
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState(null);
    const [ok, setOk] = useState("");

    useEffect(() => {
        if (!isLoggedIn()) {
            requireAuth(navigate, location.pathname + location.search);
        }
    }, [navigate, location]);

    const canSubmit = title.trim().length >= 6 && content.trim().length >= 10;

    const onSubmit = async (e) => {
        e?.preventDefault?.();
        if (!canSubmit || submitting) return;
        try {
            setSubmitting(true);
            setErr(null);
            setOk("");
            const body = {
                title: title.trim(),
                contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
            };
            const res = await http(`${API_BASE}/api/ForumQuestion`, {
                method: "POST",
                headers: authHeaders({
                    "Content-Type": "application/json",
                    accept: "*/*",
                }),
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                let msg = `HTTP ${res.status}`;
                try {
                    const j = await res.json();
                    if (j?.message) msg = j.message;
                } catch { }
                throw new Error(msg);
            }
            const data = await res.json();
            const created = data?.data || data;
            const newId = created?.id;
            setOk("🎉 Tạo câu hỏi thành công!");
            if (newId) navigate(`/forum/${newId}`, { replace: true });
            else navigate(`/forum`, { replace: true });
        } catch (e) {
            setErr(e?.message || "Không thể tạo câu hỏi");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden">
                <section className="w-screen px-6 lg:px-12 pt-8">
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
                        Đặt câu hỏi
                    </h1>

                    <form
                        onSubmit={onSubmit}
                        className="mt-6 rounded-2xl border bg-white p-5 grid gap-4"
                        style={{ borderColor: BORDER }}
                    >
                        {ok && (
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3">
                                {ok}
                            </div>
                        )}
                        {err && (
                            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
                                {err}
                            </div>
                        )}

                        <div>
                            <label className="text-sm font-medium">Tiêu đề</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                                style={{ borderColor: BORDER }}
                                placeholder="Mô tả ngắn gọn, rõ ràng vấn đề…"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Nội dung chi tiết</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                                className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                                style={{ borderColor: BORDER }}
                                placeholder="Trình bày đầy đủ ngữ cảnh, code, dữ liệu mẫu…"
                            />
                        </div>

                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={!canSubmit || submitting}
                                className="rounded-full text-white px-5 py-3 disabled:opacity-60"
                                style={{ background: PRIMARY }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = PRIMARY_HOVER)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background = PRIMARY)
                                }
                            >
                                {submitting ? "Đang tạo…" : "Đăng câu hỏi"}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}
