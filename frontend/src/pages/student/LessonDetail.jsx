// // src/pages/LessonDetail.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   PlayCircle, FileText, Clock, BookOpenText, CheckCircle2,
//   ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, Download, MessageSquare
// } from "lucide-react";

// /* ================== Mock lessons ================== */
// /** Bạn có thể thay bằng fetch từ API. lesson có thể thuộc nhiều course khác nhau */
// const LESSONS = [
//   {
//     id: "1",
//     courseId: "react-essentials",
//     courseTitle: "ReactJS Essentials",
//     title: "Giới thiệu React & Component",
//     kind: "video", // "video" | "reading" | "quiz"
//     duration: "18:40",
//     resources: [
//       { name: "Slide PDF", href: "/assets/react-intro.pdf" },
//       { name: "Starter Code (zip)", href: "/assets/react-starter.zip" },
//     ],
//     content: [
//       "React là thư viện xây dựng UI theo mô hình component-based.",
//       "Bạn sẽ làm quen JSX, Virtual DOM và luồng dữ liệu một chiều.",
//       "Bài này giúp bạn setup dự án và render component đầu tiên."
//     ],
//     order: 1,
//   },
//   {
//     id: "2",
//     courseId: "react-essentials",
//     courseTitle: "ReactJS Essentials",
//     title: "useState & useEffect cơ bản",
//     kind: "video",
//     duration: "26:12",
//     resources: [
//       { name: "Gist ví dụ", href: "/assets/useState-useEffect.txt" },
//     ],
//     content: [
//       "Hiểu cách quản lý state cục bộ bằng useState.",
//       "useEffect để đồng bộ hoá side-effects (fetching / subscriptions).",
//       "Các lưu ý dependency & cleanup."
//     ],
//     order: 2,
//   },
//   {
//     id: "3",
//     courseId: "react-essentials",
//     courseTitle: "ReactJS Essentials",
//     title: "Props & Composition",
//     kind: "reading",
//     duration: "15:05",
//     resources: [],
//     content: [
//       "Props cho phép truyền dữ liệu từ cha xuống con.",
//       "Composition giúp tái sử dụng UI linh hoạt (children, slots).",
//       "Thực hành tách component & prop-types cơ bản."
//     ],
//     order: 3,
//   },
//   {
//     id: "4",
//     courseId: "react-essentials",
//     courseTitle: "ReactJS Essentials",
//     title: "Router & Nested Routes",
//     kind: "video",
//     duration: "21:33",
//     resources: [{ name: "Repo demo", href: "/assets/router-repo.txt" }],
//     content: [
//       "Cấu hình react-router v6: Route, Outlet.",
//       "Tạo nested route & breadcrumb.",
//       "Link, NavLink và lazy-loading."
//     ],
//     order: 4,
//   },
// ];

// /* ================== Local storage helpers ================== */
// const safeJSON = {
//   get(key, fallback) {
//     try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
//   },
//   set(key, value) {
//     try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
//   }
// };

// /* ================== Sub components ================== */
// function SectionHeader({ title, icon }) {
//   return (
//     <div className="flex items-center gap-2 mb-3">
//       {icon}
//       <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//     </div>
//   );
// }

// function ResourceItem({ name, href }) {
//   return (
//     <a
//       href={href}
//       className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border hover:bg-gray-50"
//       download
//     >
//       <span className="text-sm text-gray-800">{name}</span>
//       <Download className="w-4 h-4 text-gray-500" />
//     </a>
//   );
// }

// /* ================== Main page ================== */
// export default function LessonDetail() {
//   const { lessonId } = useParams();
//   const navigate = useNavigate();

//   // tìm lesson hiện tại + danh sách lesson cùng course (để render outline và điều hướng prev/next)
//   const lesson = useMemo(() => LESSONS.find(l => l.id === lessonId), [lessonId]);
//   const siblings = useMemo(
//     () => lesson ? LESSONS.filter(l => l.courseId === lesson.courseId).sort((a,b) => a.order - b.order) : [],
//     [lesson]
//   );
//   const idx = useMemo(() => (lesson ? siblings.findIndex(l => l.id === lesson.id) : -1), [lesson, siblings]);
//   const prev = idx > 0 ? siblings[idx - 1] : null;
//   const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

//   // local states: complete, bookmark, notes, comments
//   const COMPLETE_KEY = `lesson_complete_${lessonId}`;
//   const BOOKMARK_KEY = `lesson_bookmark_${lessonId}`;
//   const NOTES_KEY = `lesson_notes_${lessonId}`;
//   const COMMENTS_KEY = `lesson_comments_${lessonId}`;

//   const [completed, setCompleted] = useState(safeJSON.get(COMPLETE_KEY, false));
//   const [bookmarked, setBookmarked] = useState(safeJSON.get(BOOKMARK_KEY, false));
//   const [notes, setNotes] = useState(safeJSON.get(NOTES_KEY, ""));
//   const [comments, setComments] = useState(safeJSON.get(COMMENTS_KEY, []));
//   const [comment, setComment] = useState("");

//   useEffect(() => safeJSON.set(COMPLETE_KEY, completed), [completed]);
//   useEffect(() => safeJSON.set(BOOKMARK_KEY, bookmarked), [bookmarked]);
//   useEffect(() => safeJSON.set(NOTES_KEY, notes), [notes]);
//   useEffect(() => safeJSON.set(COMMENTS_KEY, comments), [comments]);

//   useEffect(() => window.scrollTo(0, 0), [lessonId]);

//   if (!lesson) {
//     return (
//       <div className="min-h-screen w-screen max-w-none bg-white">
//         <Header />
//         <main className="w-full px-6 lg:px-12 py-16">
//           <div className="max-w-3xl">
//             <Link to="/s/enrollments" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
//               <ChevronLeft className="w-4 h-4" /> Về “Khóa học của tôi”
//             </Link>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bài học</h1>
//             <p className="text-gray-600">ID: {lessonId}</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const markComplete = () => setCompleted(v => !v);
//   const toggleBookmark = () => setBookmarked(v => !v);
//   const addComment = (e) => {
//     e.preventDefault();
//     const t = comment.trim();
//     if (!t) return;
//     setComments([...comments, { id: crypto.randomUUID(), text: t, at: Date.now() }]);
//     setComment("");
//   };
//   const removeComment = (id) => setComments(comments.filter(c => c.id !== id));

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-white">
//       <Header />

//       {/* HERO / breadcrumb */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-6">
//           <div className="flex items-center gap-3 text-sm text-gray-600">
//             <Link to="/s/enrollments" className="text-blue-600 hover:text-blue-700">Khóa học của tôi</Link>
//             <span>›</span>
//             <Link to={`/s/learning/${lesson.courseId}`} className="text-blue-600 hover:text-blue-700">{lesson.courseTitle}</Link>
//             <span>›</span>
//             <span className="text-gray-800 font-medium truncate">{lesson.title}</span>
//           </div>

//           <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{lesson.title}</h1>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={toggleBookmark}
//                 className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
//                   bookmarked ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "hover:bg-gray-50"
//                 }`}
//               >
//                 {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
//                 {bookmarked ? "Đã lưu" : "Lưu bài học"}
//               </button>

//               <button
//                 onClick={markComplete}
//                 className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
//                   completed ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//                 title="Đánh dấu hoàn thành bài học này"
//               >
//                 <CheckCircle2 className="w-4 h-4" />
//                 {completed ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* MAIN */}
//       <main className="w-full px-6 lg:px-12 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

//           {/* LEFT: Content */}
//           <section className="space-y-6">
//             {/* Media area */}
//             <div className="bg-white border rounded-2xl overflow-hidden">
//               <div className="px-5 py-4 border-b flex items-center justify-between">
//                 <div className="flex items-center gap-2 text-gray-700">
//                   {lesson.kind === "video" ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
//                   <span className="text-sm">{lesson.kind === "video" ? "Video bài học" : "Tài liệu đọc"}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <Clock className="w-4 h-4" /> {lesson.duration}
//                 </div>
//               </div>

//               <div className="p-5">
//                 {lesson.kind === "video" ? (
//                   <div className="aspect-video bg-black/5 grid place-items-center rounded-xl border">
//                     <span className="text-gray-500 text-sm">Embed video player (YouTube/Vimeo/MP4) tại đây</span>
//                   </div>
//                 ) : (
//                   <div className="prose prose-slate max-w-none">
//                     <h3>Ghi chú bài đọc</h3>
//                     <p>Nội dung đọc có thể hiển thị Markdown/HTML… (demo dưới là bullet points).</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Nội dung tóm tắt */}
//             <div className="bg-white border rounded-2xl p-6">
//               <SectionHeader
//                 title="Tóm tắt nội dung"
//                 icon={<BookOpenText className="w-5 h-5 text-gray-700" />}
//               />
//               <ul className="text-sm text-gray-700 space-y-2">
//                 {lesson.content.map((line, i) => (
//                   <li key={i} className="flex gap-2">
//                     <span className="text-gray-400">•</span>
//                     <span>{line}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Tài nguyên đính kèm */}
//             <div className="bg-white border rounded-2xl p-6">
//               <SectionHeader title="Tài nguyên" icon={<Download className="w-5 h-5 text-gray-700" />} />
//               {lesson.resources.length ? (
//                 <div className="grid sm:grid-cols-2 gap-3">
//                   {lesson.resources.map((r, i) => <ResourceItem key={i} {...r} />)}
//                 </div>
//               ) : (
//                 <div className="text-sm text-gray-600">Chưa có tài nguyên đính kèm.</div>
//               )}
//             </div>

//             {/* Ghi chú cá nhân */}
//             <div className="bg-white border rounded-2xl p-6">
//               <SectionHeader title="Ghi chú của tôi" icon={<FileText className="w-5 h-5 text-gray-700" />} />
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 rows={5}
//                 placeholder="Ghi lại ý chính, câu hỏi, timestamps…"
//                 className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <div className="mt-2 text-xs text-gray-500">Tự động lưu vào trình duyệt (local).</div>
//             </div>

//             {/* Bình luận (công khai theo lessonId – lưu local để demo) */}
//             <div className="bg-white border rounded-2xl p-6">
//               <SectionHeader title="Bình luận" icon={<MessageSquare className="w-5 h-5 text-gray-700" />} />
//               <form onSubmit={addComment} className="grid gap-3">
//                 <textarea
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                   rows={3}
//                   placeholder="Chia sẻ câu hỏi hoặc thảo luận của bạn…"
//                   className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500">Nhấn <b>Ctrl + Enter</b> để đăng nhanh</span>
//                   <button
//                     type="submit"
//                     onKeyDown={(e) => { if (e.ctrlKey && e.key === "Enter") addComment(e); }}
//                     className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
//                   >
//                     Đăng bình luận
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-4 grid gap-3">
//                 {comments.length === 0 && (
//                   <div className="text-sm text-gray-500">Chưa có bình luận nào.</div>
//                 )}
//                 {comments.map((c) => (
//                   <div key={c.id} className="border rounded-xl p-3">
//                     <div className="flex items-center justify-between gap-3">
//                       <div className="text-sm text-gray-800">Khách</div>
//                       <div className="text-xs text-gray-500">
//                         {new Date(c.at).toLocaleString("vi-VN", { hour12: false })}
//                       </div>
//                     </div>
//                     <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">{c.text}</p>
//                     <div className="mt-2 text-right">
//                       <button
//                         onClick={() => removeComment(c.id)}
//                         className="text-xs text-gray-500 rounded-full border px-2 py-1 hover:bg-gray-50"
//                       >
//                         Xoá
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Điều hướng prev/next */}
//             <div className="flex items-center justify-between gap-3">
//               <button
//                 disabled={!prev}
//                 onClick={() => prev && navigate(`/s/lesson/${prev.id}`)}
//                 className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm ${
//                   prev ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
//                 }`}
//               >
//                 <ChevronLeft className="w-4 h-4" /> Bài trước
//               </button>

//               <Link
//                 to={`/s/learning/${lesson.courseId}`}
//                 className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
//               >
//                 Về outline khoá
//               </Link>

//               <button
//                 disabled={!next}
//                 onClick={() => next && navigate(`/s/lesson/${next.id}`)}
//                 className={`inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium ${
//                   next ? "hover:bg-blue-700" : "opacity-60 cursor-not-allowed"
//                 }`}
//               >
//                 Bài tiếp <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>
//           </section>

//           {/* RIGHT: Outline (sticky) */}
//           <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
//             <div className="bg-white border rounded-2xl p-5">
//               <div className="flex items-center gap-2 mb-3">
//                 <BookOpenText className="w-5 h-5 text-gray-700" />
//                 <h4 className="font-semibold text-gray-900">Outline khoá học</h4>
//               </div>

//               <ol className="grid gap-2">
//                 {siblings.map((l) => {
//                   const active = l.id === lesson.id;
//                   const done = safeJSON.get(`lesson_complete_${l.id}`, false);
//                   return (
//                     <li key={l.id}>
//                       <Link
//                         to={`/s/lesson/${l.id}`}
//                         className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border ${
//                           active ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
//                         }`}
//                       >
//                         <div className="min-w-0">
//                           <p className={`text-sm truncate ${active ? "text-blue-800 font-medium" : "text-gray-800"}`}>
//                             {l.order}. {l.title}
//                           </p>
//                           <p className="text-xs text-gray-500">{l.kind === "video" ? "Video" : l.kind === "reading" ? "Tài liệu" : "Quiz"} • {l.duration}</p>
//                         </div>
//                         {done && <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ol>
//             </div>

//             {/* Tóm tắt nhanh */}
//             <div className="bg-white border rounded-2xl p-5">
//               <div className="grid grid-cols-3 gap-3 text-center">
//                 <div className="rounded-lg bg-gray-50 border p-3">
//                   <div className="text-xs text-gray-500">Bài hiện tại</div>
//                   <div className="text-sm font-semibold text-gray-800">{idx + 1}/{siblings.length}</div>
//                 </div>
//                 <div className="rounded-lg bg-gray-50 border p-3">
//                   <div className="text-xs text-gray-500">Thời lượng</div>
//                   <div className="text-sm font-semibold text-gray-800">{lesson.duration}</div>
//                 </div>
//                 <div className="rounded-lg bg-gray-50 border p-3">
//                   <div className="text-xs text-gray-500">Loại</div>
//                   <div className="text-sm font-semibold text-gray-800">{lesson.kind === "video" ? "Video" : lesson.kind === "reading" ? "Tài liệu" : "Quiz"}</div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
























































// src/pages/LessonDetail.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  PlayCircle, FileText, Clock, BookOpenText, CheckCircle2,
  ChevronLeft, ChevronRight, Bookmark, BookmarkCheck,
  Download, MessageSquare
} from "lucide-react";

const API_BASE = "http://localhost:5102/api";

/* =============== Local helpers =============== */
const safeJSON = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
};

function SectionHeader({ title, icon }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
  );
}

function ResourceItem({ name, href }) {
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border hover:bg-gray-50"
      download
    >
      <span className="text-sm text-gray-800">{name}</span>
      <Download className="w-4 h-4 text-gray-500" />
    </a>
  );
}

/* =============== MAIN COMPONENT =============== */
export default function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [siblings, setSiblings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Local states (bookmark, note, comments)
  const [completed, setCompleted] = useState(safeJSON.get(`lesson_complete_${lessonId}`, false));
  const [bookmarked, setBookmarked] = useState(safeJSON.get(`lesson_bookmark_${lessonId}`, false));
  const [notes, setNotes] = useState(safeJSON.get(`lesson_notes_${lessonId}`, ""));
  const [comments, setComments] = useState(safeJSON.get(`lesson_comments_${lessonId}`, []));
  const [comment, setComment] = useState("");

  /* =============== Fetch lesson + siblings =============== */
  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        // 1️⃣ Lấy bài học
        const resLesson = await fetch(`${API_BASE}/lessons/${lessonId}`, { signal: ac.signal });
        if (!resLesson.ok) throw new Error(`HTTP ${resLesson.status}`);
        const dataLesson = await resLesson.json();
        setLesson(dataLesson);

        // 2️⃣ Lấy danh sách bài học cùng khóa
        if (dataLesson?.courseId) {
          const resSiblings = await fetch(`${API_BASE}/courses/${dataLesson.courseId}/lessons`, { signal: ac.signal });
          if (resSiblings.ok) {
            const list = await resSiblings.json();
            const sorted = Array.isArray(list) ? list.sort((a, b) => a.order - b.order) : [];
            setSiblings(sorted);
          }
        }
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Lesson load error:", e);
          setError("Không tải được dữ liệu bài học. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (lessonId) load();
    return () => ac.abort();
  }, [lessonId]);

  // Save local changes
  useEffect(() => safeJSON.set(`lesson_complete_${lessonId}`, completed), [completed, lessonId]);
  useEffect(() => safeJSON.set(`lesson_bookmark_${lessonId}`, bookmarked), [bookmarked, lessonId]);
  useEffect(() => safeJSON.set(`lesson_notes_${lessonId}`, notes), [notes, lessonId]);
  useEffect(() => safeJSON.set(`lesson_comments_${lessonId}`, comments), [comments, lessonId]);

  useEffect(() => window.scrollTo(0, 0), [lessonId]);

  /* =============== Derived data =============== */
  const idx = useMemo(
    () => (lesson ? siblings.findIndex(l => l.id === lesson.id) : -1),
    [lesson, siblings]
  );
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  /* =============== API: mark complete =============== */
  const markComplete = async () => {
    try {
      setCompleted(v => !v);
      await fetch(`${API_BASE}/lessons/${lessonId}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: completed ? "incomplete" : "completed" }),
      });
    } catch (e) {
      console.warn("Cannot update progress:", e);
    }
  };

  const toggleBookmark = () => setBookmarked(v => !v);
  const addComment = (e) => {
    e.preventDefault();
    const t = comment.trim();
    if (!t) return;
    setComments([...comments, { id: crypto.randomUUID(), text: t, at: Date.now() }]);
    setComment("");
  };
  const removeComment = (id) => setComments(comments.filter(c => c.id !== id));

  /* =============== UI: loading / error =============== */
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto p-10 grid gap-6">
          <div className="h-[240px] bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-5 bg-slate-100 w-2/3 rounded animate-pulse" />
          <div className="h-4 bg-slate-100 w-full rounded animate-pulse" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-3xl">
            <Link to="/s/enrollments" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
              <ChevronLeft className="w-4 h-4" /> Về “Khóa học của tôi”
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {error || "Không tìm thấy bài học"}
            </h1>
            <p className="text-gray-600">ID: {lessonId}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  /* =============== MAIN UI =============== */
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO / breadcrumb */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Link to="/s/enrollments" className="text-blue-600 hover:text-blue-700">
              Khóa học của tôi
            </Link>
            <span>›</span>
            <Link to={`/s/learning/${lesson.courseId}`} className="text-blue-600 hover:text-blue-700">
              {lesson.courseTitle}
            </Link>
            <span>›</span>
            <span className="text-gray-800 font-medium truncate">{lesson.title}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{lesson.title}</h1>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleBookmark}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  bookmarked ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "hover:bg-gray-50"
                }`}
              >
                {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {bookmarked ? "Đã lưu" : "Lưu bài học"}
              </button>

              <button
                onClick={markComplete}
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  completed ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completed ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* LEFT: Content */}
          <section className="space-y-6">
            {/* Media area */}
            <div className="bg-white border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                  {lesson.kind === "video" ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                  <span className="text-sm">{lesson.kind === "video" ? "Video bài học" : "Tài liệu đọc"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" /> {lesson.duration}
                </div>
              </div>

              <div className="p-5">
                {lesson.kind === "video" && lesson.videoUrl ? (
                  <video src={lesson.videoUrl} controls className="w-full aspect-video rounded-xl" />
                ) : lesson.kind === "reading" ? (
                  <div
                    className="prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: lesson.content || "<p>Chưa có nội dung.</p>" }}
                  />
                ) : (
                  <div className="aspect-video bg-gray-100 grid place-items-center rounded-xl border">
                    <span className="text-gray-500 text-sm">
                      {lesson.kind === "quiz" ? "Nội dung quiz (chưa hỗ trợ)" : "Không có video"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tài nguyên */}
            <div className="bg-white border rounded-2xl p-6">
              <SectionHeader title="Tài nguyên đính kèm" icon={<Download className="w-5 h-5 text-gray-700" />} />
              {lesson.resources?.length ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {lesson.resources.map((r, i) => (
                    <ResourceItem key={i} {...r} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600">Chưa có tài nguyên đính kèm.</div>
              )}
            </div>

            {/* Ghi chú cá nhân */}
            <div className="bg-white border rounded-2xl p-6">
              <SectionHeader title="Ghi chú của tôi" icon={<FileText className="w-5 h-5 text-gray-700" />} />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Ghi lại ý chính, câu hỏi..."
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-gray-500">Tự động lưu vào trình duyệt (local).</p>
            </div>

            {/* Bình luận */}
            <div className="bg-white border rounded-2xl p-6">
              <SectionHeader title="Bình luận" icon={<MessageSquare className="w-5 h-5 text-gray-700" />} />
              <form onSubmit={addComment} className="grid gap-3">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Chia sẻ câu hỏi hoặc thảo luận của bạn…"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Ctrl + Enter để đăng</span>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
                  >
                    Đăng bình luận
                  </button>
                </div>
              </form>
              <div className="mt-4 grid gap-3">
                {comments.length === 0 && <p className="text-sm text-gray-500">Chưa có bình luận nào.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="border rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Khách</span>
                      <span>{new Date(c.at).toLocaleString("vi-VN", { hour12: false })}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">{c.text}</p>
                    <div className="mt-2 text-right">
                      <button
                        onClick={() => removeComment(c.id)}
                        className="text-xs text-gray-500 border px-2 py-1 rounded-full hover:bg-gray-50"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Điều hướng */}
            <div className="flex items-center justify-between gap-3">
              <button
                disabled={!prev}
                onClick={() => prev && navigate(`/s/lesson/${prev.id}`)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm ${
                  prev ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Bài trước
              </button>

              <Link
                to={`/s/learning/${lesson.courseId}`}
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Về outline
              </Link>

              <button
                disabled={!next}
                onClick={() => next && navigate(`/s/lesson/${next.id}`)}
                className={`inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium ${
                  next ? "hover:bg-blue-700" : "opacity-60 cursor-not-allowed"
                }`}
              >
                Bài tiếp <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* RIGHT: Outline */}
          <aside className="space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-white border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpenText className="w-5 h-5 text-gray-700" />
                <h4 className="font-semibold text-gray-900">Outline khóa học</h4>
              </div>
              <ol className="grid gap-2">
                {siblings.map((l) => {
                  const active = l.id === lesson.id;
                  const done = safeJSON.get(`lesson_complete_${l.id}`, false);
                  return (
                    <li key={l.id}>
                      <Link
                        to={`/s/lesson/${l.id}`}
                        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg border ${
                          active ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50…"}`
                        }
                      >
                        <div className="min-w-0">
                          <p
                            className={`text-sm truncate ${
                              active ? "text-blue-800 font-medium" : "text-gray-800"
                            }`}
                          >
                            {l.order}. {l.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {l.kind === "video"
                              ? "Video"
                              : l.kind === "reading"
                              ? "Tài liệu"
                              : "Quiz"}{" "}
                            • {l.duration}
                          </p>
                        </div>
                        {done && (
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Tóm tắt nhanh */}
            <div className="bg-white border rounded-2xl p-5">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-gray-50 border p-3">
                  <div className="text-xs text-gray-500">Bài hiện tại</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {idx + 1}/{siblings.length}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 border p-3">
                  <div className="text-xs text-gray-500">Thời lượng</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {lesson.duration}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 border p-3">
                  <div className="text-xs text-gray-500">Loại</div>
                  <div className="text-sm font-semibold text-gray-800">
                    {lesson.kind === "video"
                      ? "Video"
                      : lesson.kind === "reading"
                      ? "Tài liệu"
                      : "Quiz"}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}




























































