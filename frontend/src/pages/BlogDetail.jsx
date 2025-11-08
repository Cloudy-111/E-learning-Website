// // src/pages/BlogDetail.jsx
// import { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import Header from "../components/header";
// import Footer from "../components/footer";
// /* === helpers: full-width section (no max-width) === */
// const Section = ({ id, title, subtitle, action, children, className = "" }) => (
//   <section id={id} className={`w-screen overflow-x-hidden py-10 lg:py-14 ${className}`}>
//     <div className="w-screen px-6 lg:px-12">
//       {(title || subtitle || action) && (
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             {title && <h2 className="text-2xl lg:text-3xl font-bold">{title}</h2>}
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
//     className={`rounded-full bg-[#54c3be] text-white px-5 py-3 hover:opacity-95 transition ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// /* === small icons === */
// const Eye = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
//   </svg>
// );

// /* === top hero (title + meta) === */
// function Hero() {
//   return (
//     <section className="w-screen overflow-x-hidden pt-8">
//       <div className="w-screen px-6 lg:px-12">
//         <div className="text-sm text-slate-500">
//           <Link to="/blog" className="hover:text-[#54c3be]">Blog</Link> / Chi tiết
//         </div>

//         <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-screen-xl">
//           Why Swift UI Should Be on the Radar of Every Mobile Developer
//         </h1>

//         <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
//           <div className="flex items-center gap-2">
//             <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden grid place-items-center">
//               <span className="text-xs text-slate-500">IMG</span>
//             </div>
//             <div>
//               <div className="font-medium leading-tight">Lina</div>
//               <div className="text-xs text-slate-500">Written by • Follow</div>
//             </div>
//           </div>

//           <span className="inline-flex items-center gap-1 text-slate-600">
//             <Eye /> 251,232
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* === body + sidebar === */
// function Body() {
//   return (
//     <section className="w-screen overflow-x-hidden">
//       <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Article */}
//         <article className="lg:col-span-2">
//           <div className="rounded-2xl overflow-hidden border">
//             <div className="aspect-[16/9] bg-slate-100 grid place-items-center">
//               <span className="text-sm text-slate-500">Ảnh/Video bài viết (thay sau)</span>
//             </div>
//           </div>

//           <div className="prose prose-slate max-w-none mt-6">
//             <p>
//               TOTC is a platform that allows educators to create online classes whereby they can store the course
//               materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide
//               students with feedback — all in one place.
//             </p>
//             <p>
//               SwiftUI mang đến cách tiếp cận hiện đại, cú pháp ngắn gọn và khả năng tuỳ biến mạnh mẽ giúp tăng tốc
//               phát triển và tạo ra giao diện đẹp mắt trên iOS, iPadOS và macOS.
//             </p>

//             <h3>affordable • Stunning • making madbrawns</h3>
//             <ul>
//               <li>Declarative UI — code gọn, dễ đọc.</li>
//               <li>Preview realtime — tiết kiệm thời gian build.</li>
//               <li>Composable components — tái sử dụng dễ dàng.</li>
//             </ul>

//             <blockquote>
//               “Everything you can do in a physical classroom, you can do with TOTC.”  
//             </blockquote>

//             <figure>
//               <div className="aspect-[21/9] rounded-xl bg-slate-100 grid place-items-center">
//                 <span className="text-xs text-slate-400">Hình minh hoạ</span>
//               </div>
//               <figcaption className="text-center text-sm text-slate-500 mt-2">
//                 Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution
//               </figcaption>
//             </figure>

//             <p>
//               Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively…
//               Nội dung demo — bạn thay copy thật vào đây.
//             </p>
//           </div>

//           {/* Share */}
//           <div className="mt-6 flex items-center gap-3">
//             <span className="text-sm text-slate-600">Chia sẻ:</span>
//             <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Facebook</button>
//             <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Twitter/X</button>
//             <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Link</button>
//           </div>
//         </article>

//         {/* Sidebar */}
//         <aside className="lg:col-span-1">
//           <div className="rounded-2xl border bg-white p-6">
//             <h3 className="font-semibold">Written by</h3>
//             <div className="mt-3 flex items-center gap-3">
//               <div className="h-10 w-10 rounded-full bg-slate-200 grid place-items-center">IMG</div>
//               <div>
//                 <div className="font-medium leading-tight">Lina</div>
//                 <div className="text-xs text-slate-500">Follow</div>
//               </div>
//             </div>

//             <div className="mt-6 text-sm text-slate-600">
//               TOTC is a platform that allows educators to create online classes… (tóm tắt tác giả/bài viết).
//             </div>

//             <div className="mt-6">
//               <h4 className="font-medium mb-2">Tags</h4>
//               <div className="flex flex-wrap gap-2">
//                 {["SwiftUI", "Mobile", "UX/UI", "iOS"].map((t) => (
//                   <span key={t} className="text-xs px-3 py-1 rounded-full border">{t}</span>
//                 ))}
//               </div>
//             </div>

//             <form
//               onSubmit={(e) => { e.preventDefault(); alert("Subscribed (demo)"); }}
//               className="mt-6 rounded-xl border p-4 grid gap-3"
//             >
//               <div className="text-sm font-medium">Nhận bản tin</div>
//               <input
//                 type="email"
//                 required
//                 placeholder="Email của bạn"
//                 className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#54c3be]/60"
//               />
//               <Primary>Đăng ký</Primary>
//             </form>
//           </div>
//         </aside>
//       </div>
//     </section>
//   );
// }

// /* === Related Blog (carousel) === */
// function RelatedBlog() {
//   const ref = useRef(null);
//   const scroll = (dir) => {
//     const el = ref.current;
//     if (!el) return;
//     el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
//   };

//   const items = Array.from({ length: 6 }).map((_, i) => ({
//     id: i,
//     title: "Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution",
//     excerpt:
//       "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...",
//     author: "Lina",
//     views: 251232,
//   }));

//   return (
//     <Section
//       id="related"
//       title="Related Blog"
//       action={
//         <div className="flex items-center gap-2">
//           <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50">‹</button>
//           <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50">›</button>
//           <Link to="/blog" className="text-[#54c3be] ml-2">See all</Link>
//         </div>
//       }
//     >
//       <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
//         {items.map((p) => (
//           <article key={p.id} className="min-w-[280px] max-w-[280px] rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition">
//             <div className="aspect-[16/9] bg-slate-100 grid place-items-center">
//               <span className="text-xs text-slate-400">Ảnh blog</span>
//             </div>
//             <div className="p-5">
//               <h3 className="font-semibold leading-snug line-clamp-2">{p.title}</h3>
//               <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.excerpt}</p>
//               <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
//                 <span>{p.author}</span>
//                 <span className="inline-flex items-center gap-1"><Eye /> {p.views.toLocaleString("vi-VN")}</span>
//               </div>
//               <Link to="#" className="text-[#54c3be] text-sm mt-2 inline-block">Read more</Link>
//             </div>
//           </article>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* === Page === */
// export default function BlogDetail() {
//   useEffect(() => window.scrollTo(0, 0), []);
//   return (
//     <>
//       <Header />
//       <Hero />
//       <Body />
//       <RelatedBlog />
//       <Footer />
//     </>
//   );
// }


// src/pages/BlogDetail.jsx
"use client";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* === helpers: full-width section (đồng bộ gutter) === */
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

/* === icons nhỏ === */
const Eye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

/* === HERO: tiêu đề + meta === */
function Hero() {
  return (
    <section className="w-screen overflow-x-hidden pt-8">
      <div className="w-screen px-6 lg:px-12">
        {/* breadcrumb */}
        <div className="text-sm text-slate-500">
          <Link to="/blog" className="hover:text-[#2563eb]">Blog</Link> / <span>Chi tiết</span>
        </div>

        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-screen-xl text-slate-900">
          Vì sao SwiftUI nên nằm trong “tầm ngắm” của mọi lập trình viên di động
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden grid place-items-center">
              <span className="text-xs text-slate-500">IMG</span>
            </div>
            <div>
              <div className="font-medium leading-tight text-slate-900">Lina</div>
              <div className="text-xs text-slate-500">Tác giả • Theo dõi</div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-slate-600">
            <Eye /> {Number(251232).toLocaleString("vi-VN")}
          </span>
        </div>
      </div>
    </section>
  );
}

/* === THÂN BÀI + SIDEBAR === */
function Body() {
  return (
    <section className="w-screen overflow-x-hidden">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Bài viết */}
        <article className="lg:col-span-2">
          {/* media */}
          <div className="rounded-2xl overflow-hidden border">
            <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
              <span className="text-sm text-blue-500">Ảnh/Video bài viết (thay sau)</span>
            </div>
          </div>

          {/* nội dung */}
          <div className="prose prose-slate max-w-none mt-6">
            <p>
              TOTC là nền tảng cho phép giảng viên tạo lớp học trực tuyến: lưu trữ tài liệu, quản lý bài tập/quiz/kỳ thi,
              theo dõi deadline, chấm điểm và phản hồi — tất cả trong một nơi.
            </p>
            <p>
              <strong>SwiftUI</strong> mang đến cách tiếp cận hiện đại, cú pháp ngắn gọn và khả năng tuỳ biến mạnh mẽ
              giúp tăng tốc phát triển giao diện đẹp mắt trên iOS, iPadOS và macOS.
            </p>

            <h3>Điểm mạnh nổi bật</h3>
            <ul>
              <li><b>Declarative UI</b> — code gọn, dễ đọc và ít lỗi hơn.</li>
              <li><b>Preview theo thời gian thực</b> — giảm thời gian build & thử nghiệm.</li>
              <li><b>Composable components</b> — tái sử dụng linh hoạt, dễ mở rộng.</li>
            </ul>

            <blockquote>
              “Mọi thứ bạn có thể làm trong lớp học truyền thống, bạn đều có thể làm với TOTC.”
            </blockquote>

            <figure>
              <div className="aspect-[21/9] rounded-xl bg-slate-100 grid place-items-center">
                <span className="text-xs text-slate-400">Hình minh hoạ</span>
              </div>
              <figcaption className="text-center text-sm text-slate-500 mt-2">
                Class bổ sung 30 triệu đô để phát triển giải pháp edtech thân thiện với Zoom
              </figcaption>
            </figure>

            <p>
              Class — ra mắt chưa đầy một năm bởi đồng sáng lập Blackboard, Michael Chasen — tích hợp sâu với Zoom để
              đưa trải nghiệm lớp học vào môi trường trực tuyến. (Nội dung demo — hãy thay bằng copy thực tế.)
            </p>
          </div>

          {/* Chia sẻ */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600">Chia sẻ:</span>
            <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Facebook</button>
            <button className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50">Twitter/X</button>
            <button
              className="rounded-full border px-3 py-1 text-sm hover:bg-slate-50"
              onClick={() => navigator.clipboard?.writeText(location.href)}
            >
              Sao chép link
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border bg-white p-6">
            <h3 className="font-semibold text-slate-900">Tác giả</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 grid place-items-center">IMG</div>
              <div>
                <div className="font-medium leading-tight text-slate-900">Lina</div>
                <div className="text-xs text-slate-500">Theo dõi</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-600">
              TOTC giúp các trường truyền thống & online quản lý lịch học, điểm danh, thanh toán và lớp học ảo —
              tất cả trên nền tảng đám mây bảo mật.
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2 text-slate-900">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {["SwiftUI", "Mobile", "UX/UI", "iOS"].map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full border">{t}</span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Đã đăng ký nhận bản tin (demo)"); }}
              className="mt-6 rounded-xl border p-4 grid gap-3"
            >
              <div className="text-sm font-medium text-slate-900">Nhận bản tin</div>
              <input
                type="email"
                required
                placeholder="Email của bạn"
                className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
              />
              <Primary>Đăng ký</Primary>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* === BÀI VIẾT LIÊN QUAN (carousel) === */
function RelatedBlog() {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });

  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    title: "Class bổ sung 30 triệu đô cho giải pháp edtech thân thiện với Zoom",
    excerpt:
      "Class, do đồng sáng lập Blackboard Michael Chasen phát triển, tích hợp sâu với Zoom để mô phỏng lớp học…",
    author: "Lina",
    views: 251232,
  }));

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
      <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
        {items.map((p) => (
          <article key={p.id} className="min-w-[280px] max-w-[280px] rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
            <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Ảnh blog</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold leading-snug line-clamp-2 text-slate-900">{p.title}</h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{p.excerpt}</p>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span>{p.author}</span>
                <span className="inline-flex items-center gap-1"><Eye /> {p.views.toLocaleString("vi-VN")}</span>
              </div>
              <Link to="#" className="text-[#2563eb] text-sm mt-2 inline-block hover:underline">Đọc thêm</Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* === PAGE === */
export default function BlogDetail() {
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <Hero />
        <Body />
        <RelatedBlog />
      </main>
      <Footer />
    </>
  );
}
