
// src/pages/Blog.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";
import { isLoggedIn } from "../../utils/auth";
import { useAuth } from "../../store/auth";

/* ---------- THEME ---------- */
const PRIMARY = "#2563eb";
const PRIMARY_HOVER = "#1d4ed8";
const RING = "#93c5fd";
const BORDER = "#e5e7eb";
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

/* ---------- helpers ---------- */
// Lấy token đúng format bạn đưa: localStorage.auth_user = { token, userId, fullName, ... }
// ===== Helpers chung cho auth/token =====
function readLocal(key) {
  try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
}
function decodeJwt(token) {
  try { return JSON.parse(atob(token.split(".")[1] || "")); } catch { return null; }
}

/** Lấy token + memberId (studentId || teacherId) chắc chắn */
function getAuthInfoStrict() {
  // cố gắng lấy token từ nhiều nơi
  let token = null;
  const tObj = readLocal("auth_token");            // { accessToken, refreshToken } ?
  if (tObj?.accessToken) token = tObj.accessToken;

  if (!token) {
    const tStr = localStorage.getItem("access_token"); // chuỗi thuần?
    if (tStr) token = tStr;
  }
  if (!token) {
    const authUser = readLocal("auth_user");       // có thể { token, studentId, teacherId, userId, ... }
    if (authUser?.token) token = authUser.token;
    if (!token && authUser?.accessToken) token = authUser.accessToken;
  }
  if (!token) {
    const raw = localStorage.getItem("token");     // đôi khi bạn lưu thế này
    if (raw) token = raw.replace(/^"|"$/g, "");    // bỏ quote nếu là JSON string
  }

  // suy ra memberId
  let memberId = null;
  const authUser2 = readLocal("auth_user");
  if (authUser2?.studentId) memberId = authUser2.studentId;
  else if (authUser2?.teacherId) memberId = authUser2.teacherId;

  if (!memberId && token) {
    const claims = decodeJwt(token) || {};
    memberId = claims.StudentId || claims.studentId || claims.TeacherId || claims.teacherId || null;
  }

  return { token, memberId };
}

/** Tạo headers có Authorization nếu có token */
function withAuthHeaders(base = {}) {
  const { token } = getAuthInfoStrict();
  return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

function getAuthUser() {
  try {
    return JSON.parse(localStorage.getItem("auth_user") || "null") || null;
  } catch {
    return null;
  }
}
function getAccessToken() {
  const u = getAuthUser();
  return u?.token || null;
}
function getMemberId() {
  const u = getAuthUser();
  // Ưu tiên userId, sau đó studentId (đều có trong response login của bạn)
  return u?.userId || u?.studentId || null;
}
function authHeaders(extra = {}) {
  const token = getAccessToken();
  return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
}

/* ---------- helpers (full-width + gutter đồng bộ) ---------- */
const Section = ({ id, title, subtitle, action, children }) => (
  <section id={id} className="w-screen overflow-x-hidden py-10 lg:py-14">
    <div className="w-screen px-6 lg:px-12">
      {(title || subtitle || action) && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {title && <h2 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">{title}</h2>}
            {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  </section>
);

const Tag = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm transition ${
      active
        ? "bg-[#2563eb] text-white border-[#2563eb]"
        : "border-slate-300 text-slate-700 hover:border-[#2563eb] hover:bg-[#2563eb]/5"
    }`}
  >
    {children}
  </button>
);

const Primary = ({ children, className = "", ...props }) => (
  <button
    type="button"
    className={
      "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

/* ---------- Normalizers (đúng schema bạn đưa) ---------- */
const normPost = (p) => {
  const tags = (p?.tags || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    id: p?.id,
    title: p?.title || "Bài viết",
    cover: p?.thumbnailUrl || "/images/blog-placeholder.jpg",
    tags,
    tagDisplay: tags[0] || "Blog",
    views: p?.viewCount ?? 0,
    likes: p?.likeCount ?? 0,
    comments: p?.discussionCount ?? 0,
    isPublished: !!p?.isPublished,
    createdAt: p?.createdAt || null,
    authorId: p?.authorId || null,
    authorName: p?.authorName || "Tác giả",
  };
};

/* ---------- cards ---------- */
const PostCard = ({ post }) => (
  <article
    className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
    style={{ borderColor: BORDER }}
  >
    <div className="aspect-[16/9] bg-blue-50">
      {post?.cover ? (
        <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full grid place-items-center">
          <span className="text-xs text-blue-400">Ảnh blog</span>
        </div>
      )}
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="text-xs uppercase tracking-wide text-[#2563eb]">
          {post.tagDisplay}
        </span>
        {post.tags.slice(1, 3).map((t, i) => (
          <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8]">
            #{t}
          </span>
        ))}
      </div>
      <h3 className="mt-1 font-semibold text-lg leading-snug text-slate-900 line-clamp-2">
        {post.title}
      </h3>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span className="truncate max-w-[60%]" title={post.authorName}>
          {post.authorName || "Tác giả"}
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          {Number(post.views || 0).toLocaleString("vi-VN")}
        </span>
      </div>

      <Link to={`/blog/${post.id}`} className="mt-3 inline-block text-[#2563eb] hover:underline">
        Đọc thêm
      </Link>
    </div>
  </article>
);

/* ---------- sections ---------- */
function Hero() {
  return (
    <section className="w-screen overflow-x-hidden bg-white pt-8">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
        {/* Trái: minh hoạ */}
        <div className="order-2 lg:order-1">
          <div
            className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-blue-100 via-sky-100 to-indigo-100 border grid place-items-center"
            style={{ borderColor: BORDER }}
          >
            <span className="text-sm text-blue-500">Ảnh hero (thay sau)</span>
          </div>
        </div>

        {/* Phải: nội dung */}
        <div className="order-1 lg:order-2">
          <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
            P Elearning • Blog
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl text-slate-900">
            Kiến thức công nghệ & thiết kế dành cho người học Việt
          </h1>
          <p className="text-slate-600 mt-4 max-w-2xl">
            Bài viết chọn lọc về lập trình, thiết kế trải nghiệm người dùng, và marketing số — cập nhật xu hướng & mẹo thực chiến.
          </p>
          <div className="mt-6">
            <Primary onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}>
              Đọc bài mới nhất
            </Primary>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== (1) TÌM KIẾM ====== */
function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e?.preventDefault?.();
    const key = q.trim();
    if (!key) return;
    navigate(`/blog/search?q=${encodeURIComponent(key)}`);
  };

  return (
    <Section id="search" title="Tìm kiếm bài viết" subtitle="Nhập từ khóa tiêu đề, tag hoặc tên tác giả">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="VD: react performance, UX, ielts speaking..."
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2"
          style={{ borderColor: BORDER }}
        />
        <Primary className="whitespace-nowrap" onClick={submit}>
          Tìm kiếm
        </Primary>
      </form>
    </Section>
  );
}

function BlogList({ posts, loading, error, onSelectTag, selectedTag, allTags }) {
  return (
    <Section
      id="list"
      title="Bài viết mới"
      subtitle="Chọn chủ đề bạn quan tâm để lọc nội dung"
      action={
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Tag key={t} active={t === selectedTag} onClick={() => onSelectTag(t)}>
              {t}
            </Tag>
          ))}
        </div>
      }
    >
      {error && (
        <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
          Không thể tải bài viết (chi tiết: {error})
        </div>
      )}

      {loading && posts.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white overflow-hidden animate-pulse"
              style={{ borderColor: BORDER }}
            >
              <div className="aspect-[16/9] bg-slate-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-16 bg-slate-100 rounded" />
                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center text-slate-600">
              Không có bài viết cho bộ lọc hiện tại.
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

function RelatedBlogs({ posts }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  const related = posts.slice(0, 8);

  return (
    <Section
      id="related"
      title="Bài viết liên quan"
      action={
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt trái">
            ‹
          </button>
          <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt phải">
            ›
          </button>
          <Link to="/blog" className="text-[#2563eb] ml-2 hover:underline">
            Xem tất cả
          </Link>
        </div>
      }
    >
      <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
        {related.map((p) => (
          <div key={p.id} className="min-w-[280px] max-w-[280px]">
            <PostCard post={p} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function MyBlogPreview({ refreshKey }) {
    const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedIn = isLoggedIn();

  const { memberId } = getAuthInfoStrict(); // 👈 lấy chắc chắn

  useEffect(() => {
    if (!loggedIn || !memberId) return;
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/Posts/member/${memberId}`, {
          headers: withAuthHeaders({ accept: "*/*" }),
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = (Array.isArray(data) ? data : []).map((p) => ({
          id: p?.id,
          title: p?.title || "Bài viết",
          cover: p?.thumbnailUrl || "/images/blog-placeholder.jpg",
          tags: (p?.tags || "").split(",").map(s => s.trim()).filter(Boolean),
          tagDisplay: ((p?.tags || "").split(",").map(s => s.trim()).filter(Boolean)[0]) || "Blog",
          views: p?.viewCount ?? 0,
          likes: p?.likeCount ?? 0,
          comments: p?.discussionCount ?? 0,
          isPublished: !!p?.isPublished,
          createdAt: p?.createdAt || null,
          authorId: p?.authorId || null,
          authorName: p?.authorName || "Tác giả",
        }));
        list.sort((a,b) => new Date(b.createdAt||0) - new Date(a.createdAt||0));
        setItems(list.slice(0,3));
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [loggedIn, memberId, refreshKey]);
  // ... phần render giữ nguyên

    return (
      <Section
        id="myblog"
        title="Bài viết của tôi"
        subtitle={loggedIn ? "3 bài gần đây nhất của bạn" : "Đăng nhập để quản lý & viết bài"}
        action={
          loggedIn ? (
            <div className="flex items-center gap-2">
              <Link to="/blog/new" className="rounded-full text-white px-4 py-2 text-sm font-semibold transition"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e)=> (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseLeave={(e)=> (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                + Viết bài
              </Link>
              <Link to="/blog/my" className="text-[#2563eb] hover:underline">Quản lý tất cả</Link>
            </div>
          ) : (
            <Link to="/login" className="text-[#2563eb] hover:underline">Đăng nhập</Link>
          )
        }
      >
        {!loggedIn ? (
          <div className="rounded-2xl border bg-white p-6 text-slate-600" style={{ borderColor: BORDER }}>
            Bạn chưa đăng nhập. Hãy đăng nhập để xem và quản lý bài viết của mình.
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border bg-white overflow-hidden animate-pulse" style={{ borderColor: BORDER }}>
                <div className="aspect-[16/9] bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-16 bg-slate-100 rounded" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <article key={p.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition" style={{ borderColor: BORDER }}>
                <div className="aspect-[16/9] bg-blue-50">
                  {p.cover ? <img src={p.cover} alt={p.title} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wide text-[#2563eb]">{p.tagDisplay}</div>
                  <h3 className="mt-1 font-semibold text-lg leading-snug text-slate-900 line-clamp-2">{p.title}</h3>
                  <div className="mt-3 text-sm text-slate-600">{p.authorName}</div>
                  <Link to={`/blog/${p.id}`} className="mt-3 inline-block text-[#2563eb] hover:underline">Đọc thêm</Link>
                </div>
              </article>
            ))}
            {items.length === 0 && (
              <div className="rounded-2xl border bg-white p-6 text-slate-600 col-span-full" style={{ borderColor: BORDER }}>
                Chưa có bài viết nào.
              </div>
            )}
          </div>
        )}
      </Section>
    );
  }

// function Composer({ onCreated }) {
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [content, setContent] = useState("");
//   const [isPublished, setIsPublished] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [err, setErr] = useState(null);
//   const [okMsg, setOkMsg] = useState("");

//   const canSubmit = title.trim().length >= 1; // BE của bạn cho phép title ngắn, bám swagger

//   const doPost = async (body) => {
//     // dùng fetch trực tiếp để chủ động header giống swagger (Accept: text/plain)
//     const res = await fetch(`${API_BASE}/api/Posts`, {
//       method: "POST",
//       headers: withAuthHeaders({
//         "Content-Type": "application/json",
//         accept: "text/plain", // swagger dùng text/plain — bám y chang để loại trừ edge case
//       }),
//       body: JSON.stringify(body),
//     });
//     const raw = await res.text();
//     let json; try { json = raw ? JSON.parse(raw) : null; } catch { json = null; }

//     if (!res.ok) {
//       const msg = (json && (json.message || json.error || json.title)) || raw || `HTTP ${res.status}`;
//       if (res.status === 401) throw new Error("401 Unauthorized – vui lòng đăng nhập lại.");
//       if (res.status === 403) throw new Error("403 Forbidden – bạn không có quyền đăng.");
//       if (res.status === 400) throw new Error(`400 Bad Request – ${msg}`);
//       throw new Error(msg);
//     }
//     return json;
//   };

//   const submitPost = async () => {
//     setOkMsg(""); setErr(null);
//     const { token, memberId } = getAuthInfoStrict();
//     if (!token) { setErr("Bạn chưa đăng nhập hoặc token đã hết hạn."); return; }
//     if (!canSubmit || submitting) return;

//     try {
//       setSubmitting(true);

//       // CÁCH 1: contentJson là chuỗi đơn giản (swagger demo)
//       const body1 = {
//         title: title.trim(),
//         thumbnailUrl: thumbnailUrl.trim() || null,
//         tags: (tags || "").trim(),     // "a,b,c"
//         contentJson: content.trim(),    // <<< CHUỖI ĐƠN GIẢN
//         isPublished: !!isPublished,
//         authorId: memberId || undefined // nếu BE bỏ qua cũng không sao
//       };

//       let json;
//       try {
//         json = await doPost(body1);
//       } catch (e) {
//         // Nếu BE yêu cầu contentJson là JSON-string (như sample GET) thì fallback:
//         if (String(e.message || "").includes("400")) {
//           const body2 = {
//             ...body1,
//             contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
//           };
//           json = await doPost(body2);
//         } else {
//           throw e;
//         }
//       }

//       const createdRaw = Array.isArray(json?.data) ? json.data?.[0] : json?.data || json;
//       const created = {
//         id: createdRaw?.id,
//         title: createdRaw?.title || "Bài viết",
//         cover: createdRaw?.thumbnailUrl || "/images/blog-placeholder.jpg",
//         tags: (createdRaw?.tags || "").split(",").map(s => s.trim()).filter(Boolean),
//         tagDisplay: ((createdRaw?.tags || "").split(",").map(s => s.trim()).filter(Boolean)[0]) || "Blog",
//         views: createdRaw?.viewCount ?? 0,
//         likes: createdRaw?.likeCount ?? 0,
//         comments: createdRaw?.discussionCount ?? 0,
//         isPublished: !!createdRaw?.isPublished,
//         createdAt: createdRaw?.createdAt || null,
//         authorId: createdRaw?.authorId || null,
//         authorName: createdRaw?.authorName || "Tác giả",
//       };

//       setOkMsg("🎉 Đăng bài thành công!");
//       onCreated?.(created);
//       setTitle(""); setTags(""); setThumbnailUrl(""); setContent(""); setIsPublished(true);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (e) {
//       setErr(e?.message || "Không thể đăng bài.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (!isLoggedIn()) return null;

//   return (
//     <Section id="compose" title="Viết bài mới" subtitle="Chia sẻ kiến thức/kinh nghiệm của bạn với cộng đồng">
//       <div className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
//         {okMsg && (
//           <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm px-4 py-3">
//             {okMsg}
//           </div>
//         )}
//         {err && (
//           <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
//             {err}
//           </div>
//         )}
//         {/* form giống bạn đang có — giữ nguyên UI */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm font-medium">Tiêu đề</label>
//             <input value={title} onChange={(e) => setTitle(e.target.value)}
//               className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: BORDER }}
//               placeholder="Ví dụ: Template Speaking Part 2…" />
//           </div>
//           <div>
//             <label className="text-sm font-medium">Tags (phân cách bằng dấu phẩy)</label>
//             <input value={tags} onChange={(e) => setTags(e.target.value)}
//               className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: BORDER }}
//               placeholder="react, ux, ielts" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="text-sm font-medium">Ảnh bìa (thumbnailUrl)</label>
//             <input value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)}
//               className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: BORDER }}
//               placeholder="https://..." />
//           </div>
//           <div className="md:col-span-2">
//             <label className="text-sm font-medium">Nội dung</label>
//             <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)}
//               className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: BORDER }}
//               placeholder='Ví dụ: "SwiftUI rất hay..."' />
//             <div className="mt-2 text-xs text-slate-500">
//               Mặc định gửi <code>contentJson</code> là chuỗi; nếu BE yêu cầu JSON-string kiểu <code>{"{ blocks:[{text}] }"}</code> sẽ tự chuyển.
//             </div>
//           </div>
//           <div className="md:col-span-2">
//             <label className="inline-flex items-center gap-2 text-sm">
//               <input type="checkbox" className="accent-blue-600" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
//               Xuất bản ngay (isPublished)
//             </label>
//           </div>
//         </div>

//         <div className="mt-4 flex items-center justify-end">
//           <button
//             type="button"
//             disabled={!canSubmit || submitting}
//             onClick={submitPost}
//             className={`rounded-full text-white px-5 py-3 transition ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
//             style={{ backgroundColor: PRIMARY }}
//           >
//             {submitting ? "Đang đăng..." : "Đăng bài"}
//           </button>
//         </div>
//       </div>
//     </Section>
//   );
// }





function Composer({ onCreated }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);
  const [okMsg, setOkMsg] = useState("");

  // backend cho phép title ngắn → giữ như bạn
  const canSubmit = title.trim().length >= 1;

  const submitPost = async () => {
    // nếu chưa login thì báo luôn (Composer đã return null khi !isLoggedIn nhưng phòng trường hợp lệch state)
    if (!isLoggedIn()) {
      setErr("Bạn cần đăng nhập để viết bài.");
      return;
    }
    if (!canSubmit || submitting) return;

    setOkMsg("");
    setErr(null);

    try {
      setSubmitting(true);

      // GỬI GIỐNG AskQuestion: contentJson là JSON.stringify(...)
      const body = {
        title: title.trim(),
        thumbnailUrl: thumbnailUrl.trim() || null,
        tags: (tags || "").trim(), // "a,b,c"
        contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
        isPublished: !!isPublished,
        // authorId: có thể để BE đọc từ token, nên không bắt buộc
      };

      const res = await http(`${API_BASE}/api/Posts`, {
        method: "POST",
        headers: authHeaders({
          "Content-Type": "application/json",
          accept: "*/*",       // giống AskQuestion.jsx
        }),
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const j = await res.json();
          if (j?.message) msg = j.message;
          else if (j?.error) msg = j.error;
          else if (j?.title) msg = j.title;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      const createdRaw = Array.isArray(data?.data) ? data.data[0] : data?.data || data;

      // Dùng chung normalizer cho thống nhất UI
      const created = normPost(createdRaw);

      setOkMsg("🎉 Đăng bài thành công!");
      onCreated?.(created);

      // reset form
      setTitle("");
      setTags("");
      setThumbnailUrl("");
      setContent("");
      setIsPublished(true);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setErr(e?.message || "Không thể đăng bài.");
    } finally {
      setSubmitting(false);
    }
  };

  // giống cũ: nếu chưa login thì không hiện Composer
  if (!isLoggedIn()) return null;

  return (
    <Section id="compose" title="Viết bài mới" subtitle="Chia sẻ kiến thức/kinh nghiệm của bạn với cộng đồng">
      <div className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
        {okMsg && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm px-4 py-3">
            {okMsg}
          </div>
        )}
        {err && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
            {err}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Tiêu đề</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
              style={{ borderColor: BORDER }}
              placeholder="Ví dụ: Template Speaking Part 2…"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Tags (phân cách bằng dấu phẩy)</label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
              style={{ borderColor: BORDER }}
              placeholder="react, ux, ielts"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Ảnh bìa (thumbnailUrl)</label>
            <input
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
              style={{ borderColor: BORDER }}
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Nội dung</label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2"
              style={{ borderColor: BORDER }}
              placeholder='Ví dụ: "SwiftUI rất hay..."'
            />
            <div className="mt-2 text-xs text-slate-500">
              Ở backend, <code>contentJson</code> đang được gửi dạng JSON-string giống phần Hỏi đáp.
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="accent-blue-600"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              Xuất bản ngay (isPublished)
            </label>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <button
            type="button"
            disabled={!canSubmit || submitting}
            onClick={submitPost}
            className={`rounded-full text-white px-5 py-3 transition ${
              submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: PRIMARY }}
          >
            {submitting ? "Đang đăng..." : "Đăng bài"}
          </button>
        </div>
      </div>
    </Section>
  );
}



/* ---------- Page ---------- */
export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("Tất cả");
  const [myReloadKey, setMyReloadKey] = useState(0); // trigger MyBlog refetch

  // Lấy danh sách post ban đầu (public)
  const fetchAll = async () => {
    const res = await http(`${API_BASE}/api/Posts`, { headers: { accept: "*/*" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const arr = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : [];
    return arr.map(normPost);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await fetchAll();
        if (mounted) setPosts(list);
      } catch (e) {
        if (mounted) setError(e?.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Suy ra tag list từ dữ liệu
  const allTags = useMemo(() => {
    const tags = new Set(["Tất cả"]);
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [posts]);

  // Chọn tag -> gọi API search, fallback lọc local
  const handleSelectTag = async (t) => {
    setSelectedTag(t);
    if (t === "Tất cả") {
      try {
        setLoading(true);
        const list = await fetchAll();
        setPosts(list);
      } catch {
        // giữ nguyên
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const res = await http(`${API_BASE}/api/Posts/search?tag=${encodeURIComponent(t)}`, {
        headers: { accept: "*/*" },
      });
      if (res.ok) {
        const json = await res.json();
        const arr = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : [];
        setPosts(arr.map(normPost));
      } else {
        setPosts((prev) => prev.filter((p) => p.tags.includes(t)));
      }
    } catch {
      setPosts((prev) => prev.filter((p) => p.tags.includes(t)));
    } finally {
      setLoading(false);
    }
  };

  // Bài viết liên quan dùng dữ liệu hiện tại
  const related = useMemo(() => posts.slice(0, 8), [posts]);

  // Khi tạo mới thành công -> prepend + trigger MyBlog reload
  const onCreated = (created) => {
    setPosts((prev) => [created, ...prev]);
    setMyReloadKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <Hero />

        {/* (1) Search */}
        <SearchBar />

        {/* Danh sách blog (public) */}
        <BlogList
          posts={posts}
          loading={loading}
          error={error}
          selectedTag={selectedTag}
          allTags={allTags}
          onSelectTag={handleSelectTag}
        />

        {/* Related */}
        <RelatedBlogs posts={related} />

        {/* (2) My Blog Preview */}
        <MyBlogPreview refreshKey={myReloadKey} />

        {/* Composer: đăng bài có token + thông báo thành công */}
        <Composer onCreated={onCreated} />
      </main>
      <Footer />
    </>
  );
}
