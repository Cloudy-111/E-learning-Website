// src/pages/Courses.jsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/* ============== helpers (full-width) ============== */
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

/* ============== mock data ============== */
const HISTORY = [
  { id: "h1", title: "Lập trình ReactJS cơ bản", teacher: "Nguyễn Minh Khoa", progress: "Hoàn thành 5/7 bài học" },
  { id: "h2", title: "Phân tích Dữ liệu với Python", teacher: "Lê Thu Trang", progress: "Hoàn thành 2/10 bài học" },
  { id: "h3", title: "Thiết kế Web hiện đại với TailwindCSS", teacher: "Phạm Anh Tuấn", progress: "Hoàn thành 3/6 bài học" },
];

const MAKE_CARD = (id) => ({
  id: "c" + id,
  title: "Khóa học Lập trình Web Fullstack",
  desc:
    "Từ HTML, CSS, JavaScript đến React và NodeJS – học từng bước để xây dựng website hoàn chỉnh.",
  teacher: "Nguyễn Văn Hưng",
  priceOld: 1200000,
  price: 890000,
  tag: "Web Development",
  duration: "3 tháng",
});
const GRID = Array.from({ length: 8 }, (_, i) => MAKE_CARD(i + 1));

const CATEGORIES = [
  { name: "Thiết kế", icon: "paint" },
  { name: "Phát triển phần mềm", icon: "monitor" },
  { name: "Cơ sở dữ liệu", icon: "db" },
  { name: "Kinh doanh", icon: "brief" },
  { name: "Marketing", icon: "megaphone" },
  { name: "Nhiếp ảnh", icon: "camera" },
  { name: "Sách & Văn học", icon: "book" },
  { name: "Tài chính", icon: "brief" },
];

/* ============== small components ============== */
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

function CourseCard({ c }) {
  return (
    <Link
      to={`/courses/${c.id}`}
      className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
    >
      <div className="aspect-[16/9] bg-blue-50 grid place-items-center">
        <span className="text-xs text-blue-400">Ảnh khóa học</span>
      </div>
      <div className="p-5">
        <h3 className="font-semibold leading-snug text-slate-900 group-hover:text-[#2563eb] transition">
          {c.title}
        </h3>
        <p className="text-sm text-slate-600 mt-1 line-clamp-2">{c.desc}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-600">{c.teacher}</span>
          <div className="flex items-center gap-2">
            <span className="line-through text-slate-400">{c.priceOld.toLocaleString()}đ</span>
            <span className="font-semibold text-[#2563eb]">{c.price.toLocaleString()}đ</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
          <span>{c.tag}</span>
          <span className="inline-flex items-center gap-1">
            <Clock /> {c.duration}
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

function CategoryCard({ name, icon }) {
  const Icon = () => {
    switch (icon) {
      case "paint":
        return <span className="text-xl">🎨</span>;
      case "monitor":
        return <span className="text-xl">💻</span>;
      case "db":
        return <span className="text-xl">🗄️</span>;
      case "brief":
        return <span className="text-xl">💼</span>;
      case "megaphone":
        return <span className="text-xl">📣</span>;
      case "camera":
        return <span className="text-xl">📷</span>;
      case "book":
        return <span className="text-xl">📚</span>;
      default:
        return <span className="text-xl">📘</span>;
    }
  };

  return (
    <div className="rounded-2xl border p-5 bg-white hover:shadow-md transition">
      <div className="h-10 w-10 grid place-items-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
        <Icon />
      </div>
      <div className="mt-3 font-semibold text-slate-900">{name}</div>
      <p className="text-sm text-slate-600 mt-1">
        Khám phá hàng trăm khóa học chất lượng cao trong lĩnh vực {name.toLowerCase()}.
      </p>
    </div>
  );
}

/* ============== sections ============== */
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

          {/* history row */}
          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-700">Lịch sử học gần đây</div>
            <Link to="#" className="text-sm text-[#2563eb] hover:underline">Xem tất cả</Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {HISTORY.map((h) => <HistoryCard key={h.id} item={h} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

const GridBlock = ({ title, id }) => (
  <Section
    id={id}
    title={title}
    action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {GRID.map((c) => <CourseCard key={`${id}-${c.id}`} c={c} />)}
    </div>
  </Section>
);

function CoachingAndCategories() {
  return (
    <Section id="coaching">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* left text card */}
        <div className="rounded-2xl border p-6 bg-white">
          <h3 className="text-2xl font-bold text-[#2563eb]">
            Học trực tuyến cùng giảng viên hàng đầu
          </h3>
          <p className="text-slate-600 mt-2">
            Các khóa học được thiết kế chuyên nghiệp, hỗ trợ bạn học từ xa hiệu quả.
            Cập nhật kiến thức mới nhất, học mọi lúc mọi nơi chỉ với một cú click.
          </p>
          <Primary className="mt-4">Bắt đầu học ngay</Primary>
        </div>

        {/* right categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={i} name={c.name} icon={c.icon} />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============== page ============== */
export default function Courses() {
  return (
    <>
      <Header />
      <Hero />
      <Section
        id="recommended"
        title="Khóa học gợi ý cho bạn"
        subtitle="Những khóa học được học viên yêu thích và đánh giá cao nhất"
        action={<Link to="#" className="text-[#2563eb] hover:underline">Xem tất cả</Link>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {GRID.map((c) => <CourseCard key={`r-${c.id}`} c={c} />)}
        </div>
      </Section>

      <GridBlock id="choice" title="Khám phá các chủ đề hot nhất" />
      <GridBlock id="personal" title="Phát triển bản thân & Kỹ năng mềm" />

      <Section
        id="viewing"
        title="Đang được nhiều học viên theo dõi"
        action={<Link to="#" className="text-[#2563eb] hover:underline">Xem thêm</Link>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {GRID.map((c) => <CourseCard key={`v-${c.id}`} c={c} />)}
        </div>
      </Section>

      <CoachingAndCategories />
      <Footer />
    </>
  );
}
