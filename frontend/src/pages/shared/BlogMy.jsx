


































// src/pages/shared/BlogMy.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAuth } from "../../store/auth";
import { isLoggedIn, requireAuth } from "../../utils/auth";
import { http } from "../../utils/http";

/* ===== Theme ===== */
const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8" };
const BORDER = "#e5e7eb";
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

/* ===== Helpers: token & headers ===== */
function getAccessToken() {
  try {
    // utils/auth.setTokens({accessToken, refreshToken})
    const at = JSON.parse(localStorage.getItem("auth_token") || "null");
    if (at?.accessToken) return at.accessToken;
  } catch { }
  try {
    // fallback vài key phổ biến
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

/* Giải mã rất nhẹ (không verify) để lấy claim từ JWT */
function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

/* ===== Layout section ===== */
const Section = ({ id, title, action, children }) => (
  <section id={id} className="w-screen overflow-x-hidden py-8 lg:py-10">
    <div className="w-screen px-6 lg:px-12">
      {(title || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default function BlogMy() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hydrate } = useAuth();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [items, setItems] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);

  // --- Resolve memberId chắc chắn ---
  const memberId = useMemo(() => {
    // 1) ưu tiên trong store
    if (user?.memberId) return user.memberId;
    if (user?.studentId) return user.studentId;
    if (user?.id) return user.id;

    // 2) trong localStorage do app lưu thủ công
    try {
      const u = JSON.parse(localStorage.getItem("auth_user") || "null");
      if (u?.memberId) return u.memberId;
      if (u?.studentId) return u.studentId;
      if (u?.id) return u.id;
    } catch { }

    // 3) decode JWT claims: StudentId / nameidentifier
    const token = getAccessToken();
    if (token) {
      const payload = decodeJwt(token);
      // ví dụ bạn đã gửi: { StudentId: "...", nameidentifier: "..." }
      if (payload?.StudentId) return payload.StudentId;
      if (payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
        return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      if (payload?.nameidentifier) return payload.nameidentifier;
      if (payload?.userId) return payload.userId;
    }

    return null;
  }, [user]);

  // Guard đăng nhập
  useEffect(() => {
    hydrate?.();
    if (!isLoggedIn()) {
      requireAuth(navigate, location.pathname + location.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch danh sách bài của tôi
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
      const res = await http(`${API_BASE}/api/Posts/member/${memberId}`, {
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
      const list = Array.isArray(data) ? data : [];
      // sort mới nhất trước
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setItems(list);
    } catch (e) {
      setErr(e.message || "Fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  const filtered = useMemo(
    () => items.filter((p) => (showDeleted ? p.isDeleted === true : p.isDeleted !== true)),
    [items, showDeleted]
  );

  // ---- Actions ----
  async function callAndReload(url, method, confirmText, okText) {
    if (confirmText && !confirm(confirmText)) return;
    try {
      const res = await http(url, {
        method,
        headers: authHeaders({ accept: "*/*" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchMine();
      if (okText) alert(okText);
    } catch (e) {
      alert(`Lỗi thao tác: ${e.message || "error"}`);
    }
  }

  const onSoftDelete = (id) =>
    callAndReload(
      `${API_BASE}/api/Posts/deletesoft/${id}`,
      "DELETE",
      "Xoá mềm bài viết này?",
      "Đã xoá mềm."
    );

  const onHardDelete = (id) =>
    callAndReload(
      `${API_BASE}/api/Posts/deletehard/${id}`,
      "DELETE",
      "⚠️ Xoá cứng KHÔNG THỂ khôi phục. Tiếp tục?",
      "Đã xoá cứng."
    );

  const onRestore = (id) =>
    callAndReload(`${API_BASE}/api/Posts/restore/${id}`, "PATCH", null, "Đã khôi phục.");

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <Section
          id="toolbar"
          title="Bài viết của tôi"
          action={
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={showDeleted}
                  onChange={(e) => setShowDeleted(e.target.checked)}
                />
                Hiện bài đã xoá mềm
              </label>
              <button
                onClick={() => navigate("/blog/new")}
                className="rounded-full text-white px-4 py-2 text-sm font-semibold transition"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
              >
                + Viết bài mới
              </button>
            </div>
          }
        >
          {loading && (
            <div
              className="rounded-xl border bg-white p-6 text-slate-600"
              style={{ borderColor: BORDER }}
            >
              Đang tải…
            </div>
          )}

          {err && !loading && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
              Không thể tải dữ liệu (chi tiết: {err})
              <div className="mt-3">
                <button
                  onClick={fetchMine}
                  className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
                >
                  Thử lại
                </button>
              </div>
            </div>
          )}

          {!loading && !err && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article key={p.id} className="rounded-2xl border bg-white overflow-hidden">
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    {p.thumbnailUrl ? (
                      <img
                        src={p.thumbnailUrl}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-slate-400 text-sm">
                        Thumbnail
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-slate-500">
                      {new Date(p.createdAt).toLocaleString("vi-VN", { hour12: false })}
                      {" • "}
                      {p.isPublished ? "Đã xuất bản" : "Bản nháp"}
                      {p.isDeleted ? " • ĐÃ XOÁ MỀM" : ""}
                    </div>
                    <h3 className="mt-2 font-semibold text-slate-900 line-clamp-2">{p.title}</h3>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                      <Link
                        to={`/blog/${p.id}`}
                        className="rounded-full border px-3 py-1 hover:bg-slate-50"
                      >
                        Xem
                      </Link>

                      {!p.isDeleted && (
                        <button
                          onClick={() => navigate(`/blog/${p.id}/edit`)}
                          className="rounded-full border px-3 py-1 hover:bg-slate-50"
                        >
                          Sửa
                        </button>
                      )}

                      {!p.isDeleted ? (
                        <button
                          onClick={() => onSoftDelete(p.id)}
                          className="rounded-full border px-3 py-1 hover:bg-slate-50 text-rose-600"
                        >
                          Xoá mềm
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => onRestore(p.id)}
                            className="rounded-full border px-3 py-1 hover:bg-slate-50 text-green-600"
                          >
                            Khôi phục
                          </button>
                          <button
                            onClick={() => onHardDelete(p.id)}
                            className="rounded-full border px-3 py-1 hover:bg-slate-50 text-rose-700"
                          >
                            Xoá cứng
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              {filtered.length === 0 && (
                <div
                  className="rounded-xl border bg-white p-6 text-slate-600"
                  style={{ borderColor: BORDER }}
                >
                  Chưa có bài viết nào.
                </div>
              )}
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
