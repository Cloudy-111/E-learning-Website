



















// src/pages/forum/MyQuestions.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";
import { useAuth } from "../../store/auth";
import { isLoggedIn, requireAuth } from "../../utils/auth";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
const BORDER = "#e5e7eb";
const PRIMARY = "#2563eb";
const PRIMARY_HOVER = "#1d4ed8";

/* ===== Token helpers (đồng bộ BlogMy.jsx) ===== */
function getAccessToken() {
  try {
    const at = JSON.parse(localStorage.getItem("auth_token") || "null");
    if (at?.accessToken) return at.accessToken;
  } catch { }
  try {
    const t = localStorage.getItem("access_token");
    if (t) return t;
  } catch { }
  try {
    const raw = localStorage.getItem("token");
    if (raw) {
      const j = JSON.parse(raw);
      if (j?.accessToken) return j.accessToken;
    }
  } catch { }
  return null;
}
function authHeaders(extra = {}) {
  const token = getAccessToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
}
function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

/* ===== Page ===== */
export default function MyQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hydrate } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  // ---- resolve memberId giống hệt BlogMy.jsx
  const memberId = useMemo(() => {
    if (user?.memberId) return user.memberId;
    if (user?.studentId) return user.studentId;
    if (user?.id) return user.id;
    try {
      const u = JSON.parse(localStorage.getItem("auth_user") || "null");
      if (u?.memberId) return u.memberId;
      if (u?.studentId) return u.studentId;
      if (u?.id) return u.id;
    } catch { }
    const token = getAccessToken();
    if (token) {
      const p = decodeJwt(token);
      if (p?.StudentId) return p.StudentId;
      const nameIdUri = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
      if (p?.[nameIdUri]) return p[nameIdUri];
      if (p?.nameidentifier) return p.nameidentifier;
      if (p?.userId) return p.userId;
    }
    return null;
  }, [user]);

  // Guard đăng nhập
  useEffect(() => {
    hydrate?.();
    if (!isLoggedIn()) requireAuth(navigate, location.pathname + location.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch danh sách câu hỏi của tôi
  const fetchMine = async () => {
    if (!memberId) {
      setErr("Không xác định được memberId từ tài khoản. Hãy đăng xuất và đăng nhập lại.");
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const res = await http(`${API_BASE}/api/ForumQuestion/member/${memberId}`, {
        headers: authHeaders({ accept: "*/*" }),
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
      const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : []);
      // sort: mới nhất trước
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setItems(list);
    } catch (e) {
      setErr(e?.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMine(); /* eslint-disable-next-line */ }, [memberId]);

  const filtered = useMemo(
    () => items.filter(q => (showDeleted ? q.isDeleted === true : q.isDeleted !== true)),
    [items, showDeleted]
  );

  // ---- Actions (chuẩn theo API bạn liệt kê) ----
  const softDelete = async (id) => {
    if (!confirm("Xoá mềm câu hỏi này?")) return;
    try {
      const res = await http(`${API_BASE}/api/ForumQuestion/${id}`, {
        method: "DELETE",
        headers: authHeaders({ accept: "*/*" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchMine();
    } catch (e) {
      alert("Không xoá mềm được: " + (e.message || "error"));
    }
  };

  const hardDelete = async (id) => {
    if (!confirm("⚠️ Xoá cứng KHÔNG THỂ khôi phục. Tiếp tục?")) return;
    try {
      const res = await http(`${API_BASE}/api/ForumQuestion/${id}/hard`, {
        method: "DELETE",
        headers: authHeaders({ accept: "*/*" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchMine();
    } catch (e) {
      alert("Không xoá cứng được: " + (e.message || "error"));
    }
  };

  const restore = async (id) => {
    try {
      const res = await http(`${API_BASE}/api/ForumQuestion/${id}/restore`, {
        method: "POST",
        headers: authHeaders({ accept: "*/*" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchMine();
    } catch (e) {
      alert("Khôi phục thất bại: " + (e.message || "error"));
    }
  };

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <section className="w-screen px-6 lg:px-12 pt-8">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Câu hỏi của tôi</h1>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={showDeleted}
                  onChange={(e) => setShowDeleted(e.target.checked)}
                />
                Hiện câu hỏi đã xoá mềm
              </label>
              <button
                onClick={() => navigate("/forum/new")}
                className="rounded-full text-white px-4 py-2 text-sm font-semibold"
                style={{ background: PRIMARY }}
                onMouseEnter={(e) => e.currentTarget.style.background = PRIMARY_HOVER}
                onMouseLeave={(e) => e.currentTarget.style.background = PRIMARY}
              >
                + Đặt câu hỏi
              </button>
            </div>
          </div>

          <div className="mt-6">
            {loading && (
              <div className="rounded-xl border bg-white p-6" style={{ borderColor: BORDER }}>
                Đang tải…
              </div>
            )}
            {err && !loading && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
                Không thể tải dữ liệu (chi tiết: {err})
                <div className="mt-3">
                  <button onClick={fetchMine} className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50">
                    Thử lại
                  </button>
                </div>
              </div>
            )}
            {!loading && !err && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((q) => (
                  <article key={q.id} className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: BORDER }}>
                    <div className="p-5">
                      <div className="text-xs text-slate-500">
                        {new Date(q.createdAt).toLocaleString("vi-VN", { hour12: false })}
                        {" • "}{q.isDeleted ? "ĐÃ XOÁ MỀM" : "Đang hiển thị"}
                      </div>
                      <h3 className="mt-2 font-semibold text-slate-900 line-clamp-2">{q.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2 text-sm">
                        <Link to={`/forum/${q.id}`} className="rounded-full border px-3 py-1 hover:bg-slate-50">Xem</Link>
                        {!q.isDeleted && (
                          <button onClick={() => navigate(`/forum/${q.id}/edit`)} className="rounded-full border px-3 py-1 hover:bg-slate-50">Sửa</button>
                        )}
                        {!q.isDeleted ? (
                          <button onClick={() => softDelete(q.id)} className="rounded-full border px-3 py-1 hover:bg-slate-50 text-rose-600">Xoá mềm</button>
                        ) : (
                          <>
                            <button onClick={() => restore(q.id)} className="rounded-full border px-3 py-1 hover:bg-slate-50 text-green-600">Khôi phục</button>
                            <button onClick={() => hardDelete(q.id)} className="rounded-full border px-3 py-1 hover:bg-slate-50 text-rose-700">Xoá cứng</button>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
                {filtered.length === 0 && (
                  <div className="rounded-xl border bg-white p-6 text-slate-600" style={{ borderColor: BORDER }}>
                    Chưa có câu hỏi nào.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
