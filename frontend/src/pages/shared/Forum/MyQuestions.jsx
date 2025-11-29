// src/pages/shared/Forum/MyQuestions.jsx
import { useEffect, useState } from "react";
import { useToast } from "../../../components/ui/Toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { QuestionCard } from "./components";

function decodeJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1] || ""));
    } catch {
        return null;
    }
}

export default function MyQuestions() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        if (!isLoggedIn()) {
            requireAuth(navigate, location.pathname + location.search);
            return;
        }
    }, [navigate, location]);

    const fetchMine = async () => {
        // Lấy StudentId từ token
        const token = localStorage.getItem("app_access_token");
        if (!token) throw new Error("Chưa đăng nhập");
        const claims = decodeJwt(token);
        
        const studentId = claims?.StudentId || claims?.studentId;

        if (!studentId) throw new Error("Không tìm thấy StudentId trong token");

        // Gọi API member-specific endpoint
        const res = await http(`${API_BASE}/api/ForumQuestion/member/${studentId}`, {
            headers: { accept: "*/*" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        // Return data array
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
                const list = await fetchMine();
                if (!mounted) return;
                setItems(
                    list.sort(
                        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
                    )
                );
            } catch (e) {
                if (mounted) setErr(e?.message || "Lỗi tải dữ liệu");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const softDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá (ẩn) câu hỏi này?")) return;
        try {
            const res = await http(`${API_BASE}/api/ForumQuestion/${id}`, {
                method: "DELETE",
                headers: authHeaders({ accept: "*/*" }),
            });
            if (!res.ok) throw new Error(`Xoá thất bại (HTTP ${res.status})`);
            // remove from list
            setItems((prev) => prev.filter((x) => x.id !== id));
            toast({
                title: "Thành công",
                description: "Đã xoá câu hỏi của bạn.",
            });
        } catch (e) {
            toast({ title: "Lỗi", description: e.message, variant: "destructive" });
        }
    };

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden">
                <section className="w-screen px-6 lg:px-12 pt-8">
                    <div className="flex items-center justify-between gap-3">
                        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
                            Câu hỏi của tôi
                        </h1>
                        <Link
                            to="/forum/new"
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
                    </div>
                </section>

                <section className="w-screen px-6 lg:px-12 py-8">
                    {err && (
                        <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 mb-6">
                            {err}
                        </div>
                    )}
                    {loading ? (
                        <div className="text-slate-500">Đang tải...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {items.map((q) => (
                                <div key={q.id} className="relative group">
                                    <QuestionCard q={q} />
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition flex gap-2">
                                        <Link
                                            to={`/forum/${q.id}/edit`}
                                            className="bg-white border shadow-sm px-2 py-1 rounded text-xs font-medium text-blue-600 hover:bg-blue-50"
                                        >
                                            Sửa
                                        </Link>
                                        <button
                                            onClick={() => softDelete(q.id)}
                                            className="bg-white border shadow-sm px-2 py-1 rounded text-xs font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Xoá
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {items.length === 0 && (
                                <div className="text-slate-600 col-span-full text-center py-10 border rounded-2xl border-dashed">
                                    Bạn chưa có câu hỏi nào.
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
