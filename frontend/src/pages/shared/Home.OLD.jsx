



// src/pages/Homepage.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ArrowRight, BadgeCheck, BookOpen, Brain, ChartLine,
  CheckCircle2, ChevronDown, Library, PlayCircle, Rocket,
  Shield, Stars, Timer, Trophy, Wand2
} from "lucide-react";
import { http } from "../../utils/http";

const PRIMARY = "#2c65e6";
const PRIMARY_HOVER = "#2153c3";
const BORDER = "#e0e0e0";
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";

/** Helpers: map dữ liệu API -> UI an toàn */
const pick = (obj, keys) => keys.reduce((o, k) => (o[k] = obj?.[k], o), {});
const normCourse = (c) => ({
  id: c?.id ?? c?.courseId ?? String(Math.random()),
  title: c?.title ?? c?.name ?? "Khóa học",
  desc: c?.description ?? c?.shortDescription ?? "",
  lessons: c?.lessonsCount ?? c?.totalLessons ?? c?.lessons?.length ?? "—",
  level: c?.level ?? c?.difficulty ?? "All levels",
  thumb: c?.thumbnailUrl ?? c?.imageUrl ?? "/images/course-placeholder.jpg",
});
const normExam = (e) => ({
  id: e?.id ?? e?.examId ?? String(Math.random()),
  title: e?.title ?? "Đề thi",
  duration: e?.durationMinutes ?? e?.timeLimit ?? 0,
  opened: e?.isOpened ?? e?.isOpen ?? true,
});
const normPost = (p) => ({
  id: p?.id ?? p?.postId ?? String(Math.random()),
  title: p?.title ?? "Bài viết",
  tag: p?.tag ?? p?.category ?? "Blog",
  cover: p?.coverImage ?? p?.thumbnail ?? "/images/blog-placeholder.jpg",
});

/** FAQ mặc định */
const faqsDefault = [
  { q: "Học trên nền tảng này cần chuẩn bị gì?", a: "Chỉ cần máy tính/điện thoại có internet. Bạn có thể học mọi lúc – mọi nơi, nền tảng hỗ trợ đồng bộ tiến độ." },
  { q: "Khoá học có thời hạn không?", a: "Tuỳ gói thành viên và khoá học. Với gói thành viên, bạn có thể truy cập toàn bộ thư viện trong thời hạn gói." },
  { q: "Đề thi có đáp án & giải chi tiết?", a: "Có. Sau khi nộp bài, bạn xem lại đáp án đúng/sai, giải thích và thống kê để ôn lại." },
  { q: "Tôi có thể học theo lộ trình gợi ý?", a: "Có. Mỗi mục tiêu có lộ trình gồm bài học + luyện tập + đề mô phỏng. Bạn theo dõi tiến độ ở Dashboard." },
];

export default function Homepage() {
  const navigate = useNavigate();

  // ==== State ====
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ courses: null, exams: null, posts: null });

  const [courses, setCourses] = useState([]);      // từ /api/courses (hoặc /api/courses/search)
  const [exams, setExams] = useState([]);          // từ /api/exam
  const [posts, setPosts] = useState([]);          // từ /api/Posts
  const [faqs, setFaqs] = useState(() => faqsDefault.map((f, i) => ({ ...f, open: i === 0 })));

  // ==== Fetch initial ====
  useEffect(() => {
    let ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErrors({ courses: null, exams: null, posts: null });

        // Courses
        const cRes = await http(`${API_BASE}/api/courses`, { signal: ac.signal, headers: { accept: "*/*" } });
        const cJson = cRes.ok ? await cRes.json() : [];
        const cArr = Array.isArray(cJson?.data ?? cJson) ? (cJson.data ?? cJson) : [];
        setCourses(cArr.map(normCourse));

        // Exams
        const eRes = await http(`${API_BASE}/api/exam`, { signal: ac.signal, headers: { accept: "*/*" } });
        const eJson = eRes.ok ? await eRes.json() : [];
        const eArr = Array.isArray(eJson?.data ?? eJson) ? (eJson.data ?? eJson) : [];
        setExams(eArr.map(normExam));

        // Posts
        const pRes = await http(`${API_BASE}/api/Posts`, { signal: ac.signal, headers: { accept: "*/*" } });
        const pJson = pRes.ok ? await pRes.json() : [];
        const pArr = Array.isArray(pJson?.data ?? pJson) ? (pJson.data ?? pJson) : [];
        setPosts(pArr.map(normPost));
      } catch (e) {
        // Ghi lỗi nhẹ cho từng phần (không chặn toàn trang)
        setErrors((prev) => ({ ...prev, general: e?.message || "Fetch error" }));
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // ==== Search courses (enter hoặc bấm) ====
  const doSearch = async () => {
    if (!q.trim()) return navigate(`/courses`);
    try {
      setLoading(true);
      setErrors((prev) => ({ ...prev, courses: null }));
      const res = await http(`${API_BASE}/api/courses/search?q=${encodeURIComponent(q.trim())}`, {
        headers: { accept: "*/*" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const arr = Array.isArray(data?.data ?? data) ? (data.data ?? data) : [];
      setCourses(arr.map(normCourse));
    } catch (e) {
      setErrors((prev) => ({ ...prev, courses: e?.message || "Search error" }));
    } finally {
      setLoading(false);
    }
  };

  // ==== Derived (cắt bớt để trình bày) ====
  const featuredCourses = useMemo(() => courses.slice(0, 8), [courses]);
  const examsShowcase = useMemo(() => exams.slice(0, 3), [exams]);
  const blogPosts = useMemo(() => posts.slice(0, 3), [posts]);

  // ==== Constant sections không cần API ====
  const categories = useMemo(
    () => [
      { icon: <BookOpen className="w-5 h-5" />, label: "Khóa học", to: "/courses", desc: "Lộ trình rõ ràng" },
      { icon: <Library className="w-5 h-5" />, label: "Thư viện đề thi", to: "/exam", desc: "Đáp án chi tiết" },
      { icon: <Timer className="w-5 h-5" />, label: "Luyện tập nhanh", to: "/s/quick-practice", desc: "Quiz 5-10 phút" },
      { icon: <PlayCircle className="w-5 h-5" />, label: "Gói thành viên", to: "/membership", desc: "Tiết kiệm 60%" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="relative w-full px-6 lg:px-12 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#35509a] font-semibold mb-2">PTIT E-Learning</p>
            <h1 className="text-[30px] leading-[1.2] lg:text-[44px] font-extrabold text-[#1a1a1a]">
              Học thông minh – Luyện đề hiệu quả – Theo dõi tiến độ rõ ràng
            </h1>
            <p className="mt-4 text-[#677788] max-w-2xl">
              Lộ trình rõ ràng, video cô đọng, bài tập tương tác, đề mô phỏng sát format. Kèm thống kê cá nhân giúp bạn học trúng điểm yếu.
            </p>

            {/* Search */}
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Tìm khóa học, đề thi, chủ đề…"
                className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: BORDER }}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") doSearch(); }}
              />
              <button
                className="rounded-lg text-white px-5 py-3 font-semibold transition"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                onClick={doSearch}
              >
                Tìm kiếm
              </button>
            </div>

            {/* Stats badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#677788]">
              <span className="inline-flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-green-600" /> Nội dung cập nhật hàng tuần</span>
              <span className="inline-flex items-center gap-1"><Shield className="w-4 h-4 text-green-600" /> Hệ thống ổn định</span>
              <span className="inline-flex items-center gap-1"><Stars className="w-4 h-4 text-yellow-600" /> 97% học viên hài lòng</span>
            </div>
          </div>

          {/* Visual */}
          <div className="rounded-2xl overflow-hidden border shadow-sm">
            <img src="/hero-ielts.jpg" alt="Elearning Hero" className="w-full h-[280px] lg:h-[360px] object-cover" />
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.to} to={c.to}
              className="bg-white border rounded-xl p-4 hover:shadow-sm transition flex items-center gap-3"
              style={{ borderColor: BORDER }}>
              <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">{c.icon}</div>
              <div>
                <p className="font-semibold text-[#1a1a1a]">{c.label}</p>
                <p className="text-xs text-[#677788]">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED COURSES (từ API) ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Khóa học nổi bật</h2>
          <Link to="/courses" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
        </div>

        {errors.courses && (
          <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
            Không thể tải khoá học (chi tiết: {errors.courses})
          </div>
        )}

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {(loading && featuredCourses.length === 0 ? Array.from({ length: 4 }) : featuredCourses).map((c, idx) => (
            <article key={c?.id ?? idx}
              className="min-w-[280px] max-w-[320px] bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition flex flex-col snap-start"
              style={{ borderColor: BORDER }}>
              <div className="w-full h-40 bg-gray-100">
                {c ? (
                  <img src={c.thumb} alt={c.title} className="w-full h-40 object-cover" />
                ) : null}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-[#1a1a1a] line-clamp-2">{c?.title || "—"}</h3>
                <p className="text-sm text-[#677788] mt-1 line-clamp-3">{c?.desc || ""}</p>
                <div className="mt-2 text-xs text-[#677788]">Bài học: <b>{c?.lessons ?? "—"}</b> • Cấp độ: {c?.level ?? "—"}</div>
                <button
                  onClick={() => navigate(`/courses/${c?.id}`)}
                  className="mt-auto w-full rounded-lg text-white py-2 font-medium transition"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                  type="button"
                  disabled={!c}
                >
                  Xem chi tiết
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== USP / FEATURES ===== */}
      <section className="w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[
            { icon: <Rocket className="w-5 h-5" />, title: "Lộ trình rõ", desc: "Học theo mục tiêu, bám sát kỳ thi thật." },
            { icon: <Brain className="w-5 h-5" />, title: "Bài giảng cô đọng", desc: "Đi thẳng vào trọng tâm, dễ ghi nhớ." },
            { icon: <ChartLine className="w-5 h-5" />, title: "Theo dõi tiến độ", desc: "Dashboard & gợi ý ôn mục tiêu." },
            { icon: <PlayCircle className="w-5 h-5" />, title: "Luyện đề có giải", desc: "Chấm tự động & phân tích kết quả." },
          ].map((f, i) => (
            <div key={i} className="bg-white border rounded-2xl p-5" style={{ borderColor: BORDER }}>
              <div className="w-10 h-10 grid place-items-center rounded-lg bg-[#eef3ff] text-[#1b3ea9]">{f.icon}</div>
              <h4 className="mt-3 font-semibold text-[#1a1a1a]">{f.title}</h4>
              <p className="text-sm text-[#677788] mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXAM SHOWCASE (từ API) ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg lg:text-xl font-extrabold text-[#1a1a1a]">Thư viện đề thi – Luyện là lên!</h3>
              <p className="text-sm text-[#677788] mt-1">Đề chuẩn hoá, chấm tự động, xem đáp án chi tiết.</p>
            </div>
            <Link
              to="/exam"
              className="inline-flex items-center gap-2 rounded-lg text-white px-4 py-2 font-semibold transition"
              style={{ backgroundColor: PRIMARY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Vào thư viện đề <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {errors.exams && (
            <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 my-4">
              Không thể tải danh sách đề thi (chi tiết: {errors.exams})
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {(loading && examsShowcase.length === 0 ? Array.from({ length: 3 }) : examsShowcase).map((ex, idx) => (
              <div key={ex?.id ?? idx} className="bg-white border rounded-xl p-4" style={{ borderColor: BORDER }}>
                <p className="font-semibold text-[#1a1a1a] line-clamp-2">{ex?.title || "—"}</p>
                <div className="mt-2 text-xs text-[#677788]">⏱️ {ex?.duration ?? "—"} phút • {ex?.opened ? "Đang mở" : "Đã khóa"}</div>
                <button
                  onClick={() => navigate(`/exam/${ex?.id}`)}
                  className="mt-3 w-full rounded-lg text-white py-2 text-sm font-medium transition"
                  style={{ backgroundColor: PRIMARY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
                  type="button"
                  disabled={!ex}
                >
                  Chi tiết
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== METRICS STRIP ===== */}
      <section className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Học viên", value: "12,500+" },
            { label: "Bài học", value: "1,200+" },
            { label: "Đề thi/Quiz", value: "350+" },
            { label: "Tỉ lệ hài lòng", value: "97%" },
          ].map((s, i) => (
            <div key={i} className="bg-white border rounded-xl p-5 text-center" style={{ borderColor: BORDER }}>
              <p className="text-2xl font-extrabold text-[#1a1a1a]">{s.value}</p>
              <p className="text-xs text-[#677788] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
          <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-[#1b3ea9]" />
              <h4 className="font-semibold text-[#1a1a1a]">Học viên nói gì?</h4>
            </div>
            <p className="text-[#677788]">
              “Nhờ lộ trình gợi ý + phần luyện đề có giải chi tiết, mình tăng từ 550 TOEIC lên 785 sau 2 tháng.
              Dashboard theo dõi tiến độ cực rõ ràng!” — <b>Anh Khoa</b>
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Nội dung cô đọng, dễ theo sát",
                "Thống kê rõ điểm yếu để ôn lại",
                "Đề mô phỏng giống thi thật",
                "Giảng viên phản hồi nhanh",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#1a1a1a]">
                  <CheckCircle2 className="w-4 h-4 text-green-600" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-2xl overflow-hidden" style={{ borderColor: BORDER }}>
            <img src="/images/study-banner.jpg" alt="Study Banner" className="w-full h-40 object-cover" />
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW (từ API) ===== */}
      <section className="w-full px-6 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Bài viết mới</h2>
          <Link to="/blog" className="text-sm font-semibold" style={{ color: PRIMARY }}>Xem tất cả</Link>
        </div>

        {errors.posts && (
          <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
            Không thể tải bài viết (chi tiết: {errors.posts})
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(loading && blogPosts.length === 0 ? Array.from({ length: 3 }) : blogPosts).map((b, idx) => (
            <article key={b?.id ?? idx} className="bg-white border rounded-2xl overflow-hidden hover:shadow-sm transition"
              style={{ borderColor: BORDER }}>
              <div className="w-full h-36 bg-gray-100">
                {b ? <img src={b.cover} alt={b.title} className="w-full h-36 object-cover" /> : null}
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-[#eef3ff] text-[#1b3ea9]">{b?.tag ?? "Blog"}</span>
                <h3 className="mt-2 font-semibold text-[#1a1a1a] line-clamp-2">{b?.title ?? "—"}</h3>
                <Link to={`/blog/${b?.id}`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: PRIMARY }}>
                  Đọc tiếp <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="w-full px-6 lg:px-12">
        <div className="bg-white border rounded-2xl p-6 lg:p-8" style={{ borderColor: BORDER }}>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef3ff] text-[#1b3ea9] text-sm font-semibold">
                <Wand2 className="w-4 h-4" /> Nhận tips học mỗi tuần
              </div>
              <h3 className="mt-3 text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Đăng ký nhận bản tin</h3>
              <p className="text-[#677788] mt-1">Cập nhật bài viết hay, đề mới & ưu đãi dành riêng cho bạn.</p>
            </div>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Đã đăng ký! 🎉");
              }}
            >
              <input type="email" required placeholder="Nhập email của bạn"
                className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none"
                style={{ borderColor: BORDER }} />
              <button
                className="rounded-lg text-white px-5 py-3 font-semibold transition"
                style={{ backgroundColor: PRIMARY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="bg-white border rounded-2xl p-6" style={{ borderColor: BORDER }}>
            <h3 className="text-xl font-extrabold text-[#1a1a1a]">Câu hỏi thường gặp</h3>
            <p className="text-sm text-[#677788] mt-1">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình học. Nếu chưa thấy câu trả lời, hãy liên hệ.
            </p>
            <Link to="/support" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: PRIMARY }}>
              Trung tâm hỗ trợ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white border rounded-2xl p-2" style={{ borderColor: BORDER }}>
            {faqs.map((f, idx) => (
              <div key={idx} className="border-b last:border-none" style={{ borderColor: BORDER }}>
                <button
                  className="w-full flex items-center justify-between text-left px-4 py-4"
                  onClick={() => setFaqs(s => s.map((x, i) => i === idx ? ({ ...x, open: !x.open }) : x))}
                  type="button"
                >
                  <span className="font-medium text-[#1a1a1a]">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 transition ${f.open ? "rotate-180" : ""}`} />
                </button>
                {f.open && (
                  <div className="px-4 pb-4 text-sm text-[#677788]">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="w-full px-6 lg:px-12 pb-12">
        <div className="bg-white border rounded-2xl p-6 lg:p-8 text-center" style={{ borderColor: BORDER }}>
          <h3 className="text-xl lg:text-2xl font-extrabold text-[#1a1a1a]">Sẵn sàng bắt đầu hành trình mới?</h3>
          <p className="text-[#677788] mt-2">Chọn khoá học phù hợp, luyện đề đều đặn và theo dõi tiến bộ mỗi ngày.</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg text-white px-5 py-3 font-semibold transition"
              style={{ backgroundColor: PRIMARY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
            >
              Khám phá khoá học
            </Link>
            <Link
              to="/exam"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold border"
              style={{ borderColor: BORDER, color: "#1a1a1a" }}
            >
              Tới thư viện đề
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
