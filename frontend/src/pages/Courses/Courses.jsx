// src/pages/Courses.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Hero from "./Components/Hero";
import Section from "./Components/Section";
import CourseCard from "./Components/CourseCard";
import CoachingAndCategories from "./Components/CoachingAndCategories";

/* ============== fetch data ============== */
import { getCategories } from "../../api/categories";
import SearchSection from "./Components/SearchSection";


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

function Courses(){
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState("");

  useEffect(() => {
    let mounted = true;
        (async () => {
      setCatLoading(true);
      try {
        const cats = await getCategories();
        if (mounted) setCategories(cats.data ?? []);
      } catch (err) {
        if (mounted)
          setCatError(typeof err === "string" ? err : err?.message || "Không thể tải danh mục");
      } finally {
        if (mounted) setCatLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  if (catLoading) return <div>Đang tải danh mục...</div>;
  if (catError) return <div className="text-red-600">{catError}</div>;

  return (
    <>
      <Header />
      <Hero />
      {/* <Section
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
      </Section> */}

      <SearchSection />

      {catLoading ? (
        <div className="w-screen px-6 lg:px-12 py-4 text-sm text-slate-600">Đang tải danh mục...</div>
      ) : catError ? (
        <div className="w-screen px-6 lg:px-12 py-4 text-sm text-rose-600">Lỗi: {catError}</div>
      ) : (
        <CoachingAndCategories categories={categories} />
      )}
      <Footer />
    </>
  );
}

export default Courses
