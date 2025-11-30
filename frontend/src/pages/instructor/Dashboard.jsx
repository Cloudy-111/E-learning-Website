// // src/pages/instructor/Dashboard.jsx
// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import {
//   Users, BookOpen, Star, DollarSign, TrendingUp, Clock, ArrowUpRight,
//   CalendarRange, Download, BarChart3, UserPlus, MessageSquare, Sparkles,
//   CheckCircle2, AlertTriangle
// } from "lucide-react";

// /** ================= Mock data (demo) ================= */
// const REVENUE_SERIES = {
//   "7d": [2.4, 3.2, 2.9, 4.1, 3.6, 5.0, 4.5],
//   "30d": [2.1,2.6,2.2,2.8,3.1,2.9,3.5,3.0,3.8,3.6,4.0,3.9,4.4,4.2,3.7,4.1,4.8,4.5,4.9,5.1,4.7,4.3,4.9,5.3,5.0,5.4,5.6,5.2,5.7,6.1],
//   "90d": Array.from({length: 90}, (_,i)=> 2 + Math.sin(i/6)*1.2 + i*0.03) // xu hướng tăng nhẹ
// };

// const RECENT_ORDERS = [
//   { id: "ORD-98231", course: "React 18 Pro", student: "Lê Minh", date: "06/11", price: 990000 },
//   { id: "ORD-98222", course: "Node.js RESTful API", student: "Nguyễn Hoa", date: "05/11", price: 890000 },
//   { id: "ORD-98211", course: "SQL Practical", student: "Phạm Tuấn", date: "05/11", price: 590000 },
//   { id: "ORD-98202", course: "K8s cơ bản", student: "Thuỷ Tiên", date: "04/11", price: 990000 },
// ];

// const COURSES = [
//   { id: 1, title: "React 18 Pro", enrolls: 1420, progress: 78, rating: 4.8 },
//   { id: 2, title: "Node.js RESTful", enrolls: 980, progress: 56, rating: 4.5 },
//   { id: 3, title: "SQL Practical", enrolls: 1240, progress: 92, rating: 4.7 },
//   { id: 4, title: "K8s cơ bản", enrolls: 410, progress: 33, rating: 4.4 },
// ];

// const EVENTS = [
//   { type: "review",  time: "2h trước", text: "Trần Hải để lại review 5★ cho “React 18 Pro”" },
//   { type: "enroll",  time: "5h trước", text: "3 học viên mới ghi danh “Node.js RESTful”" },
//   { type: "issue",   time: "Hôm qua",  text: "Báo cáo: tỉ lệ rớt bài quiz Ch.2 tăng 18%" },
//   { type: "content", time: "Hôm qua",  text: "Xuất bản bài học mới: “Window functions – Part 2”" },
// ];

// const RATINGS_DIST = { 5: 62, 4: 27, 3: 7, 2: 3, 1: 1 }; // %

// /** helpers */
// const nf = new Intl.NumberFormat("vi-VN");
// const money = (v) => nf.format(v) + "đ";

// /** Mini sparkline (SVG) */
// function Sparkline({ data = [], height = 42 }) {
//   const w = 140;
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const toXY = (v, i) => {
//     const x = (i / (data.length - 1)) * w;
//     const y = height - ((v - min) / Math.max(1e-9, max - min)) * height;
//     return `${x},${y}`;
//     };
//   const points = data.map(toXY).join(" ");
//   return (
//     <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`}>
//       <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
//     </svg>
//   );
// }

// export default function InstructorDashboard() {
//   useEffect(() => window.scrollTo(0, 0), []);
//   const [range, setRange] = useState("30d"); // 7d | 30d | 90d

//   const revenue = useMemo(() => {
//     const arr = REVENUE_SERIES[range] || [];
//     const sum = arr.reduce((s, v) => s + v, 0) * 1_000_000; // triệu → VND
//     const mom = ((arr.at(-1) - arr[0]) / Math.max(1e-9, arr[0])) * 100;
//     return { arr, sum, mom: Math.round(mom * 10) / 10 };
//   }, [range]);

//   const agg = useMemo(() => {
//     const newStudents = 182;
//     const avgRating =
//       Math.round(
//         (Object.entries(RATINGS_DIST).reduce((s, [k, p]) => s + +k * (p / 100), 0)) * 100
//       ) / 100;
//     return {
//       monthRevenue: money(revenue.sum),
//       newStudents,
//       activeCourses: COURSES.length,
//       avgRating,
//     };
//   }, [revenue.sum]);

//   const exportOrdersCSV = () => {
//     const header = ["id", "course", "student", "date", "price"];
//     const rows = RECENT_ORDERS.map((o) => [o.id, o.course, o.student, o.date, o.price]);
//     const csv = [header, ...rows].map(r => r.join(",")).join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url; a.download = "recent-orders.csv"; a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen w-screen max-w-none bg-white">
//       <Header />

//       {/* Hero */}
//       <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
//         <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">📊 Dashboard giảng viên</h1>
//             <p className="text-gray-600">Tổng quan doanh thu, ghi danh, ratings và hoạt động gần đây</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <CalendarRange className="w-4 h-4 text-gray-700" />
//             <select
//               value={range}
//               onChange={(e) => (setRange(e.target.value))}
//               className="rounded-xl border border-gray-300 px-3 py-2 text-sm bg-white"
//             >
//               <option value="7d">7 ngày</option>
//               <option value="30d">30 ngày</option>
//               <option value="90d">90 ngày</option>
//             </select>
//           </div>
//         </div>
//       </section>

//       <main className="w-full px-6 lg:px-12 py-8 space-y-8">
//         {/* ============ Top Stats ============ */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//           <div className="rounded-2xl border bg-white p-5">
//             <div className="text-sm text-gray-600 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Doanh thu {range}</div>
//             <div className="mt-2 text-2xl font-extrabold text-emerald-700">{agg.monthRevenue}</div>
//             <div className="mt-2 flex items-center justify-between">
//               <span className={`text-xs font-medium ${revenue.mom >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
//                 <ArrowUpRight className="inline w-4 h-4 mr-1" />
//                 {revenue.mom >= 0 ? "+" : ""}{revenue.mom}% so với đầu kỳ
//               </span>
//               <span className="text-gray-400"><Sparkline data={revenue.arr} /></span>
//             </div>
//           </div>

//           <div className="rounded-2xl border bg-white p-5">
//             <div className="text-sm text-gray-600 flex items-center gap-2"><Users className="w-4 h-4" /> Học viên mới</div>
//             <div className="mt-2 text-2xl font-extrabold text-blue-700">182</div>
//             <div className="text-xs text-gray-500 mt-1">+9% MoM</div>
//           </div>

//           <div className="rounded-2xl border bg-white p-5">
//             <div className="text-sm text-gray-600 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Khoá học đang bán</div>
//             <div className="mt-2 text-2xl font-extrabold text-indigo-700">{agg.activeCourses}</div>
//             <div className="text-xs text-gray-500 mt-1">3 khoá ở trạng thái draft</div>
//           </div>

//           <div className="rounded-2xl border bg-white p-5">
//             <div className="text-sm text-gray-600 flex items-center gap-2"><Star className="w-4 h-4" /> Điểm đánh giá TB</div>
//             <div className="mt-2 text-2xl font-extrabold text-amber-700">{agg.avgRating}</div>
//             <div className="text-xs text-gray-500 mt-1">2.1k reviews</div>
//           </div>
//         </div>

//         {/* ============ Revenue + Rating Distribution ============ */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
//           {/* Revenue Panel */}
//           <div className="rounded-2xl border bg-white p-5">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold text-gray-900">Doanh thu theo ngày</h2>
//               <span className="text-xs text-gray-500">{REVENUE_SERIES[range].length} điểm dữ liệu</span>
//             </div>

//             {/* Simple area-like chart via bars */}
//             <div className="mt-4 h-28 flex items-end gap-1">
//               {REVENUE_SERIES[range].map((v, i) => (
//                 <div
//                   key={i}
//                   className="rounded-t bg-blue-600/80"
//                   style={{
//                     height: `${(v / Math.max(...REVENUE_SERIES[range])) * 100}%`,
//                     width: "10px",
//                   }}
//                   title={`${v.toFixed(2)} triệu`}
//                 />
//               ))}
//             </div>

//             <div className="mt-3 text-xs text-gray-600">
//               Tổng {range}: <span className="font-semibold text-gray-900">{agg.monthRevenue}</span>
//             </div>
//           </div>

//           {/* Ratings distribution */}
//           <div className="rounded-2xl border bg-white p-5">
//             <h2 className="text-lg font-bold text-gray-900">Phân phối đánh giá</h2>
//             <div className="mt-4 space-y-2">
//               {[5,4,3,2,1].map((k) => (
//                 <div key={k} className="flex items-center gap-3 text-sm">
//                   <span className="w-8 text-right">{k}★</span>
//                   <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-amber-400" style={{ width: `${RATINGS_DIST[k]}%` }} />
//                   </div>
//                   <span className="w-12 text-right text-gray-700">{RATINGS_DIST[k]}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ============ Recent sales + Courses performance ============ */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
//           {/* Recent orders */}
//           <div className="rounded-2xl border bg-white p-5">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold text-gray-900">Giao dịch gần đây</h2>
//               <button
//                 onClick={exportOrdersCSV}
//                 className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50 inline-flex items-center gap-2"
//               >
//                 <Download className="w-4 h-4" /> Export
//               </button>
//             </div>
//             <div className="mt-4 divide-y text-sm">
//               {RECENT_ORDERS.map((o) => (
//                 <div key={o.id} className="py-3 flex items-center justify-between">
//                   <div className="min-w-0">
//                     <div className="font-medium text-gray-900 truncate">{o.course}</div>
//                     <div className="text-xs text-gray-600">#{o.id} • {o.student}</div>
//                   </div>
//                   <div className="text-right shrink-0">
//                     <div className="font-semibold text-gray-900">{money(o.price)}</div>
//                     <div className="text-xs text-gray-500">{o.date}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Course performance */}
//           <div className="rounded-2xl border bg-white p-5">
//             <h2 className="text-lg font-bold text-gray-900">Khoá học nổi bật</h2>
//             <div className="mt-4 grid gap-3">
//               {COURSES.map((c) => (
//                 <div key={c.id} className="border rounded-xl p-3">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="font-medium text-gray-800">{c.title}</span>
//                     <span className="text-gray-600">{c.enrolls} HV</span>
//                   </div>
//                   <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-blue-600" style={{ width: `${c.progress}%` }} />
//                   </div>
//                   <div className="mt-1 text-xs text-gray-600 flex items-center justify-between">
//                     <span>{c.progress}% hoàn thiện nội dung</span>
//                     <span className="inline-flex items-center gap-1 text-amber-700">
//                       <Star className="w-3.5 h-3.5" /> {c.rating}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ============ Activity + Goals ============ */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
//           {/* Activity timeline */}
//           <div className="rounded-2xl border bg-white p-5">
//             <h2 className="text-lg font-bold text-gray-900">Hoạt động gần đây</h2>
//             <div className="mt-4 space-y-3 text-sm">
//               {EVENTS.map((e, i) => (
//                 <div key={i} className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     {e.type === "review" && <Star className="w-4 h-4 text-amber-600" />}
//                     {e.type === "enroll" && <UserPlus className="w-4 h-4 text-blue-600" />}
//                     {e.type === "issue" && <AlertTriangle className="w-4 h-4 text-rose-600" />}
//                     {e.type === "content" && <BarChart3 className="w-4 h-4 text-indigo-600" />}
//                   </div>
//                   <div>
//                     <div className="text-gray-900">{e.text}</div>
//                     <div className="text-xs text-gray-500">{e.time}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Goals / suggestions */}
//           <div className="rounded-2xl border bg-white p-5">
//             <div className="flex items-center gap-2">
//               <TrendingUp className="w-4 h-4 text-emerald-700" />
//               <h2 className="text-lg font-bold text-gray-900">Gợi ý & mục tiêu</h2>
//             </div>

//             <ul className="mt-3 text-sm text-gray-700 space-y-2">
//               <li>• “Node.js RESTful” có tỉ lệ hoàn thành thấp. Hãy chia nhỏ bài Ch.3 và thêm ví dụ.</li>
//               <li>• Thêm 10 câu quiz tổng kết cho “React 18 Pro” để tăng tương tác.</li>
//               <li>• Trả lời 4 review chưa phản hồi trong 48 giờ qua.</li>
//             </ul>

//             <div className="mt-4 grid gap-3">
//               <div className="border rounded-xl p-3">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="font-medium text-gray-800">Mục tiêu doanh thu tháng</span>
//                   <span className="text-gray-600">80%</span>
//                 </div>
//                 <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-emerald-600" style={{ width: "80%" }} />
//                 </div>
//               </div>
//               <div className="border rounded-xl p-3">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="font-medium text-gray-800">Phản hồi review trong 24h</span>
//                   <span className="text-gray-600">60%</span>
//                 </div>
//                 <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-blue-600" style={{ width: "60%" }} />
//                 </div>
//               </div>
//               <div className="border rounded-xl p-3">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="font-medium text-gray-800">Xuất bản khoá “TS Essentials”</span>
//                   <span className="text-gray-600">Đang thực hiện</span>
//                 </div>
//                 <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full bg-indigo-600" style={{ width: "45%" }} />
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">
//               <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
//                 <MessageSquare className="w-4 h-4" /> Tạo post thông báo
//               </button>
//               <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4" /> Đánh dấu hoàn thành
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }





























// src/pages/instructor/Dashboard.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  BookOpen, Users, Gauge, Award, Star, TrendingUp, CalendarDays, Plus,
  Eye, Edit, Download, RefreshCcw, CheckCircle2, XCircle, Clock, ArrowRight,
  BarChart3, Layers, Globe2, DollarSign
} from "lucide-react";

/**
 * Instructor Dashboard
 * - Hiển thị KPI: tổng khoá, published/draft, tổng enroll, rating TB (giả lập), doanh thu ước tính
 * - Danh sách khoá mới cập nhật gần đây
 * - Ghi danh gần đây
 * - Đánh giá gần đây
 * - Yêu cầu xuất bản/cập nhật đang chờ xử lý
 * - Quick links
 *
 * Mọi datetime đều theo ISO để bám chuẩn API bạn đã cung cấp.
 */

// ===== Mock data (đặt đúng format ISO) =====
const MOCK_COURSES = [
  {
    id: "0ce5a138-3c42-4aca-a077-c32997a32d54",
    title: "React 18 Pro — Hooks, Router, Performance",
    status: "published",
    thumbnailUrl: "https://picsum.photos/320/180?image=1069",
    createdAt: "2025-04-19T00:46:43.3209032",
    updatedAt: "2025-11-10T04:23:03.7491162",
    price: 45.15,
    discountPrice: 39.93,
    categoryName: "Frontend Web",
    averageRating: 4.7,
    reviewCount: 128,
    enrolls: 1420,
  },
  {
    id: "db-sql-111",
    title: "SQL Practical for Dev",
    status: "published",
    thumbnailUrl: "https://picsum.photos/320/180?image=1080",
    createdAt: "2025-05-01T11:22:03.0000000",
    updatedAt: "2025-11-01T08:12:44.0000000",
    price: 29.9,
    discountPrice: 24.9,
    categoryName: "Database",
    averageRating: 4.3,
    reviewCount: 86,
    enrolls: 1240,
  },
  {
    id: "ts-ess-222",
    title: "TypeScript Essentials",
    status: "draft",
    thumbnailUrl: "https://picsum.photos/320/180?image=1015",
    createdAt: "2025-10-09T07:00:00.0000000",
    updatedAt: "2025-10-28T09:55:10.0000000",
    price: 25.0,
    discountPrice: 19.0,
    categoryName: "Frontend Web",
    averageRating: 0,
    reviewCount: 0,
    enrolls: 0,
  },
  {
    id: "devops-333",
    title: "DevOps CI/CD",
    status: "published",
    thumbnailUrl: "https://picsum.photos/320/180?image=1036",
    createdAt: "2025-09-01T16:00:00.0000000",
    updatedAt: "2025-10-27T10:20:22.0000000",
    price: 39.0,
    discountPrice: 31.0,
    categoryName: "DevOps",
    averageRating: 4.5,
    reviewCount: 54,
    enrolls: 410,
  },
];

const MOCK_ENROLLMENTS_RECENT = [
  { id: "enr-9001", courseId: MOCK_COURSES[0].id, courseTitle: MOCK_COURSES[0].title, user: "Lê Minh", at: "2025-11-10T11:04:22.0000000" },
  { id: "enr-9002", courseId: MOCK_COURSES[1].id, courseTitle: MOCK_COURSES[1].title, user: "Nguyễn Hoa", at: "2025-11-10T09:35:10.0000000" },
  { id: "enr-9003", courseId: MOCK_COURSES[3].id, courseTitle: MOCK_COURSES[3].title, user: "Phạm Tuấn", at: "2025-11-09T20:12:01.0000000" },
];

const MOCK_REVIEWS_RECENT = [
  { id: "rv-7001", courseId: MOCK_COURSES[0].id, courseTitle: MOCK_COURSES[0].title, user: "Đỗ Lộc", rating: 5, text: "Khoá rất thực tế, phần hook rõ ràng.", at: "2025-11-09T13:55:00.0000000" },
  { id: "rv-7002", courseId: MOCK_COURSES[1].id, courseTitle: MOCK_COURSES[1].title, user: "Bùi Nga", rating: 4, text: "Nội dung chắc, thêm bài tập là tuyệt.", at: "2025-11-08T18:20:00.0000000" },
];

const MOCK_REQUESTS_PENDING = [
  // Course publish
  { id: "REQ-101", scope: "course", action: "request-publish", title: MOCK_COURSES[0].title, relatedId: MOCK_COURSES[0].id, status: "pending", createdAt: "2025-11-06T08:22:41.0000000" },
  // Lesson update
  { id: "REQ-301", scope: "lesson", action: "request-update", title: "Lesson: useState & useEffect cơ bản", relatedId: "ls-1202", status: "pending", createdAt: "2025-11-05T19:03:00.0000000" },
];

// ===== Helpers =====
const fmt = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("vi-VN", { hour12: false });
};

const currency = (v) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(v * 1000);

// sparkline path (0–100)
function buildSparkPath(series, w = 120, h = 36) {
  if (!series?.length) return "";
  const step = w / (series.length - 1);
  const points = series.map((v, i) => {
    const x = i * step;
    const y = h - (h * v) / 100;
    return `${x},${y}`;
  });
  return `M ${points[0]} L ${points.slice(1).join(" ")}`;
}

// ===== Page =====
export default function InstructorDashboard() {
  const [courses, setCourses] = useState(MOCK_COURSES);
  const [enrolls, setEnrolls] = useState(MOCK_ENROLLMENTS_RECENT);
  const [reviews, setReviews] = useState(MOCK_REVIEWS_RECENT);
  const [requests, setRequests] = useState(MOCK_REQUESTS_PENDING);

  useEffect(() => window.scrollTo(0, 0), []);

  // KPIs
  const kpi = useMemo(() => {
    const total = courses.length;
    const published = courses.filter(c => c.status === "published").length;
    const draft = total - published;
    const totalEnrolls = courses.reduce((s, c) => s + (c.enrolls || 0), 0);
    const avgRating = (() => {
      const rated = courses.filter(c => c.reviewCount > 0);
      if (!rated.length) return 0;
      const sum = rated.reduce((s, c) => s + c.averageRating, 0);
      return +(sum / rated.length).toFixed(2);
    })();
    // Doanh thu ước tính đơn giản (enrolls * discountPrice * 1k) — chỉ để hiển thị mock
    const estRevenue = courses.reduce((s, c) => s + (c.enrolls || 0) * (c.discountPrice || c.price || 0), 0);
    return { total, published, draft, totalEnrolls, avgRating, estRevenue };
  }, [courses]);

  // Series giả để vẽ sparkline tăng trưởng enrolls 12 mốc
  const growthSeries = useMemo(() => [35, 41, 47, 50, 55, 61, 64, 70, 73, 78, 82, 87], []);
  const sparkPath = useMemo(() => buildSparkPath(growthSeries), [growthSeries]);

  // Sort courses theo cập nhật gần đây
  const recentCourses = useMemo(
    () => [...courses].sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")).slice(0, 5),
    [courses]
  );

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">📊 Bảng điều khiển giảng viên</h1>
            <p className="text-gray-600">Tổng quan khoá, ghi danh, đánh giá và yêu cầu đang chờ xử lý.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/i/courses/new" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tạo khoá mới
            </Link>
            <Link to="/i/courses" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Quản lý khoá
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full px-6 lg:px-12 py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPI icon={<Layers className="w-4 h-4" />} label="Tổng khoá" value={kpi.total} tone="slate" />
          <KPI icon={<Globe2 className="w-4 h-4" />} label="Published" value={kpi.published} tone="emerald" />
          <KPI icon={<Edit className="w-4 h-4" />} label="Draft" value={kpi.draft} tone="amber" />
          <KPI icon={<Users className="w-4 h-4" />} label="Tổng ghi danh" value={kpi.totalEnrolls} tone="blue" />
          <KPI icon={<Star className="w-4 h-4" />} label="Rating TB" value={kpi.avgRating} suffix="/5" tone="violet" />
          <KPI icon={<DollarSign className="w-4 h-4" />} label="Ước tính doanh thu" value={currency(kpi.estRevenue)} tone="emerald" />
        </div>

        {/* Growth line + Quick links */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-8">
          {/* Growth & recent courses */}
          <section className="space-y-6">
            <div className="rounded-2xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-gray-900 inline-flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Tăng trưởng ghi danh (giả lập 12 mốc)
                </div>
                <div className="text-xs text-gray-600">Từ {growthSeries[0]}% → {growthSeries.at(-1)}%</div>
              </div>
              <Spark path={sparkPath} big />
            </div>

            {/* Recent courses */}
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-5 py-4 border-b flex items-center justify-between">
                <div className="text-lg font-bold text-gray-900">Khoá học cập nhật gần đây</div>
                <Link to="/i/courses" className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  Tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y">
                {recentCourses.map(c => (
                  <div key={c.id} className="px-5 py-4 flex items-center gap-4">
                    <div className="w-28 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line jsx-a11y/alt-text */}
                      <img src={c.thumbnailUrl} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">{c.title}</div>
                      <div className="text-xs text-gray-600 flex flex-wrap items-center gap-3 mt-0.5">
                        <span>{c.categoryName}</span>
                        <span>•</span>
                        <span>Cập nhật {fmt(c.updatedAt)}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.enrolls} HV</span>
                        {c.reviewCount > 0 && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {c.averageRating} ({c.reviewCount})</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={`/courses/${c.id}`} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 inline-flex items-center gap-1">
                        <Eye className="w-4 h-4" /> Xem public
                      </Link>
                      <Link to={`/i/courses/${c.id}/edit`} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 inline-flex items-center gap-1">
                        <Edit className="w-4 h-4" /> Sửa
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right column: activity + requests */}
          <aside className="space-y-6">
            {/* Recent enrollments */}
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-5 py-4 border-b text-lg font-bold text-gray-900">Ghi danh gần đây</div>
              <div className="divide-y">
                {enrolls.map(e => (
                  <div key={e.id} className="px-5 py-3 text-sm">
                    <div className="font-medium text-gray-900">{e.user}</div>
                    <div className="text-xs text-gray-600">
                      Đăng ký: <Link to={`/courses/${e.courseId}`} className="text-blue-600 hover:text-blue-700">{e.courseTitle}</Link> • {fmt(e.at)}
                    </div>
                  </div>
                ))}
                {enrolls.length === 0 && <div className="px-5 py-6 text-sm text-gray-600">Chưa có ghi danh mới.</div>}
              </div>
            </div>

            {/* Recent reviews */}
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-5 py-4 border-b text-lg font-bold text-gray-900">Đánh giá gần đây</div>
              <div className="divide-y">
                {reviews.map(r => (
                  <div key={r.id} className="px-5 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{r.user}</div>
                      <div className="inline-flex items-center gap-1 text-amber-600">
                        {Array.from({ length: r.rating }, (_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">Về khoá: <Link to={`/courses/${r.courseId}`} className="text-blue-600 hover:text-blue-700">{r.courseTitle}</Link> • {fmt(r.at)}</div>
                    <div className="mt-1 text-gray-800">{r.text}</div>
                  </div>
                ))}
                {reviews.length === 0 && <div className="px-5 py-6 text-sm text-gray-600">Chưa có đánh giá mới.</div>}
              </div>
            </div>

            {/* Pending requests */}
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-5 py-4 border-b flex items-center justify-between">
                <div className="text-lg font-bold text-gray-900">Yêu cầu đang chờ</div>
                <Link to="/i/requests" className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  Quản lý <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y">
                {requests.map(r => (
                  <div key={r.id} className="px-5 py-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{r.title}</div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">pending</span>
                    </div>
                    <div className="text-xs text-gray-600 inline-flex items-center gap-2 mt-1">
                      {r.action === "request-publish" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <RefreshCcw className="w-3.5 h-3.5" />}
                      {r.action === "request-publish" ? "Xuất bản" : "Cập nhật"} • {fmt(r.createdAt)}
                    </div>
                  </div>
                ))}
                {requests.length === 0 && <div className="px-5 py-6 text-sm text-gray-600">Không có yêu cầu đang chờ.</div>}
              </div>
            </div>
          </aside>
        </div>

        {/* Quick links */}
        <div className="rounded-2xl border bg-white p-5">
          <div className="text-sm font-bold text-gray-900 mb-3">Liên kết nhanh</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <Link to="/i/courses/new" className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tạo khoá mới
            </Link>
            <Link to="/i/courses" className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Danh sách khoá
            </Link>
            <Link to="/i/requests" className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Yêu cầu cập nhật/xuất bản
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ===== Small UI pieces ===== */
function KPI({ icon, label, value, suffix = "", tone = "slate" }) {
  const toneMap = {
    slate: "text-slate-700",
    blue: "text-blue-700",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    violet: "text-violet-700",
  };
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="text-xs text-gray-600 inline-flex items-center gap-2">{icon}{label}</div>
      <div className={`mt-1 text-xl md:text-2xl font-extrabold ${toneMap[tone] || toneMap.slate}`}>
        {value}{suffix}
      </div>
    </div>
  );
}

function Spark({ path, big = false }) {
  const W = big ? 340 : 120;
  const H = big ? 96 : 36;
  return (
    <svg width={W} height={H} viewBox="0 0 120 36" className="mt-3 text-blue-600">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
