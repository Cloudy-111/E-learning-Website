


// src/pages/shared/BlogEditor.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";
import { isLoggedIn, requireAuth } from "../../utils/auth";

const BRAND = { primary: "#2563eb", primaryHover: "#1d4ed8" };
const BORDER = "#e5e7eb";
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

/* -------- util: lấy token từ localStorage (đa dạng key) -------- */
function getAccessTokenFromStorage() {
  try {
    const a = JSON.parse(localStorage.getItem("auth_token") || "null");
    if (a?.accessToken) return a.accessToken;
    if (typeof a === "string") return a; // phòng khi lưu thẳng chuỗi
  } catch { }
  try {
    const b = JSON.parse(localStorage.getItem("token") || "null");
    if (b?.accessToken) return b.accessToken;
  } catch { }
  try {
    const c = localStorage.getItem("access_token");
    if (c) return c;
  } catch { }
  return null;
}
function authHeaders(extra = {}) {
  const token = getAccessTokenFromStorage();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
}

/* -------- layout helper -------- */
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

/* -------- page -------- */
export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Guard: bắt buộc đăng nhập
  useEffect(() => {
    if (!isLoggedIn()) {
      requireAuth(navigate, `/blog/${id}/edit`);
    }
  }, [id, navigate]);

  // form state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState(""); // map vào contentJson.blocks[0].text
  const [isPublished, setIsPublished] = useState(true);

  const canSubmit = useMemo(
    () => title.trim().length >= 1 && content.trim().length >= 1,
    [title, content]
  );

  // nạp chi tiết bài viết
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");

        const res = await http(`${API_BASE}/api/Posts/${id}`, {
          headers: authHeaders({ accept: "*/*" }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const p = await res.json();

        setTitle(p?.title || "");
        setTags(p?.tags || "");
        setThumbnailUrl(p?.thumbnailUrl || "");
        setIsPublished(!!p?.isPublished);

        let text = "";
        if (p?.contentJson) {
          try {
            const cj = typeof p.contentJson === "string" ? JSON.parse(p.contentJson) : p.contentJson;
            text = cj?.blocks?.[0]?.text || "";
          } catch {
            text = "";
          }
        }
        setContent(text);
      } catch (e) {
        setError(e?.message || "Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // lưu
  const onSave = async () => {
    if (!canSubmit || saving) return;

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: title.trim(),
        contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
        thumbnailUrl: thumbnailUrl.trim() || null,
        tags: (tags || "").trim(),
        isPublished,
      };

      const res = await http(`${API_BASE}/api/Posts/${id}`, {
        method: "PUT",
        headers: authHeaders({
          "Content-Type": "application/json",
          accept: "*/*",
        }),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const j = await res.json();
          if (j?.message) msg = j.message;
        } catch { }
        throw new Error(msg);
      }

      // ok → về /blog/my
      navigate("/blog/my?ok=updated", { replace: true });
    } catch (e) {
      setError(e?.message || "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <Section
          title="Chỉnh sửa bài viết"
          action={
            <div className="flex items-center gap-2">
              <Link
                to="/blog/my"
                className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
              >
                ← Quay lại “Bài viết của tôi”
              </Link>
              <button
                onClick={onSave}
                disabled={!canSubmit || saving}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.primaryHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.primary)}
              >
                {saving ? "Đang lưu…" : "Lưu thay đổi"}
              </button>
            </div>
          }
        >
          <div className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-slate-600">Đang tải dữ liệu…</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {/* ID hiển thị tham khảo */}
                <div className="text-xs text-slate-500">
                  ID: <span className="font-mono">{id}</span>
                </div>

                <div>
                  <label className="text-sm font-medium">Tiêu đề</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                    style={{ borderColor: BORDER }}
                    placeholder="Tiêu đề bài viết…"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Tags (phân cách bằng dấu phẩy)</label>
                    <input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                      style={{ borderColor: BORDER }}
                      placeholder="react, performance, ux…"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Ảnh bìa (thumbnailUrl)</label>
                    <input
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
                      style={{ borderColor: BORDER }}
                      placeholder="https://…"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Nội dung</label>
                  <textarea
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
                    style={{ borderColor: BORDER }}
                    placeholder="Nội dung (sẽ lưu vào contentJson.blocks[0].text)…"
                  />
                  <div className="mt-2 text-xs text-slate-500">
                    Sẽ gửi lên server ở dạng <code>contentJson</code> ={" "}
                    <code>{`{ "blocks": [{ "text": "<nội dung>" }] }`}</code>
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-blue-600"
                  />
                  Xuất bản ngay (isPublished)
                </label>

                <div className="flex items-center justify-end gap-2">
                  <Link to="/blog/my" className="rounded-full border px-4 py-2 hover:bg-slate-50">
                    Hủy
                  </Link>
                  <button
                    onClick={onSave}
                    disabled={!canSubmit || saving}
                    className="rounded-full text-white px-4 py-2 font-semibold transition disabled:opacity-60"
                    style={{ backgroundColor: BRAND.primary }}
                  >
                    {saving ? "Đang lưu…" : "Lưu thay đổi"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
