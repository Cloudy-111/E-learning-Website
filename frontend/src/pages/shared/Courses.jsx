// src/pages/shared/Courses.jsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* ============== config ============== */
const API_URL = "http://localhost:5102/api/courses";

/* ============== helpers (full-width) ============== */
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
    className={
      "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] transition " + className
    }
    {...props}
  >
    {children}
  </button>
);

/* ============== icons ============== */
const Eye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Clock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

/* ============== course cards ============== */
function CourseCard({ c }) {
  const {
    id,
    title,
    description,
    teacherName,
    price,
    discountPrice,
    categoryName,
    thumbnailUrl,
  } = c;

  const hasDiscount =
    typeof discountPrice === "number" && discountPrice > 0 && discountPrice < price;

  return (
    <Link
      to={`/courses/${id}`}
      className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
    >
      <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`Ảnh khóa học ${title}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-xs text-blue-400">Ảnh khóa học</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold leading-snug text-slate-900 group-hover:text-[#2563eb] transition line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{description}</p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-600">{teacherName}</span>
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="line-through text-slate-400">
                  {price?.toLocaleString("vi-VN")}đ
                </span>
                <span className="font-semibold text-[#2563eb]">
                  {discountPrice?.toLocaleString("vi-VN")}đ
                </span>
              </>
            ) : (
              <span className="font-semibold text-[#2563eb]">
                {price?.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
          <span>{categoryName}</span>
          <span className="inline-flex items-center gap-1 opacity-70">
            <Clock /> Online
          </span>
        </div>
      </div>
    </Link>
  );
}

function HistoryCard({ item }) {
  return (
    <Link
      to="#"
      className="rounded-xl border bg-white p-4 min-w-[260px] hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-blue-50 grid place-items-center shrink-0 text-[#2563eb]">
          <Eye />
        </div>
        <div>
          <div className="font-medium leading-tight line-clamp-1 text-slate-900">
            {item.title}
          </div>
          <div className="text-xs text-slate-600">
            {item.teacher} • {item.progress}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ============== mock data cho phần lịch sử & danh mục ============== */
const HISTORY = [
  { id: "h1", title: "Lập trình ReactJS cơ bản", teacher: "Nguyễn Minh Khoa", progress: "Hoàn thành 5/7 bài học" },
  { id: "h2", title: "Phân tích Dữ liệu với Python", teacher: "Lê Thu Trang", progress: "Hoàn thành 2/10 bài học" },
  { id: "h3", title: "Thiết kế Web hiện đại với TailwindCSS", teacher: "Phạm Anh Tuấn", progress: "Hoàn thành 3/6 bài học" },
];

const CATEGORIES = [
  "Thiết kế",
  "Phát triển phần mềm",
  "Cơ sở dữ liệu",
  "Kinh doanh",
  "Marketing",
  "Nhiếp ảnh",
  "Sách & Văn học",
  "Tài chính",
];

/* ============== skeleton loader ============== */
const SkeletonCard = () => (
  <div className="rounded-2xl border bg-white overflow-hidden animate-pulse">
    <div className="aspect-[16/9] bg-slate-100" />
    <div className="p-5 space-y-2">
      <div className="h-4 bg-slate-100 rounded w-3/4" />
      <div className="h-3 bg-slate-100 rounded w-full" />
      <div className="h-3 bg-slate-100 rounded w-2/3" />
    </div>
  </div>
);

/* ============== hero section ============== */
function Hero() {
  return (
    <section className="w-screen overflow-x-hidden pt-8">
      <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-14">
        {/* LEFT illustration */}
        <div className="order-2 lg:order-1">
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-blue-100 via-indigo-100 to-sky-100 border grid place-items-center">
            <span className="text-sm text-blue-500">Ảnh minh họa khóa học</span>
          </div>
        </div>

        {/* RIGHT text + history */}
        <div className="order-1 lg:order-2">
          <div className="text-xs inline-flex border rounded-full px-3 py-1 text-[#2563eb] border-[#2563eb]">
            P Elearning • Học tập không giới hạn
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl text-slate-900">
            Chào mừng bạn quay lại! Sẵn sàng cho bài học tiếp theo?
          </h1>
          <p className="text-slate-600 mt-3">
            Hãy chọn ngay khóa học yêu thích từ các chủ đề hàng đầu.
          </p>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-700">Lịch sử học gần đây</div>
            <Link to="#" className="text-sm text-[#2563eb] hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {HISTORY.map((h) => (
              <HistoryCard key={h.id} item={h} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== main page ============== */
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const visibleCourses = useMemo(() => courses, [courses]);

  async function loadCourses(params = {}) {
    try {
      setLoading(true);
      setError("");
      let url = API_URL;

      const searchParams = new URLSearchParams();
      if (params.keyword) searchParams.append("keyword", params.keyword);
      if (params.category) searchParams.append("category", params.category);

      if (Array.from(searchParams).length) {
        url = `${API_URL}/search?${searchParams.toString()}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Không thể tải danh sách khóa học. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSearch = () => {
    loadCourses({ keyword: query, category });
  };

  return (
    <>
      <Header />
      <Hero />

      {/* search bar */}
      <Section id="filters" className="bg-white border-b py-6">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Tìm khóa học theo tên, danh mục..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border px-3 py-2"
          >
            <option value="">Tất cả danh mục</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Primary onClick={handleSearch}>Tìm kiếm</Primary>
        </div>
      </Section>

      {/* lỗi */}
      {error && (
        <div className="w-screen px-6 lg:px-12 mt-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 text-red-700 p-4">
            {error}
          </div>
        </div>
      )}

      {/* danh sách */}
      <Section
        id="recommended"
        title="Khóa học gợi ý cho bạn"
        subtitle="Những khóa học được học viên yêu thích và đánh giá cao nhất"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={`s-${i}`} />
            ))}
          </div>
        ) : visibleCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleCourses.map((c) => (
              <CourseCard key={c.id} c={c} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            Không tìm thấy khóa học nào phù hợp với từ khóa hoặc danh mục đã chọn.
          </div>
        )}
      </Section>

      <Footer />
    </>
  );
}
