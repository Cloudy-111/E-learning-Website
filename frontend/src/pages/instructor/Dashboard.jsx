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
