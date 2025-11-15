
// src/pages/BlogDetail.jsx

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// /* ---------- utils ---------- */
// const ls = {
//   get: (k, fallback) => {
//     try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
//     catch { return fallback; }
//   },
//   set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
// };
// const fmtTime = (d) =>
//   new Date(d).toLocaleString("vi-VN", { hour12: false });

// /* === helpers: full-width section (đồng bộ gutter) === */
// const Section = ({ id, title, subtitle, action, children, className = "" }) => (
//   <section id={id} className={`w-screen overflow-x-hidden py-10 lg:py-14 ${className}`}>
//     <div className="w-screen px-6 lg:px-12">
//       {(title || subtitle || action) && (
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             {title && <h2 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">{title}</h2>}
//             {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
//           </div>
//           {action}
//         </div>
//       )}
//       {children}
//     </div>
//   </section>
// );

// const Primary = ({ children, className = "", ...props }) => (
//   <button
//     type="button"
//     className={
//       "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
//       className
//     }
//     {...props}
//   >
//     {children}
//   </button>
// );

// /* === icons nhỏ === */
// const Eye = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
//   </svg>
// );
// const Heart = ({ filled }) => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
//     <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>
//   </svg>
// );

// /* === Like bar (localStorage theo postId) === */
// function LikeBar() {
//   const { id: postId = "default" } = useParams();
//   const LIKE_KEY = `blog_like_${postId}`;
//   const COUNT_KEY = `blog_like_count_${postId}`;

//   const [liked, setLiked] = useState(ls.get(LIKE_KEY, false));
//   const [count, setCount] = useState(ls.get(COUNT_KEY, 0));

//   const toggleLike = () => {
//     const nextLiked = !liked;
//     const nextCount = Math.max(0, count + (nextLiked ? 1 : -1));
//     setLiked(nextLiked);
//     setCount(nextCount);
//     ls.set(LIKE_KEY, nextLiked);
//     ls.set(COUNT_KEY, nextCount);
//   };

//   return (
//     <div className="mt-6 flex flex-wrap items-center gap-3">
//       <button
//         onClick={toggleLike}
//         className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
//           ${liked ? "bg-rose-50 text-rose-600 border-rose-200" : "hover:bg-slate-50"}`}
//         aria-pressed={liked}
//       >
//         <Heart filled={liked} /> {liked ? "Đã thích" : "Thích"} • {count}
//       </button>

//       <span className="text-sm text-slate-600 ml-1">Chia sẻ:</span>
//       <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Facebook</button>
//       <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Twitter/X</button>
//       <button
//         className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
//         onClick={() => navigator.clipboard?.writeText(location.href)}
//       >
//         Sao chép link
//       </button>
//     </div>
//   );
// }

// /* === Comments (localStorage theo postId) === */
// function Comments() {
//   const { id: postId = "default" } = useParams();
//   const KEY = `blog_comments_${postId}`;

//   const [items, setItems] = useState(ls.get(KEY, []));
//   const [name, setName] = useState(ls.get("blog_comment_name", ""));
//   const [content, setContent] = useState("");

//   useEffect(() => { ls.set(KEY, items); }, [items]);
//   useEffect(() => { if (name) ls.set("blog_comment_name", name); }, [name]);

//   const addComment = (e) => {
//     e.preventDefault();
//     const trimmed = content.trim();
//     const trimmedName = (name || "Khách").trim();
//     if (!trimmed) return;

//     const next = [
//       ...items,
//       { id: crypto.randomUUID(), name: trimmedName, content: trimmed, createdAt: Date.now() },
//     ];
//     setItems(next);
//     setContent("");
//   };

//   const removeComment = (id) => {
//     setItems(items.filter((c) => c.id !== id));
//   };

//   return (
//     <Section id="comments" title={`Bình luận (${items.length})`}>
//       {/* form */}
//       <form onSubmit={addComment} className="rounded-2xl border bg-white p-5 grid gap-3">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Tên hiển thị (tuỳ chọn)"
//             className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
//           />
//           <div className="sm:col-span-2">
//             <textarea
//               required
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               rows={3}
//               placeholder="Viết bình luận của bạn…"
//               className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
//             />
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="text-xs text-slate-500">Ấn <b>Ctrl + Enter</b> để đăng nhanh</div>
//           <Primary type="submit" onKeyDown={(e) => {
//             if (e.ctrlKey && e.key === "Enter") addComment(e);
//           }}>Đăng bình luận</Primary>
//         </div>
//       </form>

//       {/* list */}
//       <div className="mt-6 grid gap-4">
//         {items.length === 0 && (
//           <div className="text-sm text-slate-500">Chưa có bình luận nào. Hãy là người đầu tiên!</div>
//         )}
//         {items.map((c) => (
//           <div key={c.id} className="rounded-2xl border bg-white p-4">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <div className="text-sm font-medium text-slate-900">{c.name || "Khách"}</div>
//                 <div className="text-xs text-slate-500">{fmtTime(c.createdAt)}</div>
//               </div>
//               <button
//                 onClick={() => removeComment(c.id)}
//                 className="text-xs text-slate-500 rounded-full border px-2 py-1 hover:bg-slate-50"
//                 title="Xoá bình luận này (cục bộ)"
//               >
//                 Xoá
//               </button>
//             </div>
//             <p className="mt-2 text-slate-800 whitespace-pre-wrap">{c.content}</p>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* === HERO: tiêu đề + meta === */
// function Hero() {
//   return (
//     <section className="w-screen overflow-x-hidden pt-8">
//       <div className="w-screen px-6 lg:px-12">
//         {/* breadcrumb */}
//         <div className="text-sm text-slate-500">
//           <Link to="/blog" className="hover:text-[#2563eb]">Blog</Link> / <span>Chi tiết</span>
//         </div>

//         <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-screen-xl text-slate-900">
//           Vì sao SwiftUI nên nằm trong “tầm ngắm” của mọi lập trình viên di động
//         </h1>

//         <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
//           <div className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden grid place-items-center">
//               <span className="text-xs text-slate-500">IMG</span>
//             </div>
//             <div>
//               <div className="font-medium leading-tight text-slate-900">Lina</div>
//               <div className="text-xs text-slate-500">Tác giả • Theo dõi</div>
//             </div>
//           </div>

//           <span className="inline-flex items-center gap-1 text-slate-600">
//             <Eye /> {Number(251232).toLocaleString("vi-VN")}
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* === THÂN BÀI + SIDEBAR === */
// function Body() {
//   return (
//     <section className="w-screen overflow-x-hidden">
//       <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Bài viết */}
//         <article className="lg:col-span-2">
//           {/* media */}
//           <div className="rounded-2xl overflow-hidden border">
//             <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
//               <span className="text-sm text-blue-500">Ảnh/Video bài viết (thay sau)</span>
//             </div>
//           </div>

//           {/* nội dung */}
//           <div className="prose prose-slate max-w-none mt-6">
//             <p>
//               TOTC là nền tảng cho phép giảng viên tạo lớp học trực tuyến: lưu trữ tài liệu, quản lý bài tập/quiz/kỳ thi,
//               theo dõi deadline, chấm điểm và phản hồi — tất cả trong một nơi.
//             </p>
//             <p>
//               <strong>SwiftUI</strong> mang đến cách tiếp cận hiện đại, cú pháp ngắn gọn và khả năng tuỳ biến mạnh mẽ
//               giúp tăng tốc phát triển giao diện đẹp mắt trên iOS, iPadOS và macOS.
//             </p>

//             <h3>Điểm mạnh nổi bật</h3>
//             <ul>
//               <li><b>Declarative UI</b> — code gọn, dễ đọc và ít lỗi hơn.</li>
//               <li><b>Preview theo thời gian thực</b> — giảm thời gian build & thử nghiệm.</li>
//               <li><b>Composable components</b> — tái sử dụng linh hoạt, dễ mở rộng.</li>
//             </ul>

//             <blockquote>
//               “Mọi thứ bạn có thể làm trong lớp học truyền thống, bạn đều có thể làm với TOTC.”
//             </blockquote>

//             <figure>
//               <div className="aspect-[21/9] rounded-xl bg-slate-100 grid place-items-center">
//                 <span className="text-xs text-slate-400">Hình minh hoạ</span>
//               </div>
//               <figcaption className="text-center text-sm text-slate-500 mt-2">
//                 Class bổ sung 30 triệu đô để phát triển giải pháp edtech thân thiện với Zoom
//               </figcaption>
//             </figure>

//             <p>
//               Class — ra mắt chưa đầy một năm bởi đồng sáng lập Blackboard, Michael Chasen — tích hợp sâu với Zoom để
//               đưa trải nghiệm lớp học vào môi trường trực tuyến. (Nội dung demo — hãy thay bằng copy thực tế.)
//             </p>
//           </div>

//           {/* Like + Share */}
//           <LikeBar />

//           {/* Comments */}
//           <Comments />
//         </article>

//         {/* Sidebar */}
//         <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
//           <div className="rounded-2xl border bg-white p-6">
//             <h3 className="font-semibold text-slate-900">Tác giả</h3>
//             <div className="mt-3 flex items-center gap-3">
//               <div className="h-10 w-10 rounded-full bg-slate-200 grid place-items-center">IMG</div>
//               <div>
//                 <div className="font-medium leading-tight text-slate-900">Lina</div>
//                 <div className="text-xs text-slate-500">Theo dõi</div>
//               </div>
//             </div>

//             <div className="mt-6 text-sm text-slate-600">
//               TOTC giúp các trường truyền thống & online quản lý lịch học, điểm danh, thanh toán và lớp học ảo —
//               tất cả trên nền tảng đám mây bảo mật.
//             </div>

//             <div className="mt-6">
//               <h4 className="font-medium mb-2 text-slate-900">Tags</h4>
//               <div className="flex flex-wrap gap-2">
//                 {["SwiftUI", "Mobile", "UX/UI", "iOS"].map((t) => (
//                   <span key={t} className="text-xs px-3 py-1 rounded-full border">{t}</span>
//                 ))}
//               </div>
//             </div>

//             {/* Newsletter */}
//             <form
//               onSubmit={(e) => { e.preventDefault(); alert("Đã đăng ký nhận bản tin (demo)"); }}
//               className="mt-6 rounded-xl border p-4 grid gap-3"
//             >
//               <div className="text-sm font-medium text-slate-900">Nhận bản tin</div>
//               <input
//                 type="email"
//                 required
//                 placeholder="Email của bạn"
//                 className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
//               />
//               <Primary>Đăng ký</Primary>
//             </form>
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }

// /* === BÀI VIẾT LIÊN QUAN (carousel) === */
// function RelatedBlog() {
//   const ref = useRef(null);
//   const scroll = (dir) => ref.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });

//   const items = Array.from({ length: 6 }).map((_, i) => ({
//     id: i,
//     title: "Class bổ sung 30 triệu đô cho giải pháp edtech thân thiện với Zoom",
//     excerpt:
//       "Class, do đồng sáng lập Blackboard Michael Chasen phát triển, tích hợp sâu với Zoom để mô phỏng lớp học…",
//     author: "Lina",
//     views: 251232,
//   }));

//   return (
//     <Section
//       id="related"
//       title="Bài viết liên quan"
//       action={
//         <div className="flex items-center gap-2">
//           <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt trái">‹</button>
//           <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt phải">›</button>
//           <Link to="/blog" className="text-[#2563eb] ml-2 hover:underline">Xem tất cả</Link>
//         </div>
//       }
//     >
//       <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
//         {items.map((p) => (
//           <article key={p.id} className="min-w-[280px] max-w-[280px] rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
//             <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
//               <span className="text-xs text-blue-400">Ảnh blog</span>
//             </div>
//             <div className="p-5">
//               <h3 className="font-semibold leading-snug line-clamp-2 text-slate-900">{p.title}</h3>
//               <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.excerpt}</p>
//               <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
//                 <span>{p.author}</span>
//                 <span className="inline-flex items-center gap-1"><Eye /> {p.views.toLocaleString("vi-VN")}</span>
//               </div>
//               <Link to="#" className="text-[#2563eb] text-sm mt-2 inline-block hover:underline">Đọc thêm</Link>
//             </div>
//           </article>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* === PAGE === */
// export default function BlogDetail() {
//   useEffect(() => window.scrollTo(0, 0), []);
//   return (
//     <>
//       <Header />
//       <main className="w-screen overflow-x-hidden">
//         <Hero />
//         <Body />
//         <RelatedBlog />
//       </main>
//       <Footer />
//     </>
//   );
// }







































// src/pages/BlogDetail.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";

/* ---------- constants ---------- */
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
const BORDER = "#e5e7eb";

/* ---------- utils ---------- */
const ls = {
  get: (k, fallback) => {
    try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const fmtTime = (d) =>
  d ? new Date(d).toLocaleString("vi-VN", { hour12: false }) : "—";

/* ---------- small icons ---------- */
const Eye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const Heart = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 22l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/>
  </svg>
);

/* ---------- helpers: unified section ---------- */
const Section = ({ id, title, subtitle, action, children, className = "" }) => (
  <section id={id} className={`w-screen overflow-x-hidden py-10 lg:py-14 ${className}`}>
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

/* ---------- data normalizers ---------- */
const normDetail = (p) => {
  // API sample:
  // {
  //  contentJson: "{\"blocks\":[{\"text\":\"...\"}]}",
  //  updatedAt, id, title, thumbnailUrl, tags, viewCount, likeCount, discussionCount,
  //  isPublished, createdAt, authorId, authorName, ...
  // }
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
    updatedAt: p?.updatedAt || null,
    authorId: p?.authorId || null,
    authorName: p?.authorName || "Tác giả",
    contentJson: p?.contentJson || null,
  };
};

const normListItem = (p) => ({
  id: p?.id,
  title: p?.title || "Bài viết",
  cover: p?.thumbnailUrl || "/images/blog-placeholder.jpg",
  tags: (p?.tags || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  tagDisplay: (p?.tags || "").split(",").map(s => s.trim()).filter(Boolean)[0] || "Blog",
  authorName: p?.authorName || "Tác giả",
  views: p?.viewCount ?? 0,
});

/* ---------- Like bar (local) ---------- */
function LikeBar({ seedCount = 0 }) {
  const { id: postId = "default" } = useParams();
  const LIKE_KEY = `blog_like_${postId}`;
  const COUNT_KEY = `blog_like_count_${postId}`;

  // khởi tạo từ localStorage, nếu chưa có thì seed theo likeCount từ server
  const initLiked = ls.get(LIKE_KEY, false);
  const initCount = ls.get(COUNT_KEY, null);
  const [liked, setLiked] = useState(initLiked);
  const [count, setCount] = useState(
    typeof initCount === "number" ? initCount : Number(seedCount || 0)
  );

  useEffect(() => {
    // nếu chưa có COUNT_KEY thì seed
    if (initCount === null) ls.set(COUNT_KEY, Number(seedCount || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLike = () => {
    const nextLiked = !liked;
    const nextCount = Math.max(0, count + (nextLiked ? 1 : -1));
    setLiked(nextLiked);
    setCount(nextCount);
    ls.set(LIKE_KEY, nextLiked);
    ls.set(COUNT_KEY, nextCount);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <button
        onClick={toggleLike}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition
          ${liked ? "bg-rose-50 text-rose-600 border-rose-200" : "hover:bg-slate-50"}`}
        aria-pressed={liked}
      >
        <Heart filled={liked} /> {liked ? "Đã thích" : "Thích"} • {count}
      </button>

      <span className="text-sm text-slate-600 ml-1">Chia sẻ:</span>
      <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Facebook</button>
      <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Twitter/X</button>
      <button
        className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
        onClick={() => navigator.clipboard?.writeText(location.href)}
      >
        Sao chép link
      </button>
    </div>
  );
}

/* ---------- Comments (local) ---------- */
function Comments() {
  const { id: postId = "default" } = useParams();
  const KEY = `blog_comments_${postId}`;

  const [items, setItems] = useState(ls.get(KEY, []));
  const [name, setName] = useState(ls.get("blog_comment_name", ""));
  const [content, setContent] = useState("");

  useEffect(() => { ls.set(KEY, items); }, [items]);
  useEffect(() => { if (name) ls.set("blog_comment_name", name); }, [name]);

  const addComment = (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    const trimmedName = (name || "Khách").trim();
    if (!trimmed) return;

    const next = [
      ...items,
      { id: crypto.randomUUID(), name: trimmedName, content: trimmed, createdAt: Date.now() },
    ];
    setItems(next);
    setContent("");
  };

  const removeComment = (id) => {
    setItems(items.filter((c) => c.id !== id));
  };

  return (
    <Section id="comments" title={`Bình luận (${items.length})`}>
      {/* form */}
      <form onSubmit={addComment} className="rounded-2xl border bg-white p-5 grid gap-3" style={{ borderColor: BORDER }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên hiển thị (tuỳ chọn)"
            className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
            style={{ borderColor: BORDER }}
          />
          <div className="sm:col-span-2">
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="Viết bình luận của bạn…"
              className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
              style={{ borderColor: BORDER }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">Ấn <b>Ctrl + Enter</b> để đăng nhanh</div>
          <Primary type="submit" onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "Enter") addComment(e);
          }}>Đăng bình luận</Primary>
        </div>
      </form>

      {/* list */}
      <div className="mt-6 grid gap-4">
        {items.length === 0 && (
          <div className="text-sm text-slate-500">Chưa có bình luận nào. Hãy là người đầu tiên!</div>
        )}
        {items.map((c) => (
          <div key={c.id} className="rounded-2xl border bg-white p-4" style={{ borderColor: BORDER }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-medium text-slate-900">{c.name || "Khách"}</div>
                <div className="text-xs text-slate-500">{fmtTime(c.createdAt)}</div>
              </div>
              <button
                onClick={() => removeComment(c.id)}
                className="text-xs text-slate-500 rounded-full border px-2 py-1 hover:bg-slate-50"
                title="Xoá bình luận này (cục bộ)"
                style={{ borderColor: BORDER }}
              >
                Xoá
              </button>
            </div>
            <p className="mt-2 text-slate-800 whitespace-pre-wrap">{c.content}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- HERO: title + meta (data-driven) ---------- */
// function Hero({ post }) {
//   return (
//     <section className="w-screen overflow-x-hidden pt-8">
//       <div className="w-screen px-6 lg:px-12">
//         {/* breadcrumb */}
//         <div className="text-sm text-slate-500">
//           <Link to="/blog" className="hover:text-[#2563eb]">Blog</Link> / <span>Chi tiết</span>
//         </div>

//         <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-screen-xl text-slate-900">
//           {post?.title || "Bài viết"}
//         </h1>

//         <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
//           <div className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden grid place-items-center">
//               <span className="text-xs text-slate-500">IMG</span>
//             </div>
//             <div>
//               <div className="font-medium leading-tight text-slate-900">{post?.authorName || "Tác giả"}</div>
//               <div className="text-xs text-slate-500">{post?.createdAt ? fmtTime(post.createdAt) : "—"}</div>
//             </div>
//           </div>

//           <span className="inline-flex items-center gap-1 text-slate-600">
//             <Eye /> {Number(post?.views || 0).toLocaleString("vi-VN")}
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }
function Hero({ post }) {
  return (
    <section className="w-screen overflow-x-hidden pt-8">
      <div className="w-screen px-6 lg:px-12">
        {/* breadcrumb */}
        <div className="text-sm text-slate-500">
          <Link to="/blog" className="hover:text-[#2563eb]">Blog</Link> / <span>Chi tiết</span>
        </div>

        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-screen-xl text-slate-900">
          {post?.title || "Bài viết"}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden grid place-items-center">
              <span className="text-xs text-slate-500">IMG</span>
            </div>
            <div>
              {post?.authorId ? (
                <Link
                  to={`/blog/author/${post.authorId}`}
                  className="font-medium leading-tight text-slate-900 hover:underline"
                >
                  {post?.authorName || "Tác giả"}
                </Link>
              ) : (
                <div className="font-medium leading-tight text-slate-900">
                  {post?.authorName || "Tác giả"}
                </div>
              )}
              <div className="text-xs text-slate-500">
                {post?.createdAt ? fmtTime(post.createdAt) : "—"}
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-slate-600">
            <Eye /> {Number(post?.views || 0).toLocaleString("vi-VN")}
          </span>
        </div>
      </div>
    </section>
  );
}


/* ---------- BODY + SIDEBAR (data-driven) ---------- */
function Body({ post }) {
  // Parse contentJson → blocks[].text, fallback nếu rỗng
  const blocks = useMemo(() => {
    if (!post?.contentJson) return [];
    try {
      const parsed = typeof post.contentJson === "string" ? JSON.parse(post.contentJson) : post.contentJson;
      const arr = Array.isArray(parsed?.blocks) ? parsed.blocks : [];
      return arr
        .map((b) => String(b?.text ?? "").trim())
        .filter(Boolean);
    } catch {
      return [];
    }
  }, [post]);

  return (
    <section className="w-screen overflow-x-hidden">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Bài viết */}
        <article className="lg:col-span-2">
          {/* media */}
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: BORDER }}>
            {post?.cover ? (
              <img src={post.cover} alt={post.title} className="w-full aspect-[16/9] object-cover" />
            ) : (
              <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
                <span className="text-sm text-blue-500">Ảnh/Video bài viết</span>
              </div>
            )}
          </div>

          {/* nội dung */}
          <div className="prose prose-slate max-w-none mt-6">
            {blocks.length > 0 ? (
              blocks.map((t, i) => <p key={i}>{t}</p>)
            ) : (
              <p className="text-slate-600">
                Bài viết chưa có nội dung chi tiết hoặc <code>contentJson</code> trống.
              </p>
            )}
          </div>

          {/* Like + Share */}
          <LikeBar seedCount={post?.likes ?? 0} />

          {/* Comments (local) */}
          <Comments />
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border bg-white p-6" style={{ borderColor: BORDER }}>
            <h3 className="font-semibold text-slate-900">Tác giả</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 grid place-items-center">IMG</div>
              <div>
                <div className="font-medium leading-tight text-slate-900">{post?.authorName || "Tác giả"}</div>
                <div className="text-xs text-slate-500">Theo dõi</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-600">
              {/* mô tả ngắn — tuỳ chỉnh sau nếu backend có field riêng */}
              Chia sẻ kiến thức và kinh nghiệm học tập/làm việc mỗi ngày.
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2 text-slate-900">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {(post?.tags || []).map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: BORDER }}>
                    {t}
                  </span>
                ))}
                {(!post?.tags || post.tags.length === 0) && (
                  <span className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: BORDER }}>
                    Blog
                  </span>
                )}
              </div>
            </div>

            {/* Newsletter */}
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Đã đăng ký nhận bản tin (demo)"); }}
              className="mt-6 rounded-xl border p-4 grid gap-3"
              style={{ borderColor: BORDER }}
            >
              <div className="text-sm font-medium text-slate-900">Nhận bản tin</div>
              <input
                type="email"
                required
                placeholder="Email của bạn"
                className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                style={{ borderColor: BORDER }}
              />
              <Primary>Đăng ký</Primary>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ---------- RELATED (API-driven) ---------- */
function RelatedBlog({ currentId, currentTags }) {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });

  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const firstTag = currentTags?.[0];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        let list = [];
        if (firstTag) {
          // ưu tiên tìm theo tag
          const res = await http(`${API_BASE}/api/Posts/search?tag=${encodeURIComponent(firstTag)}`, {
            headers: { accept: "*/*" },
          });
          if (res.ok) {
            const json = await res.json();
            const arr = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
            list = arr.map(normListItem);
          }
        }
        if (!list.length) {
          // fallback: lấy tất cả rồi lọc trừ bài hiện tại
          const res = await http(`${API_BASE}/api/Posts`, { headers: { accept: "*/*" } });
          if (res.ok) {
            const json = await res.json();
            const arr = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
            list = arr.map(normListItem);
          }
        }
        // bỏ bài hiện tại + giới hạn 10
        list = list.filter((p) => p.id !== currentId).slice(0, 10);
        if (mounted) setItems(list);
      } catch (e) {
        if (mounted) setErr(e?.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [currentId, firstTag]);

  return (
    <Section
      id="related"
      title="Bài viết liên quan"
      action={
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt trái">‹</button>
          <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt phải">›</button>
          <Link to="/blog" className="text-[#2563eb] ml-2 hover:underline">Xem tất cả</Link>
        </div>
      }
    >
      {err && (
        <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
          Không thể tải bài viết liên quan (chi tiết: {err})
        </div>
      )}

      <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
        {loading && items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-[280px] max-w-[280px] rounded-2xl border bg-white overflow-hidden animate-pulse" style={{ borderColor: BORDER }}>
                <div className="aspect-[16/9] bg-slate-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                </div>
              </div>
            ))
          : items.map((p) => (
              <article key={p.id} className="min-w-[280px] max-w-[280px] rounded-2xl border bg-white overflow-hidden hover:shadow-md transition" style={{ borderColor: BORDER }}>
                <div className="aspect-[16/9] bg-blue-50">
                  {p.cover ? (
                    <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full grid place-items-center">
                      <span className="text-xs text-blue-400">Ảnh blog</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-wide text-[#2563eb]">{p.tagDisplay}</div>
                  <h3 className="font-semibold leading-snug line-clamp-2 text-slate-900">{p.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span className="truncate max-w-[60%]" title={p.authorName}>{p.authorName}</span>
                    <span className="inline-flex items-center gap-1"><Eye /> {Number(p.views).toLocaleString("vi-VN")}</span>
                  </div>
                  <Link to={`/blog/${p.id}`} className="text-[#2563eb] text-sm mt-2 inline-block hover:underline">Đọc thêm</Link>
                </div>
              </article>
            ))}
      </div>
    </Section>
  );
}

/* ---------- PAGE ---------- */
export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch detail
  useEffect(() => {
    let mounted = true;
    window.scrollTo(0, 0);

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await http(`${API_BASE}/api/Posts/${id}`, {
          headers: { accept: "*/*" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const detail = normDetail(json);
        if (mounted) setPost(detail);
      } catch (e) {
        if (mounted) setErr(e?.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [id]);

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        {loading && (
          <Section>
            <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600" style={{ borderColor: BORDER }}>
              Đang tải bài viết…
            </div>
          </Section>
        )}

        {err && !loading && (
          <Section>
            <div className="rounded-2xl border bg-white p-6 text-sm text-red-600 border-red-200">
              Không thể tải bài viết (chi tiết: {err})
            </div>
          </Section>
        )}

        {!loading && !err && post && (
          <>
            <Hero post={post} />
            <Body post={post} />
            <RelatedBlog currentId={post.id} currentTags={post.tags} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
