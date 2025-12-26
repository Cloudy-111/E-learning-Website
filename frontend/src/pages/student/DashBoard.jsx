// src/pages/student/Dashboard.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Loader2, AlertCircle, Plus } from "lucide-react";
import { fetchEnrollmentsByStudentId } from "../../api/enrollments.api";

/* ================= helpers ================= */
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
const Ghost = ({ children, className = "", ...props }) => (
  <button
    type="button"
    className={
      "rounded-full border border-[#2563eb] text-[#2563eb] px-5 py-3 hover:bg-[#2563eb]/10 focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
      className
    }
    {...props}
  >
    {children}
  </button>
);

/* ================= mock data for features without API ================= */
const SCHEDULE = [
  { id: "s1", date: "Th 3, 10/10", time: "08:30", title: "React 19 — Server Actions", room: "Zoom #847-233", teacher: "Luân" },
  { id: "s2", date: "Th 4, 11/10", time: "09:00", title: "Python căn bản — Vòng lặp", room: "Zoom #992-341", teacher: "Hương" },
  { id: "s3", date: "Th 6, 13/10", time: "13:30", title: "UX/UI — Wireframe", room: "Zoom #661-022", teacher: "Mạnh" },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "Bảo trì hệ thống 22:00–24:00 tối nay", text: "Hệ thống bảo trì 2 tiếng để bổ sung tính năng mới.", tag: "Thông báo" },
  { id: "a2", title: "Mở khóa React mới", text: "Server Actions, RSC, Form Actions…", tag: "Mới" },
];

const TODOS_DEFAULT = [
  { id: "t1", text: "Hoàn thành bài tập React 19", done: false },
  { id: "t2", text: "Đọc chương 3 Python", done: true },
  { id: "t3", text: "Nộp quiz UX/UI", done: false },
];

const ACTIVITIES = [
  { id: "r1", text: 'Bạn đã hoàn thành 2 bài học trong "React 19 & Server Actions"', time: "2 giờ trước" },
  { id: "r2", text: "Giảng viên đã phản hồi bài nộp của bạn", time: "Hôm qua" },
  { id: "r3", text: "Bạn đã ghi danh khóa mới", time: "2 ngày trước" },
];

/* ================= small UI pieces ================= */
const Eye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const Clock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
  </svg>
);

/* History horizontal card */
function HistoryCard({ item }) {
  return (
    <Link
      to={`/courses/${item.courseId}`}
      className="rounded-xl border bg-white p-4 min-w-[260px] hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-blue-50 grid place-items-center shrink-0 text-[#2563eb]">
          <Eye />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium leading-tight line-clamp-1 text-slate-900">{item.courseTitle}</div>
          <div className="text-xs text-slate-600">
            {item.instructorName || "Giảng viên"} • {item.completedLessons || 0}/{item.totalLessons || 0} bài
          </div>
        </div>
      </div>
    </Link>
  );
}

/* Course card with progress */
function CourseCard({ c }) {
  const progress = c.progressPercentage || 0;

  return (
    <Link to={`/courses/${c.courseId}`} className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition">
      <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-indigo-50 grid place-items-center">
        {c.courseThumbnailUrl ? (
          <img src={c.courseThumbnailUrl} alt={c.courseTitle} className="w-full h-full object-cover" />
        ) : (
          <BookOpen className="w-12 h-12 text-blue-300" />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold leading-snug text-slate-900 group-hover:text-[#2563eb] transition line-clamp-2">{c.courseTitle}</h3>
        <p className="mt-1 text-sm text-slate-600">{c.instructorName || "Giảng viên"} • {c.categoryName || "Khóa học"}</p>
        <div className="mt-2 text-xs text-slate-500 inline-flex items-center gap-2">
          <Clock /> {c.completedLessons || 0}/{c.totalLessons || 0} bài học
        </div>

        {/* progress */}
        <div className="mt-4">
          <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-[#2563eb] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-1 text-xs text-slate-600">{progress}% hoàn thành</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Primary className="px-4 py-2 text-sm">Tiếp tục học</Primary>
          <Ghost className="px-4 py-2 text-sm">Chi tiết</Ghost>
        </div>
      </div>
    </Link>
  );
}

/* Schedule item */
function ScheduleItem({ s }) {
  return (
    <div className="rounded-xl border bg-white p-4 flex items-center gap-4">
      <div className="text-center flex-shrink-0">
        <div className="text-xs text-slate-500">{s.date}</div>
        <div className="text-lg font-semibold text-slate-900">{s.time}</div>
      </div>
      <div className="h-10 w-px bg-slate-200" />
      <div className="flex-1 min-w-0">
        <div className="font-medium leading-tight text-slate-900 truncate">{s.title}</div>
        <div className="text-xs text-slate-500 truncate">{s.teacher} • {s.room}</div>
      </div>
      <Ghost className="px-4 py-2 text-sm flex-shrink-0">Tham gia</Ghost>
    </div>
  );
}

/* Announcement */
function Announcement({ a }) {
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="text-xs inline-flex px-2 py-0.5 rounded-full border mr-2 text-[#2563eb] border-[#2563eb]/40">{a.tag}</div>
      <div className="font-medium mt-1 text-slate-900">{a.title}</div>
      <p className="text-sm text-slate-600 mt-1">{a.text}</p>
    </div>
  );
}

/* Todo list */
function Todos() {
  const [items, setItems] = useState(TODOS_DEFAULT);
  const toggle = (id) =>
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const add = (e) => {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get("todo");
    if (!v) return;
    setItems((xs) => [{ id: `t${Date.now()}`, text: String(v), done: false }, ...xs]);
    e.currentTarget.reset();
  };

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900">Việc cần làm</h3>
      </div>
      <form onSubmit={add} className="flex gap-2 mb-4">
        <input
          name="todo"
          placeholder="Thêm việc cần làm…"
          className="flex-1 rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
        />
        <Primary className="px-4 py-2" type="submit">Thêm</Primary>
      </form>

      <ul className="space-y-2">
        {items.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-[#2563eb]"
              checked={t.done}
              onChange={() => toggle(t.id)}
            />
            <span className={`text-sm ${t.done ? "line-through text-slate-400" : "text-slate-800"}`}>{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Activity feed */
function ActivityFeed() {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="font-semibold mb-3 text-slate-900">Hoạt động gần đây</h3>
      <ul className="space-y-3">
        {ACTIVITIES.map((a) => (
          <li key={a.id} className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-[#2563eb]/10 grid place-items-center text-[#2563eb] flex-shrink-0">✓</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-slate-800">{a.text}</div>
              <div className="text-xs text-slate-500">{a.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ================= sections ================= */
function Welcome({ stats, recentCourses, loading }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="w-screen overflow-x-hidden pt-6">
      <div className="w-screen px-6 lg:px-12">
        {/* Top row: greeting + actions */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">Xin chào 👋, chúc bạn học tốt hôm nay!</h1>
            <p className="text-slate-600 mt-1">Tiếp tục với khóa học gần nhất, hoặc khám phá nội dung mới.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/courses" className="rounded-full border border-[#2563eb] text-[#2563eb] px-5 py-3 hover:bg-[#2563eb]/10 transition text-sm">
              Khám phá khóa học
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <input
              placeholder="Tìm khóa học, bài giảng, tài liệu…"
              className="flex-1 rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
            />
            <Primary className="px-5 py-3">Tìm</Primary>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Đã ghi danh", value: loading ? "..." : stats.totalEnrolled },
            { label: "Đang học", value: loading ? "..." : stats.inProgress },
            { label: "Hoàn thành", value: loading ? "..." : stats.completed },
            { label: "Tổng bài học", value: loading ? "..." : stats.totalLessons },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border bg-white p-5">
              <div className="text-xs text-slate-500">{s.label}</div>
              <div className="text-2xl font-extrabold mt-1 text-slate-900">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Continue learning */}
        {recentCourses.length > 0 && (
          <>
            <div className="mt-8 flex items-center justify-between">
              <div className="text-lg font-semibold text-slate-900">Tiếp tục học</div>
              <div className="flex items-center gap-2">
                <button onClick={() => scroll("left")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt trái">‹</button>
                <button onClick={() => scroll("right")} className="rounded-full border px-3 py-2 hover:bg-slate-50" aria-label="Trượt phải">›</button>
                <Link to="/student/courses" className="text-[#2563eb] ml-2 hover:underline">Xem tất cả</Link>
              </div>
            </div>

            <div ref={ref} className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {recentCourses.map((h) => <HistoryCard key={h.enrollmentId} item={h} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* Khối "Khóa học của tôi" */
function MyCoursesBlock({ courses, loading }) {
  return (
    <div className="py-8 lg:py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">Khóa học của tôi</h2>
        <Link to="/student/courses" className="text-[#2563eb] hover:underline">Xem tất cả</Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {courses.map((c) => <CourseCard key={c.enrollmentId} c={c} />)}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Bạn chưa ghi danh khóa học nào</p>
          <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] transition">
            <Plus className="w-4 h-4" /> Khám phá khóa học
          </Link>
        </div>
      )}
    </div>
  );
}

function RightColumn() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-semibold mb-3 text-slate-900">Lịch học sắp tới</h3>
        <div className="grid gap-3">
          {SCHEDULE.length > 0 ? (
            SCHEDULE.map((s) => <ScheduleItem key={s.id} s={s} />)
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">Chưa có lịch học</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-semibold mb-3 text-slate-900">Thông báo</h3>
        <div className="grid gap-3">
          {ANNOUNCEMENTS.map((a) => <Announcement key={a.id} a={a} />)}
        </div>
      </div>

      <Todos />
      <ActivityFeed />
    </div>
  );
}

/* ================= page ================= */
export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchEnrollmentsByStudentId({ pageSize: 100 });

      if (response.status === "success" && response.data) {
        setEnrollments(response.data.items || response.data || []);
      } else {
        setEnrollments([]);
      }
    } catch (err) {
      console.error("Error loading enrollments:", err);
      setError("Không thể tải danh sách khóa học. Vui lòng thử lại.");
      setEnrollments([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from enrollments
  const stats = useMemo(() => {
    const totalEnrolled = enrollments.length;
    const completed = enrollments.filter(e => (e.progressPercentage || 0) >= 100).length;
    const inProgress = enrollments.filter(e => {
      const progress = e.progressPercentage || 0;
      return progress > 0 && progress < 100;
    }).length;
    const totalLessons = enrollments.reduce((sum, e) => sum + (e.totalLessons || 0), 0);

    return { totalEnrolled, inProgress, completed, totalLessons };
  }, [enrollments]);

  // Get recent courses (sorted by last accessed or enrollment date)
  const recentCourses = useMemo(() => {
    return [...enrollments]
      .filter(e => (e.progressPercentage || 0) < 100) // Only incomplete courses
      .sort((a, b) => (b.enrolledAt || "").localeCompare(a.enrolledAt || ""))
      .slice(0, 5);
  }, [enrollments]);

  // Get courses for main section (limit to 4 for display)
  const displayCourses = useMemo(() => {
    return enrollments.slice(0, 4);
  }, [enrollments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <>

      {error && (
        <div className="w-full px-6 lg:px-12 pt-6">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">{error}</p>
              <button onClick={loadEnrollments} className="text-sm text-red-700 hover:text-red-800 underline mt-1">
                Thử lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome: full-width */}
      <Welcome stats={stats} recentCourses={recentCourses} loading={loading} />

      {/* Two-column main: MyCourses + right sidebar */}
      <section className="w-screen overflow-x-hidden">
        <div className="w-screen px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MyCoursesBlock courses={displayCourses} loading={loading} />
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-20 h-fit">
            <RightColumn />
          </div>
        </div>
      </section>
    </>
  );
}
