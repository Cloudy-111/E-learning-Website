

// // src/pages/shared/CourseDetail.jsx
// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// /* ===== config ===== */
// const API_BASE = "http://localhost:5102/api/courses";

// /* ===== helpers (full-width, no max-width) ===== */
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
//     className={`rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] transition ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Ghost = ({ children, className = "", ...props }) => (
//   <button
//     className={`rounded-full border border-[#2563eb] text-[#2563eb] px-5 py-3 hover:bg-[#2563eb]/10 transition ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// /* ===== icons ===== */
// const Check = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
//     <path d="M20 6L9 17l-5-5" />
//   </svg>
// );
// const Clock = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="9" />
//     <path d="M12 7v5l3 3" />
//   </svg>
// );
// const Eye = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

// /* ===== hero (dùng data từ API) ===== */
// function Hero({ course }) {
//   const {
//     title,
//     description,
//     teacherName,
//     thumbnailUrl,
//     averageRating,
//     reviewCount,
//     categoryName,
//     status,
//     createdAt,
//     updatedAt,
//   } = course || {};

//   return (
//     <section className="w-screen overflow-x-hidden pt-8">
//       <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT: media + meta (2 cột) */}
//         <div className="lg:col-span-2">
//           {/* media */}
//           <div className="rounded-2xl border bg-blue-50 aspect-video overflow-hidden">
//             {thumbnailUrl ? (
//               <img
//                 src={thumbnailUrl}
//                 alt={title}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//             ) : (
//               <div className="grid place-items-center h-full">
//                 <span className="text-blue-500 text-sm">Video/Ảnh giới thiệu khóa học</span>
//               </div>
//             )}
//           </div>

//           {/* title + meta */}
//           <div className="mt-5">
//             <div className="flex flex-wrap items-center gap-2 text-xs">
//               <span className="inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
//                 {categoryName || "Khóa học"} • {status || "published"}
//               </span>
//               <span className="inline-flex border rounded-full px-3 py-1 text-slate-600 border-slate-300">
//                 ⭐ {Number(averageRating || 0).toFixed(1)} / 5 • {reviewCount || 0} đánh giá
//               </span>
//               {updatedAt && (
//                 <span className="inline-flex border rounded-full px-3 py-1 text-slate-600 border-slate-300">
//                   Cập nhật: {new Date(updatedAt).toLocaleDateString("vi-VN")}
//                 </span>
//               )}
//             </div>

//             <h1 className="mt-3 text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900">
//               {title}
//             </h1>

//             <p className="text-slate-700 mt-2 max-w-3xl">
//               {description}
//             </p>

//             <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
//               <span className="inline-flex items-center gap-1">
//                 <Eye /> {categoryName || "Chủ đề"}
//               </span>
//               <span>•</span>
//               <span>
//                 Giảng viên: <span className="font-medium">{teacherName || "Đang cập nhật"}</span>
//               </span>
//               <span>•</span>
//               <span className="inline-flex items-center gap-1">
//                 <Clock /> {createdAt ? `Tạo: ${new Date(createdAt).toLocaleDateString("vi-VN")}` : "Thời lượng: Đang cập nhật"}
//               </span>
//             </div>
//           </div>

//           {/* tabs (demo) */}
//           <div className="mt-6 flex items-center gap-2">
//             <button className="rounded-full px-4 py-2 bg-[#2563eb] text-white text-sm">Tổng quan</button>
//             <button className="rounded-full px-4 py-2 border text-sm hover:bg-[#2563eb]/10">Nội dung học</button>
//             <button className="rounded-full px-4 py-2 border text-sm hover:bg-[#2563eb]/10">Đánh giá</button>
//           </div>

//           {/* overview content */}
//           <div className="mt-4 rounded-2xl border p-6 bg-white">
//             <h3 className="font-semibold text-lg mb-2 text-slate-900">Bạn sẽ học được gì?</h3>
//             <p className="text-slate-700">
//               Nắm chắc kiến thức cốt lõi, luyện bài thực hành và dự án mini để áp dụng ngay.
//               Truy cập trọn đời, hỗ trợ hỏi đáp và cập nhật nội dung thường xuyên.
//             </p>

//             <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-slate-800">
//               <div className="flex items-start gap-2"><Check /><span>Cập nhật & hỗ trợ liên tục</span></div>
//               <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
//               <div className="flex items-start gap-2"><Check /><span>Học trên mọi thiết bị</span></div>
//               <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
//             </div>

//             <div className="mt-6 flex flex-wrap items-center gap-3">
//               <Ghost>Đào tạo cho đội nhóm (≥5 người)</Ghost>
//               <button
//                 className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
//                 onClick={() =>
//                   window?.navigator?.share?.({
//                     title: title || "Khóa học",
//                     url: window.location?.href,
//                   })
//                 }
//               >
//                 Chia sẻ khóa học
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: price card (sticky) */}
//         <PriceAside course={course} />
//       </div>
//     </section>
//   );
// }

// function PriceAside({ course }) {
//   const { price, discountPrice } = course || {};
//   const hasDiscount =
//     typeof discountPrice === "number" &&
//     discountPrice > 0 &&
//     typeof price === "number" &&
//     discountPrice < price;

//   const finalPrice = hasDiscount ? discountPrice : price;

//   const percentOff =
//     hasDiscount && price > 0 ? Math.round(((price - discountPrice) / price) * 100) : 0;

//   return (
//     <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
//       <div className="rounded-2xl border p-5 bg-white">
//         <div className="flex items-baseline gap-2">
//           <div className="text-3xl font-extrabold text-slate-900">
//             {typeof finalPrice === "number" ? finalPrice.toLocaleString("vi-VN") : "0"}đ
//           </div>
//           {hasDiscount && (
//             <div className="text-sm text-slate-500 line-through">
//               {price?.toLocaleString("vi-VN")}đ
//             </div>
//           )}
//           {hasDiscount && (
//             <span className="ml-auto rounded-full text-xs px-2 py-1 bg-rose-100 text-rose-600">
//               Giảm {percentOff}%
//             </span>
//           )}
//         </div>
//         <div className="mt-1 text-xs text-amber-600 inline-flex items-center gap-1">
//           <Clock /> Ưu đãi có thể thay đổi
//         </div>

//         <Primary className="w-full mt-4">Mua ngay</Primary>
//         <Ghost className="w-full mt-2">Thêm vào giỏ</Ghost>

//         <div className="mt-5 grid gap-2 text-sm text-slate-700">
//           <div className="flex items-start gap-2"><Check /><span>Truy cập trọn đời</span></div>
//           <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
//           <div className="flex items-start gap-2"><Check /><span>Hỗ trợ hỏi đáp 24/7</span></div>
//           <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// /* ===== banner: Everything you can do… (giữ nguyên demo) ===== */
// function EverythingBanner() {
//   const wrapRef = useRef(null);
//   const scroll = (dir) => {
//     const el = wrapRef.current;
//     if (!el) return;
//     el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
//   };
//   return (
//     <Section
//       id="totc"
//       title="Quản lý lớp học dễ dàng – Tất cả trong một nền tảng"
//       subtitle="Lịch học, điểm danh, thanh toán và lớp học trực tuyến trên cùng một hệ thống an toàn."
//       action={
//         <div className="flex items-center gap-2">
//           <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50">‹</button>
//           <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50">›</button>
//           <Link to="#" className="text-[#2563eb] ml-2 hover:underline">Tìm hiểu thêm</Link>
//         </div>
//       }
//     >
//       <div ref={wrapRef} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
//         {Array.from({ length: 3 }).map((_, i) => (
//           <div key={i} className="min-w-[320px] max-w-[320px] rounded-2xl border bg-white overflow-hidden">
//             <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
//               <span className="text-xs text-blue-400">Slide {i + 1}</span>
//             </div>
//             <div className="p-5 text-sm text-slate-700">
//               Nền tảng quản lý đào tạo hỗ trợ thiết lập lịch học, điểm danh, thu phí và dạy trực tuyến ngay trong một nơi.
//             </div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ===== “Bài viết/Chia sẻ kinh nghiệm” grid (demo) ===== */
// function MarketingArticles() {
//   const items = Array.from({ length: 4 }).map((_, i) => ({
//     id: i,
//     title: "Mẹo học hiệu quả cho người mới",
//     desc: "Lộ trình 30 ngày làm quen, hook cơ bản và dự án mini.",
//     teacher: "Biên tập P Elearning",
//     priceOld: 199000,
//     price: 0,
//     tag: "Chia sẻ",
//     duration: "5 phút đọc",
//   }));
//   return (
//     <Section
//       id="marketing"
//       title="Bài viết & Chia sẻ kinh nghiệm học tập"
//       action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {items.map((c) => (
//           <article key={c.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
//             <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
//               <span className="text-xs text-blue-400">Ảnh bài viết</span>
//             </div>
//             <div className="p-5">
//               <h3 className="font-semibold text-slate-900">{c.title}</h3>
//               <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
//               <div className="mt-3 flex items-center justify-between text-sm">
//                 <span className="text-slate-600">{c.teacher}</span>
//                 <div className="flex items-center gap-2">
//                   {c.priceOld > 0 && (
//                     <span className="text-slate-400 line-through">
//                       {c.priceOld.toLocaleString("vi-VN")}đ
//                     </span>
//                   )}
//                   <span className="font-semibold text-[#2563eb]">
//                     {c.price === 0 ? "Miễn phí" : `${c.price.toLocaleString("vi-VN")}đ`}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-1 text-xs text-slate-500 inline-flex items-center gap-2">
//                 <span>{c.tag}</span> •{" "}
//                 <span className="inline-flex items-center gap-1">
//                   <Clock /> {c.duration}
//                 </span>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ===== “Dành cho giảng viên” (demo) ===== */
// function ForInstructors() {
//   const cards = Array.from({ length: 3 }).map((_, i) => ({ id: i }));
//   return (
//     <Section id="instructors" title="Dành cho giảng viên">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {cards.map((c) => (
//           <div key={c.id} className="relative rounded-2xl border p-6 bg-white">
//             <span className="absolute -top-3 right-4 text-xs rounded-full bg-[#2563eb] text-white px-3 py-1">
//               Ưu đãi
//             </span>
//             <h3 className="font-semibold text-lg text-slate-900">
//               Quản lý lớp học, lịch dạy & bài tập
//             </h3>
//             <p className="text-slate-600 mt-2">
//               Công cụ hỗ trợ giảng dạy trực tuyến, giao bài – chấm bài – theo dõi tiến độ ngay trên nền tảng.
//             </p>
//             <Primary className="mt-4">Khám phá</Primary>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ===== “Ưu đãi giáo dục nổi bật” (demo) ===== */
// function TopOffers() {
//   const items = Array.from({ length: 4 }).map((_, i) => ({ id: i }));
//   return (
//     <Section
//       id="offers"
//       title="Ưu đãi giáo dục nổi bật"
//       action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
//     >
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {items.map((x) => (
//           <div key={x.id} className="rounded-2xl border bg-white p-5">
//             <div className="aspect-[16/9] rounded-xl bg-blue-50 grid place-items-center">
//               <span className="text-xs text-blue-400">Ảnh ưu đãi</span>
//             </div>
//             <h4 className="mt-3 font-semibold text-slate-900">Giảm lớn cho học viên mới</h4>
//             <p className="text-sm text-slate-600 mt-1">Áp dụng trong thời gian có hạn</p>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// /* ===== page ===== */
// export default function CourseDetail() {
//   const { id } = useParams(); // /courses/:id
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // fetch detail (có fallback)
//   useEffect(() => {
//     const ac = new AbortController();

//     async function load() {
//       try {
//         setLoading(true);
//         setError("");

//         // Ưu tiên gọi /api/courses/:id
//         let res = await fetch(`${API_BASE}/${id}`, { signal: ac.signal });
//         if (res.status === 404) {
//           // Fallback: lấy list rồi tìm theo id
//           const resAll = await fetch(`${API_BASE}`, { signal: ac.signal });
//           if (!resAll.ok) throw new Error(`HTTP ${resAll.status}`);
//           const list = await resAll.json();
//           const found = Array.isArray(list) ? list.find((x) => String(x.id) === String(id)) : null;
//           if (!found) throw new Error("NOT_FOUND");
//           setCourse(found);
//         } else if (!res.ok) {
//           throw new Error(`HTTP ${res.status}`);
//         } else {
//           const data = await res.json();
//           setCourse(data);
//         }
//       } catch (e) {
//         if (e.name !== "AbortError") {
//           console.error("Fetch course detail error:", e);
//           setError("Không tải được thông tin khóa học. Vui lòng thử lại.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) load();
//     return () => ac.abort();
//   }, [id]);

//   const content = useMemo(() => {
//     if (loading) {
//       return (
//         <Section>
//           <div className="w-screen px-6 lg:px-12">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-4">
//                 <div className="aspect-video rounded-2xl border bg-slate-100 animate-pulse" />
//                 <div className="h-6 w-2/3 bg-slate-100 rounded animate-pulse" />
//                 <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
//                 <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse" />
//               </div>
//               <div className="lg:col-span-1">
//                 <div className="h-[280px] rounded-2xl border bg-slate-100 animate-pulse" />
//               </div>
//             </div>
//           </div>
//         </Section>
//       );
//     }
//     if (error) {
//       return (
//         <Section>
//           <div className="w-screen px-6 lg:px-12">
//             <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 p-4">
//               {error}
//             </div>
//             <div className="mt-4">
//               <button
//                 className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
//                 onClick={() => navigate(-1)}
//               >
//                 Quay lại
//               </button>
//             </div>
//           </div>
//         </Section>
//       );
//     }
//     if (!course) return null;
//     return (
//       <>
//         <Hero course={course} />
//         <EverythingBanner />
//         <MarketingArticles />
//         <ForInstructors />
//         <TopOffers />
//       </>
//     );
//   }, [loading, error, course, navigate]);

//   return (
//     <>
//       <Header />
//       {content}
//       <Footer />
//     </>
//   );
// }











































// src/pages/shared/CourseDetail.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* ===== config ===== */
const API_BASE = "http://localhost:5102/api/courses";

/* ===== helpers ===== */
const Section = ({ id, title, subtitle, action, children, className = "" }) => (
  <section id={id} className={`w-screen overflow-x-hidden py-10 lg:py-14 ${className}`}>
    <div className="w-screen px-6 lg:px-12">
      {(title || subtitle || action) && (
        <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
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
    className={`rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Ghost = ({ children, className = "", ...props }) => (
  <button
    className={`rounded-full border border-[#2563eb] text-[#2563eb] px-5 py-3 hover:bg-[#2563eb]/10 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const Clock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const Eye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* ===== HERO ===== */
function Hero({ course, onEnroll }) {
  const {
    title,
    description,
    teacherName,
    thumbnailUrl,
    averageRating,
    reviewCount,
    categoryName,
    status,
    createdAt,
    updatedAt,
    price,
    discountPrice,
  } = course || {};

  const hasDiscount = typeof discountPrice === "number" && discountPrice > 0 && discountPrice < price;
  const finalPrice = hasDiscount ? discountPrice : price;

  return (
    <section className="w-screen overflow-x-hidden pt-8">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Info */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-blue-50 aspect-video overflow-hidden">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <div className="grid place-items-center h-full">
                <span className="text-blue-500 text-sm">Video/Ảnh giới thiệu khóa học</span>
              </div>
            )}
          </div>

          <div className="mt-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
                {categoryName || "Khóa học"} • {status || "published"}
              </span>
              <span className="inline-flex border rounded-full px-3 py-1 text-slate-600 border-slate-300">
                ⭐ {Number(averageRating || 0).toFixed(1)} / 5 • {reviewCount || 0} đánh giá
              </span>
              {updatedAt && (
                <span className="inline-flex border rounded-full px-3 py-1 text-slate-600 border-slate-300">
                  Cập nhật: {new Date(updatedAt).toLocaleDateString("vi-VN")}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl lg:text-4xl font-extrabold text-slate-900">{title}</h1>
            <p className="text-slate-700 mt-2 max-w-3xl">{description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1">
                <Eye /> {categoryName || "Chủ đề"}
              </span>
              <span>•</span>
              <span>
                Giảng viên: <span className="font-medium">{teacherName || "Đang cập nhật"}</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock /> {createdAt ? new Date(createdAt).toLocaleDateString("vi-VN") : "Thời lượng: Đang cập nhật"}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border p-6 bg-white">
            <h3 className="font-semibold text-lg mb-3 text-slate-900">Bạn sẽ học được gì?</h3>
            <p className="text-slate-700">
              Nắm chắc kiến thức cốt lõi, luyện bài thực hành và dự án mini để áp dụng ngay.  
              Truy cập trọn đời, hỗ trợ hỏi đáp và cập nhật nội dung thường xuyên.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-slate-800">
              <div className="flex items-start gap-2"><Check /><span>Cập nhật & hỗ trợ liên tục</span></div>
              <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
              <div className="flex items-start gap-2"><Check /><span>Học trên mọi thiết bị</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT: Enroll card */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-slate-900">
                {typeof finalPrice === "number" ? finalPrice.toLocaleString("vi-VN") : "0"}đ
              </div>
              {hasDiscount && (
                <div className="text-sm text-slate-500 line-through">
                  {price?.toLocaleString("vi-VN")}đ
                </div>
              )}
            </div>
            <Primary className="w-full mt-4" onClick={onEnroll}>Ghi danh ngay</Primary>
            <Ghost className="w-full mt-2">Thêm vào yêu thích</Ghost>
            <div className="mt-5 grid gap-2 text-sm text-slate-700">
              <div className="flex items-start gap-2"><Check /><span>Truy cập trọn đời</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hỗ trợ hỏi đáp</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền trong 7 ngày</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ===== PAGE ===== */
export default function CourseDetail() {
  const { id } = useParams(); // /courses/:id
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [intro, setIntro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch detail
  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        // 1️⃣ Course detail
        const res = await fetch(`${API_BASE}/${id}`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCourse(data);

        // 2️⃣ Course content/intro
        const resIntro = await fetch(`${API_BASE}/${id}/content`, { signal: ac.signal });
        if (resIntro.ok) {
          const introData = await resIntro.json();
          setIntro(introData);
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Fetch course detail error:", e);
          setError("Không tải được thông tin khóa học. Vui lòng thử lại.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
    return () => ac.abort();
  }, [id]);

  // POST enroll
  async function handleEnroll() {
    try {
      const res = await fetch(`${API_BASE}/${id}/enrollments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1 }), // demo
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Ghi danh thành công! Bạn có thể bắt đầu học ngay.");
      navigate(`/s/learning/${id}`);
    } catch (e) {
      alert("Không thể ghi danh. Vui lòng thử lại sau.");
      console.error(e);
    }
  }

  const content = useMemo(() => {
    if (loading) {
      return (
        <Section>
          <div className="px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="aspect-video rounded-2xl border bg-slate-100 animate-pulse" />
                <div className="h-6 w-2/3 bg-slate-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
              </div>
              <div className="lg:col-span-1">
                <div className="h-[280px] rounded-2xl border bg-slate-100 animate-pulse" />
              </div>
            </div>
          </div>
        </Section>
      );
    }
    if (error) {
      return (
        <Section>
          <div className="px-6 lg:px-12">
            <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 p-4">{error}</div>
            <div className="mt-4">
              <button
                className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </button>
            </div>
          </div>
        </Section>
      );
    }
    if (!course) return null;

    return (
      <>
        <Hero course={course} onEnroll={handleEnroll} />
        {intro && (
          <Section id="intro" title="Giới thiệu khóa học">
            <div className="rounded-2xl border p-6 bg-white">
              <p className="text-slate-700 whitespace-pre-line">{intro.description || "Chưa có nội dung mô tả."}</p>
            </div>
          </Section>
        )}
      </>
    );
  }, [loading, error, course, intro, navigate]);

  return (
    <>
      <Header />
      {content}
      <Footer />
    </>
  );
}
