// // src/pages/student/Enrollments.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// /** Mock data: danh sách khoá học đã ghi danh */
// const ENROLLED = [
//   {
//     id: "react-essentials",
//     title: "ReactJS Essentials",
//     category: "Frontend Web",
//     duration: "5 tuần",
//     lessons: 68,
//     progress: 42,           // %
//     lastAccess: "2025-10-29 20:31",
//     cover: "/covers/react.jpg",
//   },
//   {
//     id: "js-foundation",
//     title: "JavaScript Foundation",
//     category: "Frontend Web",
//     duration: "4 tuần",
//     lessons: 54,
//     progress: 100,
//     lastAccess: "2025-10-18 09:22",
//     cover: "/covers/js.jpg",
//   },
//   {
//     id: "python-ds",
//     title: "Python & Data Structures",
//     category: "Core CS",
//     duration: "6 tuần",
//     lessons: 72,
//     progress: 0,
//     lastAccess: "—",
//     cover: "/covers/python.jpg",
//   },
//   {
//     id: "node-api",
//     title: "Node.js RESTful API",
//     category: "Backend Web",
//     duration: "4 tuần",
//     lessons: 60,
//     progress: 18,
//     lastAccess: "2025-11-01 15:02",
//     cover: "/covers/node.jpg",
//   },
//   {
//     id: "sql-practical",
//     title: "SQL Practical for Dev",
//     category: "Database",
//     duration: "3 tuần",
//     lessons: 40,
//     progress: 70,
//     lastAccess: "2025-10-25 08:10",
//     cover: "/covers/sql.jpg",
//   },
//   {
//     id: "devops-begin",
//     title: "DevOps cơ bản",
//     category: "DevOps",
//     duration: "4 tuần",
//     lessons: 55,
//     progress: 9,
//     lastAccess: "2025-10-30 19:14",
//     cover: "/covers/devops.jpg",
//   },
// ];

// /** helper: badge theo trạng thái */
// const getStatus = (p) => (p >= 100 ? "Hoàn thành" : p > 0 ? "Đang học" : "Chưa học");
// const statusStyle = (s) =>
//   s === "Hoàn thành"
//     ? "bg-green-100 text-green-700 border-green-200"
//     : s === "Đang học"
//       ? "bg-blue-100 text-blue-700 border-blue-200"
//       : "bg-gray-100 text-gray-700 border-gray-200";

// /** progress bar */
// function Progress({ value }) {
//   return (
//     <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
//       <div
//         className="h-full bg-blue-600"
//         style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
//       />
//     </div>
//   );
// }

// export default function Enrollments() {
//   const navigate = useNavigate();
//   const [q, setQ] = useState("");
//   const [status, setStatus] = useState("all"); // all | studying | completed | not
//   const [sort, setSort] = useState("recent");  // recent | progress-desc | progress-asc
//   const [page, setPage] = useState(1);
//   const perPage = 8;

//   // lọc
//   const filtered = useMemo(() => {
//     let list = ENROLLED.slice();

//     // status filter
//     if (status !== "all") {
//       list = list.filter((c) => {
//         const st = getStatus(c.progress);
//         if (status === "completed") return st === "Hoàn thành";
//         if (status === "studying") return st === "Đang học";
//         if (status === "not") return st === "Chưa học";
//         return true;
//       });
//     }

//     // search
//     const key = q.trim().toLowerCase();
//     if (key) {
//       list = list.filter(
//         (c) =>
//           c.title.toLowerCase().includes(key) ||
//           c.category.toLowerCase().includes(key)
//       );
//     }

//     // sort
//     if (sort === "progress-desc") list.sort((a, b) => b.progress - a.progress);
//     if (sort === "progress-asc") list.sort((a, b) => a.progress - b.progress);
//     if (sort === "recent") {
//       // “—” < date; sắp xếp lastAccess desc; giữ thứ tự mock nếu không có date hợp lệ
//       list.sort((a, b) => {
//         const da = Date.parse(a.lastAccess) || 0;
//         const db = Date.parse(b.lastAccess) || 0;
//         return db - da;
//       });
//     }

//     return list;
//   }, [q, status, sort]);

//   // phân trang
//   const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
//   const safePage = Math.min(page, totalPages);
//   const slice = filtered.slice((safePage - 1) * perPage, (safePage - 1) * perPage + perPage);

//   useEffect(() => {
//     // khi filter/search/sort đổi → về trang 1
//     setPage(1);
//   }, [q, status, sort]);

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-white">
//       <Header />

//       {/* HERO */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-8">
//           <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Khóa học của tôi</h1>
//           <p className="text-gray-700 mt-1">Xem tiến độ học, tiếp tục bài học và quản lý ghi danh.</p>

//           {/* controls */}
//           <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
//             {/* search */}
//             <div className="relative">
//               <input
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//                 placeholder="Tìm theo tên khóa học, danh mục…"
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <span className="absolute right-3 top-3 text-sm text-gray-400">⌘K</span>
//             </div>

//             {/* status */}
//             <div className="flex items-center gap-2">
//               <label className="text-sm text-gray-600">Trạng thái</label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">Tất cả</option>
//                 <option value="studying">Đang học</option>
//                 <option value="completed">Hoàn thành</option>
//                 <option value="not">Chưa học</option>
//               </select>
//             </div>

//             {/* sort */}
//             <div className="flex items-center gap-2">
//               <label className="text-sm text-gray-600">Sắp xếp</label>
//               <select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="recent">Gần đây</option>
//                 <option value="progress-desc">% hoàn thành ↓</option>
//                 <option value="progress-asc">% hoàn thành ↑</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* MAIN */}
//       <main className="w-full px-6 lg:px-12 py-10">
//         {/* list */}
//         {slice.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {slice.map((c) => {
//               const st = getStatus(c.progress);
//               return (
//                 <article
//                   key={c.id}
//                   className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
//                 >
//                   {/* cover */}
//                   <div className="aspect-[16/9] bg-gray-100 grid place-items-center overflow-hidden">
//                     {c.cover ? (
//                       <img src={c.cover} alt={c.title} className="w-full h-full object-cover" />
//                     ) : (
//                       <span className="text-gray-400 text-sm">Ảnh khóa học</span>
//                     )}
//                   </div>

//                   {/* content */}
//                   <div className="p-5">
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="min-w-0">
//                         <div className="text-xs text-gray-500">{c.category} • {c.duration} • {c.lessons} bài</div>
//                         <h3 className="text-base font-semibold text-gray-900 mt-1 line-clamp-2">{c.title}</h3>
//                       </div>
//                       <span className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusStyle(st)}`}>
//                         {st}
//                       </span>
//                     </div>

//                     {/* progress */}
//                     <div className="mt-3">
//                       <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
//                         <span>Tiến độ</span>
//                         <span>{c.progress}%</span>
//                       </div>
//                       <Progress value={c.progress} />
//                       <div className="mt-2 text-xs text-gray-500">
//                         Lần học gần nhất: <span className="font-medium text-gray-700">{c.lastAccess}</span>
//                       </div>
//                     </div>

//                     {/* actions */}
//                     <div className="mt-4 flex flex-wrap gap-2">
//                       {/* Tiếp tục học: /s/learning/:courseId */}
//                       <button
//                         onClick={() => navigate(`/s/learning/${c.id}`)}
//                         className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
//                         type="button"
//                       >
//                         {c.progress > 0 ? "Tiếp tục học" : "Bắt đầu học"}
//                       </button>

//                       {/* Xem chi tiết public: /courses/:id */}
//                       <Link
//                         to={`/courses/${c.id}`}
//                         className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
//                       >
//                         Xem chi tiết
//                       </Link>

//                       {/* Hủy ghi danh: /s/enrollments/:courseId/cancel-request */}
//                       <Link
//                         to={`/s/enrollments/${c.id}/cancel-request`}
//                         className="ml-auto rounded-xl border border-red-300 text-red-700 hover:bg-red-50 px-3 py-2 text-xs font-medium"
//                         title="Gửi yêu cầu hủy ghi danh"
//                       >
//                         Yêu cầu hủy
//                       </Link>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="border border-gray-200 rounded-2xl p-10 text-center text-gray-600">
//             Chưa có khóa học nào khớp bộ lọc. <Link to="/courses" className="text-blue-600 hover:text-blue-700">Khám phá khóa học</Link>
//           </div>
//         )}

//         {/* pagination */}
//         {filtered.length > 0 && (
//           <div className="mt-8 flex items-center justify-center gap-2">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={safePage === 1}
//               className={`px-3 py-2 rounded-lg text-sm font-medium border ${
//                 safePage === 1 ? "text-gray-300 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-50"
//               }`}
//               type="button"
//             >
//               ‹
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1)
//               .filter((p) => {
//                 if (totalPages <= 5) return true;
//                 if (p === 1 || p === totalPages) return true;
//                 return Math.abs(p - safePage) <= 2;
//               })
//               .map((p, idx, arr) => {
//                 const prev = arr[idx - 1];
//                 const gap = prev && p - prev > 1;
//                 return (
//                   <span key={`p-${p}`} className="inline-flex">
//                     {gap && <span className="px-2 text-gray-400">…</span>}
//                     <button
//                       onClick={() => setPage(p)}
//                       className={`px-3 py-2 rounded-lg text-sm font-medium ${
//                         p === safePage ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
//                       }`}
//                       type="button"
//                     >
//                       {p}
//                     </button>
//                   </span>
//                 );
//               })}
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={safePage === totalPages}
//               className={`px-3 py-2 rounded-lg text-sm font-medium border ${
//                 safePage === totalPages ? "text-gray-300 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-50"
//               }`}
//               type="button"
//             >
//               ›
//             </button>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }









































// src/pages/student/Enrollments.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* ============== CONFIG ============== */
const API_BASE = "http://localhost:5102/api/courses";

/* ============== HELPERS ============== */
const getStatus = (p) => (p >= 100 ? "Hoàn thành" : p > 0 ? "Đang học" : "Chưa học");
const statusStyle = (s) =>
  s === "Hoàn thành"
    ? "bg-green-100 text-green-700 border-green-200"
    : s === "Đang học"
    ? "bg-blue-100 text-blue-700 border-blue-200"
    : "bg-gray-100 text-gray-700 border-gray-200";

function Progress({ value }) {
  return (
    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-600"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* ============== PAGE ============== */
export default function Enrollments() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);
  const perPage = 8;

  /* ============== LOAD DATA ============== */
  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError("");
        // Giả định memberId = 1 (sẽ lấy từ token user sau)
        const res = await fetch(`${API_BASE}/1/enrollments`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setEnrollments(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Fetch enrollments error:", e);
          setError("Không tải được danh sách khóa học. Vui lòng thử lại sau.");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  /* ============== CANCEL ENROLLMENT ============== */
  async function handleCancel(courseId, enrollmentId) {
    if (!window.confirm("Bạn có chắc muốn gửi yêu cầu hủy ghi danh khóa học này?")) return;
    try {
      const res = await fetch(
        `${API_BASE}/${courseId}/enrollments/${enrollmentId}/cancel-request`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Đã gửi yêu cầu hủy ghi danh.");
      setEnrollments((prev) =>
        prev.filter((e) => e.id !== enrollmentId)
      );
    } catch (e) {
      alert("Không thể gửi yêu cầu. Vui lòng thử lại.");
      console.error(e);
    }
  }

  /* ============== FILTER / SORT / PAGINATE ============== */
  const filtered = useMemo(() => {
    let list = enrollments.slice();

    if (status !== "all") {
      list = list.filter((c) => {
        const st = getStatus(c.progress || 0);
        if (status === "completed") return st === "Hoàn thành";
        if (status === "studying") return st === "Đang học";
        if (status === "not") return st === "Chưa học";
        return true;
      });
    }

    const key = q.trim().toLowerCase();
    if (key) {
      list = list.filter(
        (c) =>
          c.courseTitle?.toLowerCase().includes(key) ||
          c.categoryName?.toLowerCase().includes(key)
      );
    }

    if (sort === "progress-desc") list.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    if (sort === "progress-asc") list.sort((a, b) => (a.progress || 0) - (b.progress || 0));
    if (sort === "recent") {
      list.sort((a, b) => {
        const da = Date.parse(a.lastAccess || "") || 0;
        const db = Date.parse(b.lastAccess || "") || 0;
        return db - da;
      });
    }

    return list;
  }, [enrollments, q, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  useEffect(() => {
    setPage(1);
  }, [q, status, sort]);

  /* ============== RENDER ============== */
  return (
    <div className="min-h-screen w-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Khóa học của tôi</h1>
          <p className="text-gray-700 mt-1">Xem tiến độ học, tiếp tục bài học và quản lý ghi danh.</p>

          {/* Controls */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm theo tên khóa học, danh mục…"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Trạng thái</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="studying">Đang học</option>
                <option value="completed">Hoàn thành</option>
                <option value="not">Chưa học</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sắp xếp</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Gần đây</option>
                <option value="progress-desc">% hoàn thành ↓</option>
                <option value="progress-asc">% hoàn thành ↑</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full px-6 lg:px-12 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[300px] rounded-2xl border bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-xl">
            {error}
          </div>
        ) : slice.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {slice.map((c) => {
              const st = getStatus(c.progress || 0);
              return (
                <article
                  key={c.enrollmentId || c.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition"
                >
                  <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                    {c.thumbnailUrl ? (
                      <img
                        src={c.thumbnailUrl}
                        alt={c.courseTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="grid place-items-center h-full text-gray-400 text-sm">
                        Ảnh khóa học
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">
                          {c.categoryName} • {c.lessonCount || 0} bài
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mt-1 line-clamp-2">
                          {c.courseTitle}
                        </h3>
                      </div>
                      <span
                        className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusStyle(
                          st
                        )}`}
                      >
                        {st}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{c.progress || 0}%</span>
                      </div>
                      <Progress value={c.progress || 0} />
                      <div className="mt-2 text-xs text-gray-500">
                        Lần học gần nhất:{" "}
                        <span className="font-medium text-gray-700">
                          {c.lastAccess
                            ? new Date(c.lastAccess).toLocaleString("vi-VN")
                            : "—"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => navigate(`/s/learning/${c.courseId}`)}
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium"
                        type="button"
                      >
                        {c.progress > 0 ? "Tiếp tục học" : "Bắt đầu học"}
                      </button>
                      <Link
                        to={`/courses/${c.courseId}`}
                        className="rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 px-4 py-2 text-sm font-medium"
                      >
                        Xem chi tiết
                      </Link>
                      <button
                        onClick={() => handleCancel(c.courseId, c.enrollmentId)}
                        className="ml-auto rounded-xl border border-red-300 text-red-700 hover:bg-red-50 px-3 py-2 text-xs font-medium"
                      >
                        Hủy ghi danh
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-gray-200 rounded-2xl p-10 text-center text-gray-600">
            Chưa có khóa học nào.{" "}
            <Link to="/courses" className="text-blue-600 hover:text-blue-700">
              Khám phá khóa học
            </Link>
          </div>
        )}

        {/* pagination */}
        {!loading && filtered.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                safePage === 1
                  ? "text-gray-300 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                if (totalPages <= 5) return true;
                if (p === 1 || p === totalPages) return true;
                return Math.abs(p - safePage) <= 2;
              })
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const gap = prev && p - prev > 1;
                return (
                  <span key={`p-${p}`} className="inline-flex">
                    {gap && <span className="px-2 text-gray-400">…</span>}
                    <button
                      onClick={() => setPage(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        p === safePage
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                safePage === totalPages
                  ? "text-gray-300 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              ›
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
