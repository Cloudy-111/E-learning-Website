// src/pages/shared/Forum/ForumHome.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { http } from "../../../utils/http";
import { API_BASE, BORDER, PRIMARY, PRIMARY_HOVER } from "./utils/constants";
import { isLoggedIn } from "./utils/helpers";
import { SearchBar, QuestionCard } from "./components";

export default function ForumHome() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    const fetchList = async () => {
        const res = await http(`${API_BASE}/api/ForumQuestion`, {
            headers: { accept: "*/*" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
                ? data.data
                : [];
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setErr(null);
                const list = await fetchList();
                if (!mounted) return;
                setItems(
                    list.sort(
                        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                    )
                );
            } catch (e) {
                if (mounted) setErr(e?.message || "Fetch error");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const onSearch = (q) => {
        if (!q) return;
        navigate(`/forum/search?q=${encodeURIComponent(q)}`);
    };

    const canAsk = isLoggedIn();

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden">
                <section className="w-screen px-6 lg:px-12 pt-8">
                    <div className="flex items-center justify-between gap-3">
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
                            Hỏi – Đáp
                        </h1>
                        <div className="flex items-center gap-2">
                            <Link
                                to={canAsk ? "/forum/new" : "/login?redirect=/forum/new"}
                                className="rounded-full text-white px-4 py-2 text-sm font-semibold"
                                style={{ background: PRIMARY }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = PRIMARY_HOVER)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.background = PRIMARY)
                                }
                            >
                                + Đặt câu hỏi
                            </Link>
                            <Link
                                to="/forum/my"
                                className="text-[15px] text-blue-600 hover:underline"
                            >
                                Câu hỏi của tôi
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6">
                        <SearchBar onSubmit={onSearch} />
                    </div>
                </section>

                <section className="w-screen px-6 lg:px-12 py-8">
                    {err && (
                        <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4">
                            Không thể tải: {err}
                        </div>
                    )}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border bg-white p-5 animate-pulse"
                                    style={{ borderColor: BORDER }}
                                >
                                    <div className="h-4 w-3/4 bg-slate-100 rounded" />
                                    <div className="h-3 w-full bg-slate-100 rounded mt-3" />
                                    <div className="h-3 w-2/3 bg-slate-100 rounded mt-2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {items.map((q) => (
                                <QuestionCard key={q.id} q={q} />
                            ))}
                            {items.length === 0 && (
                                <div className="text-slate-600">Chưa có câu hỏi nào.</div>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
