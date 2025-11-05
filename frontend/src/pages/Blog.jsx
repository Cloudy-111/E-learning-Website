// // src/pages/Blog.jsx
// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// /* ---------- helpers ---------- */
// const Section = ({ id, title, subtitle, action, children }) => (
//   <section id={id} className="py-10 lg:py-14">
//     <div className="w-full px-6 lg:px-12">
//       <div className="mb-6 flex items-end justify-between gap-4">
//         <div>
//           {title && <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>}
//           {subtitle && <p className="text-slate-600 mt-2">{subtitle}</p>}
//         </div>
//         {action}
//       </div>
//       {children}
//     </div>
//   </section>
// );

// const Tag = ({ active, children, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`px-4 py-2 rounded-full border text-sm transition ${
//       active
//         ? "bg-[#54c3be] text-white border-[#54c3be]"
//         : "border-slate-300 text-slate-700 hover:border-[#54c3be] hover:bg-[#54c3be]/5"
//     }`}
//   >
//     {children}
//   </button>
// );

// const Primary = ({ children, className = "", ...props }) => (
//   <button
//     className={
//       "rounded-full bg-[#54c3be] text-white px-5 py-3 hover:opacity-95 transition " +
//       className
//     }
//     {...props}
//   >
//     {children}
//   </button>
// );

// /* ---------- mock data ---------- */
// const ALL_POSTS = [
//   {
//     id: "p1",
//     title: "Tại sao SwiftUI nên nằm trong tầm ngắm của mọi nhà phát triển di động",
//     excerpt:
//       "SwiftUI mang đến cách tiếp cận hiện đại, cú pháp ngắn gọn và khả năng tuỳ biến mạnh mẽ.",
//     author: "Luân",
//     views: 251232,
//     tag: "React",
//   },
//   {
//     id: "p2",
//     title: "Thiết kế UX/UI: 7 nguyên tắc vàng cho người mới bắt đầu",
//     excerpt: "Tập trung vào người dùng, từ kiến trúc thông tin tới tương phản thị giác.",
//     author: "Mạnh",
//     views: 12045,
//     tag: "UX/UI",
//   },
//   {
//     id: "p3",
//     title: "JavaScript hiện đại: Tất cả về Async/Await",
//     excerpt: "Nắm chắc bất đồng bộ để viết code sạch và dễ hiểu.",
//     author: "Điệp",
//     views: 50231,
//     tag: "JavaScript",
//   },
//   {
//     id: "p4",
//     title: "PHP 8 performance tips cho website thương mại điện tử",
//     excerpt: "OPcache, JIT, và kỹ thuật query tối ưu cho MySQL.",
//     author: "Hương",
//     views: 23110,
//     tag: "PHP",
//   },
//   {
//     id: "p5",
//     title: "React 19: Server Actions và những thay đổi bạn cần biết",
//     excerpt: "Hiểu đúng luồng data và cách viết component thế hệ mới.",
//     author: "Luân",
//     views: 43211,
//     tag: "React",
//   },
//   {
//     id: "p6",
//     title: "Tối ưu hiệu năng React: useMemo/useCallback dùng khi nào?",
//     excerpt: "Đừng lạm dụng – hiểu bản chất để tiết kiệm render.",
//     author: "Mạnh",
//     views: 18002,
//     tag: "React",
//   },
// ];

// const MARKETING = [
//   { id: "c1", title: "Khoá học 1", desc: "Mô tả chi tiết khoá học 1", author: "Hương" },
//   { id: "c2", title: "Khoá học 2", desc: "Mô tả chi tiết khoá học 2", author: "Hương" },
//   { id: "c3", title: "Khoá học 3", desc: "Mô tả chi tiết khoá học 3", author: "" },
//   { id: "c4", title: "Khoá học 4", desc: "Mô tả chi tiết khoá học 4", author: "Hương" },
// ];

// /* ---------- cards ---------- */
// const PostCard = ({ post }) => (
//   <article className="rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition">
//     <div className="aspect-[16/9] bg-slate-100 grid place-items-center">
//       <span className="text-xs text-slate-400">Ảnh blog</span>
//     </div>
//     <div className="p-5">
//       <div className="text-xs uppercase tracking-wide text-[#54c3be]">{post.tag}</div>
//       <h3 className="mt-2 font-semibold text-lg leading-snug">{post.title}</h3>
//       <p className="text-sm text-slate-600 mt-1 line-clamp-2">{post.excerpt}</p>
//       <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
//         <span>{post.author || "Tác giả"}</span>
//         <span className="inline-flex items-center gap-1">
//           {/* eye icon */}
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
//             <circle cx="12" cy="12" r="3" />
//           </svg>
//           {post.views.toLocaleString("vi-VN")}
//         </span>
//       </div>
//       <Link to={`/blog/${post.id}`} className="mt-3 inline-block text-[#54c3be]">
//         Đọc thêm
//       </Link>
//     </div>
//   </article>
// );

// const CourseCard = ({ c }) => (
//   <div className="rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition">
//     <div className="aspect-[16/9] bg-slate-100 grid place-items-center">
//       <span className="text-xs text-slate-400">Ảnh khoá học</span>
//     </div>
//     <div className="p-5">
//       <div className="text-xs text-slate-500">Design • <span className="inline-flex items-center gap-1">
//         {/* clock */}
//         <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
//         </svg> 3 Tháng
//       </span></div>
//       <h4 className="font-semibold mt-1">{c.title}</h4>
//       <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
//       <div className="mt-3 text-sm text-slate-600">{c.author || "\u00A0"}</div>
//       <div className="mt-2 flex items-center gap-2">
//         <span className="line-through text-slate-400">1.200.000 VNĐ</span>
//         <span className="font-semibold text-[#54c3be]">800.000 VNĐ</span>
//       </div>
//     </div>
//   </div>
// );

// /* ---------- sections ---------- */
// function Hero() {
//   return (
//     <section className="bg-white">
//       <div className="w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14 pt-8">
//         {/* Illustration placeholder (trái) */}
//         <div className="order-2 lg:order-1">
//           <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-orange-100 via-rose-100 to-amber-100 border">
//             <div className="absolute inset-0 grid place-items-center text-slate-400">
//               <span className="text-sm">Ảnh hero (thay sau)</span>
//             </div>
//           </div>
//         </div>

//         {/* Text (phải) */}
//         <div className="order-1 lg:order-2">
//           <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#54c3be] border-[#54c3be]">
//             PTIT E • Học tập
//           </div>
//           <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl">
//             SwiftUI mang đến một cách tiếp cận hiện đại và trực quan
//           </h1>
//           <p className="text-slate-600 mt-4 max-w-2xl">
//             Cú pháp ngắn gọn, dễ học cùng khả năng tuỳ biến mạnh mẽ giúp tăng tốc phát triển và tạo ra giao diện đẹp mắt.
//           </p>
//           <div className="mt-6">
//             <Primary>Bắt đầu ngay</Primary>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function BlogList() {
//   const [tag, setTag] = useState("All");
//   const tags = ["All", "UX/UI", "JavaScript", "PHP", "React"];
//   const posts = tag === "All" ? ALL_POSTS : ALL_POSTS.filter((p) => p.tag === tag);

//   return (
//     <Section
//       id="list"
//       title="Danh sách Blogs"
//       subtitle="Chọn chủ đề bạn quan tâm"
//       action={
//         <div className="flex flex-wrap gap-2">
//           {tags.map((t) => (
//             <Tag key={t} active={t === tag} onClick={() => setTag(t)}>
//               {t}
//             </Tag>
//           ))}
//         </div>
//       }
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {posts.map((p) => (
//           <PostCard key={p.id} post={p} />
//         ))}
//       </div>
//     </Section>
//   );
// }

// function RelatedBlogs() {
//   const ref = useRef(null);
//   const scroll = (dir) => {
//     const el = ref.current;
//     if (!el) return;
//     el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
//   };

//   return (
//     <Section
//       id="related"
//       title="Blog liên quan"
//       action={
//         <div className="flex items-center gap-2">
//           <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50"></button>
//           <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50"></button>
//           <Link to="#" className="text-[#54c3be] ml-2">See all</Link>
//         </div>
//       }
//     >
//       <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
//         {ALL_POSTS.slice(0, 6).map((p) => (
//           <div key={p.id} className="min-w-[280px] max-w-[280px]">
//             <PostCard post={p} />
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function MarketingCourses() {
//   return (
//     <Section
//       id="marketing"
//       title="Khoá học Marketing"
//       action={<Link to="/courses" className="text-[#54c3be]">See all</Link>}
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {MARKETING.map((c) => (
//           <CourseCard key={c.id} c={c} />
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ---------- Page ---------- */
// export default function Blog() {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <>
//       <Header />
//       <Hero />
//       <BlogList />
//       <RelatedBlogs />
//       <MarketingCourses />
//       <Footer />
//     </>
//   );
// }



// src/pages/Blog.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

/* ---------- mock data ---------- */
const ALL_POSTS = [
  { id: "p1", title: "Tại sao SwiftUI nên nằm trong tầm ngắm của mọi nhà phát triển di động",
    excerpt: "SwiftUI mang đến cách tiếp cận hiện đại, cú pháp ngắn gọn và khả năng tuỳ biến mạnh mẽ.",
    author: "Luân", views: 251232, tag: "React" },
  { id: "p2", title: "Thiết kế UX/UI: 7 nguyên tắc vàng cho người mới bắt đầu",
    excerpt: "Tập trung vào người dùng, từ kiến trúc thông tin tới tương phản thị giác.",
    author: "Mạnh", views: 12045, tag: "UX/UI" },
  { id: "p3", title: "JavaScript hiện đại: Tất cả về Async/Await",
    excerpt: "Nắm chắc bất đồng bộ để viết code sạch và dễ hiểu.",
    author: "Điệp", views: 50231, tag: "JavaScript" },
  { id: "p4", title: "PHP 8: Mẹo hiệu năng cho website thương mại điện tử",
    excerpt: "OPcache, JIT, và kỹ thuật query tối ưu cho MySQL.",
    author: "Hương", views: 23110, tag: "PHP" },
  { id: "p5", title: "React 19: Server Actions và những thay đổi bạn cần biết",
    excerpt: "Hiểu đúng luồng dữ liệu và cách viết component thế hệ mới.",
    author: "Luân", views: 43211, tag: "React" },
  { id: "p6", title: "Tối ưu hiệu năng React: useMemo/useCallback dùng khi nào?",
    excerpt: "Đừng lạm dụng – hiểu bản chất để tiết kiệm render.",
    author: "Mạnh", views: 18002, tag: "React" },
];

const MARKETING = [
  { id: "c1", title: "Marketing Căn Bản", desc: "Nắm nền tảng 4P, chân dung khách hàng, phễu AIDA.", author: "Hương" },
  { id: "c2", title: "Content Marketing", desc: "Lập kế hoạch nội dung, lịch đăng và đo lường hiệu quả.", author: "Hương" },
  { id: "c3", title: "Quảng cáo Meta/Google", desc: "Thiết lập chiến dịch, tối ưu ngân sách, đọc chỉ số.", author: "P Elearning" },
  { id: "c4", title: "Branding 101", desc: "Giá trị cốt lõi, key-visual, guideline nhận diện.", author: "Hương" },
];

/* ---------- cards ---------- */
const PostCard = ({ post }) => (
  <article className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
    <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
      <span className="text-xs text-blue-400">Ảnh blog</span>
    </div>
    <div className="p-5">
      <div className="text-xs uppercase tracking-wide text-[#2563eb]">{post.tag}</div>
      <h3 className="mt-2 font-semibold text-lg leading-snug text-slate-900">{post.title}</h3>
      <p className="text-sm text-slate-600 mt-1 line-clamp-2">{post.excerpt}</p>
      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span>{post.author || "Tác giả"}</span>
        <span className="inline-flex items-center gap-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
          </svg>
          {post.views.toLocaleString("vi-VN")}
        </span>
      </div>
      <Link to={`/blog/${post.id}`} className="mt-3 inline-block text-[#2563eb] hover:underline">Đọc thêm</Link>
    </div>
  </article>
);

const CourseCard = ({ c }) => {
  const priceOld = 1200000;
  const price = 800000;
  return (
    <div className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
      <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
        <span className="text-xs text-blue-400">Ảnh khoá học</span>
      </div>
      <div className="p-5">
        <div className="text-xs text-slate-500">
          Marketing •{" "}
          <span className="inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
            </svg>{" "}
            3 tháng
          </span>
        </div>
        <h4 className="font-semibold mt-1 text-slate-900">{c.title}</h4>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
        <div className="mt-3 text-sm text-slate-600">{c.author || "P Elearning"}</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="line-through text-slate-400">{priceOld.toLocaleString("vi-VN")}đ</span>
          <span className="font-semibold text-[#2563eb]">{price.toLocaleString("vi-VN")}đ</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- sections ---------- */
function Hero() {
  return (
    <section className="w-screen overflow-x-hidden bg-white pt-8">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
        {/* Trái: minh hoạ */}
        <div className="order-2 lg:order-1">
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-blue-100 via-sky-100 to-indigo-100 border grid place-items-center">
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
            <Primary>Đọc bài mới nhất</Primary>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogList() {
  const [tag, setTag] = useState("Tất cả");
  const tags = ["Tất cả", "UX/UI", "JavaScript", "PHP", "React"];
  const posts = tag === "Tất cả" ? ALL_POSTS : ALL_POSTS.filter((p) => p.tag === tag);

  return (
    <Section
      id="list"
      title="Bài viết mới"
      subtitle="Chọn chủ đề bạn quan tâm để lọc nội dung"
      action={
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag key={t} active={t === tag} onClick={() => setTag(t)}>
              {t}
            </Tag>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((p) => <PostCard key={p.id} post={p} />)}
      </div>
    </Section>
  );
}

function RelatedBlogs() {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });

  return (
    <Section
      id="related"
      title="Bài viết liên quan"
      action={
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt trái">‹</button>
          <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt phải">›</button>
          <Link to="#" className="text-[#2563eb] ml-2 hover:underline">Xem tất cả</Link>
        </div>
      }
    >
      <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
        {ALL_POSTS.slice(0, 6).map((p) => (
          <div key={p.id} className="min-w-[280px] max-w-[280px]">
            <PostCard post={p} />
          </div>
        ))}
      </div>
    </Section>
  );
}

function MarketingCourses() {
  return (
    <Section
      id="marketing"
      title="Khoá học Marketing đề xuất"
      subtitle="Nội dung cô đọng, bám sát thực tế — phù hợp cho người mới"
      action={<Link to="/courses" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MARKETING.map((c) => <CourseCard key={c.id} c={c} />)}
      </div>
    </Section>
  );
}

/* ---------- Page ---------- */
export default function Blog() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Header />
      {/* bọc toàn trang để chống tràn ngang */}
      <main className="w-screen overflow-x-hidden">
        <Hero />
        <BlogList />
        <RelatedBlogs />
        <MarketingCourses />
      </main>
      <Footer />
    </>
  );
}
