// src/pages/CourseDetail.jsx
"use client";

import { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ===== helpers (full-width, no max-width) ===== */
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

/* ===== icons ===== */
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

/* ===== hero ===== */
function Hero() {
  return (
    <section className="w-screen overflow-x-hidden pt-8">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: media + meta (2 cột) */}
        <div className="lg:col-span-2">
          {/* media */}
          <div className="rounded-2xl border bg-blue-50 aspect-video grid place-items-center">
            <span className="text-blue-500 text-sm">Video/Ảnh giới thiệu khóa học (thay sau)</span>
          </div>

          {/* title + meta */}
          <div className="mt-5">
            <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
              Được đánh giá cao • 4 / 5
            </div>
            <h1 className="mt-3 text-3xl lg:text-4xl font-extrabold leading-tight text-slate-900">
              Lập trình Web Fullstack từ A–Z (React & NodeJS)
            </h1>
            <p className="text-slate-700 mt-2 max-w-3xl">
              Lộ trình thực hành bài bản: từ nền tảng HTML/CSS/JS đến React, NodeJS và cơ sở dữ liệu. Xây dựng
              project thực tế, triển khai và tối ưu hiệu năng theo phong cách doanh nghiệp.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-700">
              <span className="inline-flex items-center gap-1">
                <Eye /> {Number(250000).toLocaleString("vi-VN")} lượt xem
              </span>
              <span>•</span>
              <span>Giảng viên: <span className="font-medium">Nguyễn Minh Khoa</span></span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock /> Thời lượng: 3 tháng
              </span>
            </div>
          </div>

          {/* tabs */}
          <div className="mt-6 flex items-center gap-2">
            <button className="rounded-full px-4 py-2 bg-[#2563eb] text-white text-sm">Tổng quan</button>
            <button className="rounded-full px-4 py-2 border text-sm hover:bg-[#2563eb]/10">Nội dung học</button>
            <button className="rounded-full px-4 py-2 border text-sm hover:bg-[#2563eb]/10">Đánh giá</button>
          </div>

          {/* overview content */}
          <div className="mt-4 rounded-2xl border p-6 bg-white">
            <h3 className="font-semibold text-lg mb-2 text-slate-900">Bạn sẽ học được gì?</h3>
            <p className="text-slate-700">
              Hiểu vững JavaScript hiện đại, thành thạo React và NodeJS, kết nối cơ sở dữ liệu, xây dựng API,
              auth, upload, phân trang, tối ưu SEO và triển khai dự án thực tế.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-slate-800">
              <div className="flex items-start gap-2"><Check /><span>32 module chi tiết</span></div>
              <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
              <div className="flex items-start gap-2"><Check /><span>Học trên mọi thiết bị</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Ghost>Đào tạo cho đội nhóm (≥5 người)</Ghost>
              <button
                className="rounded-full border px-4 py-2 text-sm hover:bg-slate-50"
                onClick={() =>
                  window?.navigator?.share?.({
                    title: "Khóa học Fullstack",
                    url: window.location?.href,
                  })
                }
              >
                Chia sẻ khóa học
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: price card (sticky) */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
          <div className="rounded-2xl border p-5 bg-white">
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-extrabold text-slate-900">
                {Number(899000).toLocaleString("vi-VN")}đ
              </div>
              <div className="text-sm text-slate-500 line-through">
                {Number(1499000).toLocaleString("vi-VN")}đ
              </div>
              <span className="ml-auto rounded-full text-xs px-2 py-1 bg-rose-100 text-rose-600">Giảm 40%</span>
            </div>
            <div className="mt-1 text-xs text-amber-600 inline-flex items-center gap-1">
              <Clock /> Còn 11 giờ với mức giá ưu đãi
            </div>

            <Primary className="w-full mt-4">Mua ngay</Primary>
            <Ghost className="w-full mt-2">Thêm vào giỏ</Ghost>

            <div className="mt-5 grid gap-2 text-sm text-slate-700">
              <div className="flex items-start gap-2"><Check /><span>32 module chi tiết</span></div>
              <div className="flex items-start gap-2"><Check /><span>Chứng nhận hoàn thành</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hỗ trợ hỏi đáp 24/7</span></div>
              <div className="flex items-start gap-2"><Check /><span>Hoàn tiền nếu không hài lòng</span></div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ===== banner: Everything you can do… ===== */
function EverythingBanner() {
  const wrapRef = useRef(null);
  const scroll = (dir) => {
    const el = wrapRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -360 : 360, behavior: "smooth" });
  };
  return (
    <Section
      id="totc"
      title="Quản lý lớp học dễ dàng – Tất cả trong một nền tảng"
      subtitle="Lịch học, điểm danh, thanh toán và lớp học trực tuyến trên cùng một hệ thống an toàn."
      action={
        <div className="flex items-center gap-2">
          <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50">‹</button>
          <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50">›</button>
          <Link to="#" className="text-[#2563eb] ml-2 hover:underline">Tìm hiểu thêm</Link>
        </div>
      }
    >
      <div ref={wrapRef} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="min-w-[320px] max-w-[320px] rounded-2xl border bg-white overflow-hidden">
            <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Slide {i + 1}</span>
            </div>
            <div className="p-5 text-sm text-slate-700">
              Nền tảng quản lý đào tạo hỗ trợ thiết lập lịch học, điểm danh, thu phí và dạy trực tuyến ngay trong một nơi.
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ===== “Bài viết/Chia sẻ kinh nghiệm” grid ===== */
function MarketingArticles() {
  const items = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    title: "Mẹo học React hiệu quả cho người mới",
    desc: "Lộ trình 30 ngày làm quen React, hook cơ bản và triển khai dự án mini.",
    teacher: "Biên tập P Elearning",
    priceOld: 199000,
    price: 0,
    tag: "Chia sẻ",
    duration: "5 phút đọc",
  }));
  return (
    <Section
      id="marketing"
      title="Bài viết & Chia sẻ kinh nghiệm học tập"
      action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((c) => (
          <article key={c.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
            <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Ảnh bài viết</span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-900">{c.title}</h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-600">{c.teacher}</span>
                <div className="flex items-center gap-2">
                  {c.priceOld > 0 && (
                    <span className="text-slate-400 line-through">
                      {c.priceOld.toLocaleString("vi-VN")}đ
                    </span>
                  )}
                  <span className="font-semibold text-[#2563eb]">
                    {c.price === 0 ? "Miễn phí" : `${c.price.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>
              </div>
              <div className="mt-1 text-xs text-slate-500 inline-flex items-center gap-2">
                <span>{c.tag}</span> •{" "}
                <span className="inline-flex items-center gap-1">
                  <Clock /> {c.duration}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ===== “Dành cho giảng viên” ===== */
function ForInstructors() {
  const cards = Array.from({ length: 3 }).map((_, i) => ({ id: i }));
  return (
    <Section id="instructors" title="Dành cho giảng viên">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <div key={c.id} className="relative rounded-2xl border p-6 bg-white">
            <span className="absolute -top-3 right-4 text-xs rounded-full bg-[#2563eb] text-white px-3 py-1">
              Ưu đãi
            </span>
            <h3 className="font-semibold text-lg text-slate-900">
              Quản lý lớp học, lịch dạy & bài tập
            </h3>
            <p className="text-slate-600 mt-2">
              Công cụ hỗ trợ giảng dạy trực tuyến, giao bài – chấm bài – theo dõi tiến độ ngay trên nền tảng.
            </p>
            <Primary className="mt-4">Khám phá</Primary>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ===== “Ưu đãi giáo dục nổi bật” ===== */
function TopOffers() {
  const items = Array.from({ length: 4 }).map((_, i) => ({ id: i }));
  return (
    <Section
      id="offers"
      title="Ưu đãi giáo dục nổi bật"
      action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((x) => (
          <div key={x.id} className="rounded-2xl border bg-white p-5">
            <div className="aspect-[16/9] rounded-xl bg-blue-50 grid place-items-center">
              <span className="text-xs text-blue-400">Ảnh ưu đãi</span>
            </div>
            <h4 className="mt-3 font-semibold text-slate-900">Giảm lớn cho học viên mới</h4>
            <p className="text-sm text-slate-600 mt-1">Áp dụng trong thời gian có hạn</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ===== page ===== */
export default function CourseDetail() {
  return (
    <>
      <Header />
      <Hero />
      <EverythingBanner />
      <MarketingArticles />
      <ForInstructors />
      <TopOffers />
      <Footer />
    </>
  );
}
