// src/pages/instructor/Dashboard.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen, Users, Star, TrendingUp, Plus,
  Eye, Edit, RefreshCcw, CheckCircle2, ArrowRight,
  Layers, Globe2, DollarSign, Loader2, AlertCircle
} from "lucide-react";
import { fetchInstructorCourses } from "../../api/courses.api";

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
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchInstructorCourses({ pageSize: 100 });

      if (response && response.data) {
        const list = response.data.courses || response.data.items || response.data || [];
        setCourses(Array.isArray(list) ? list : []);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error("Error loading courses:", err);
      setError("Không thể tải danh sách khóa học. Vui lòng thử lại.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // KPIs
  const kpi = useMemo(() => {
    const total = courses.length;
    const published = courses.filter(c => c.status === "Published").length;
    const draft = total - published;
    const totalEnrolls = courses.reduce((s, c) => s + (c.totalEnrollments || 0), 0);
    const avgRating = (() => {
      const rated = courses.filter(c => (c.reviewCount || 0) > 0);
      if (!rated.length) return 0;
      const sum = rated.reduce((s, c) => s + (c.averageRating || 0), 0);
      return +(sum / rated.length).toFixed(1);
    })();
    const estRevenue = courses.reduce((s, c) => s + (c.totalEnrollments || 0) * (c.discountPrice || c.price || 0), 0);
    return { total, published, draft, totalEnrolls, avgRating, estRevenue };
  }, [courses]);

  // Series giả để vẽ sparkline tăng trưởng enrolls 12 mốc
  const growthSeries = useMemo(() => {
    if (courses.length === 0) return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // Tạo growth series dựa trên số lượng enrollments
    const max = Math.max(kpi.totalEnrolls, 100);
    const step = max / 12;
    return Array.from({ length: 12 }, (_, i) => Math.min(100, ((i + 1) * step / max) * 100));
  }, [courses, kpi.totalEnrolls]);

  const sparkPath = useMemo(() => buildSparkPath(growthSeries), [growthSeries]);

  // Sort courses theo cập nhật gần đây
  const recentCourses = useMemo(
    () => [...courses].sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")).slice(0, 5),
    [courses]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">📊 Bảng điều khiển giảng viên</h1>
            <p className="text-gray-600">Tổng quan khóa học, ghi danh và đánh giá của bạn.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/i/courses/new" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Tạo khóa mới
            </Link>
            <Link to="/i/courses" className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Quản lý khóa
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full px-6 lg:px-12 py-8 space-y-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">{error}</p>
              <button onClick={loadCourses} className="text-sm text-red-700 hover:text-red-800 underline mt-1">
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPI icon={<Layers className="w-4 h-4" />} label="Tổng khóa" value={kpi.total} tone="slate" />
          <KPI icon={<Globe2 className="w-4 h-4" />} label="Published" value={kpi.published} tone="emerald" />
          <KPI icon={<Edit className="w-4 h-4" />} label="Draft" value={kpi.draft} tone="amber" />
          <KPI icon={<Users className="w-4 h-4" />} label="Tổng ghi danh" value={kpi.totalEnrolls} tone="blue" />
          <KPI icon={<Star className="w-4 h-4" />} label="Rating TB" value={kpi.avgRating || "—"} suffix={kpi.avgRating ? "/5" : ""} tone="violet" />
          <KPI icon={<DollarSign className="w-4 h-4" />} label="Doanh thu ước tính" value={kpi.estRevenue > 0 ? currency(kpi.estRevenue) : "—"} tone="emerald" />
        </div>

        {/* Growth line + Recent courses */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.9fr] gap-8">
          {/* Growth & recent courses */}
          <section className="space-y-6">
            {kpi.totalEnrolls > 0 && (
              <div className="rounded-2xl border bg-white p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-gray-900 inline-flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Xu hướng ghi danh
                  </div>
                  <div className="text-xs text-gray-600">{kpi.totalEnrolls} học viên</div>
                </div>
                <Spark path={sparkPath} big />
              </div>
            )}

            {/* Recent courses */}
            <div className="rounded-2xl border bg-white overflow-hidden">
              <div className="px-5 py-4 border-b flex items-center justify-between">
                <div className="text-lg font-bold text-gray-900">Khóa học cập nhật gần đây</div>
                <Link to="/i/courses" className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  Tất cả <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y">
                {recentCourses.length > 0 ? (
                  recentCourses.map(c => (
                    <div key={c.id} className="px-5 py-4 flex items-center gap-4">
                      <div className="w-28 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {c.thumbnailUrl ? (
                          <img src={c.thumbnailUrl} alt={c.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <BookOpen className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">{c.title}</div>
                        <div className="text-xs text-gray-600 flex flex-wrap items-center gap-2 mt-0.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${c.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {c.status}
                          </span>
                          {c.categoryName && <><span>•</span><span>{c.categoryName}</span></>}
                          <span>•</span>
                          <span>Cập nhật {fmt(c.updatedAt)}</span>
                          {(c.totalEnrollments || 0) > 0 && (
                            <>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.totalEnrollments}</span>
                            </>
                          )}
                          {(c.reviewCount || 0) > 0 && (
                            <>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {c.averageRating?.toFixed(1)} ({c.reviewCount})</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Link to={`/courses/${c.id}`} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 inline-flex items-center gap-1">
                          <Eye className="w-4 h-4" /> Xem
                        </Link>
                        <Link to={`/i/courses/${c.id}/edit`} className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 inline-flex items-center gap-1">
                          <Edit className="w-4 h-4" /> Sửa
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Bạn chưa có khóa học nào</p>
                    <Link to="/i/courses/new" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold">
                      <Plus className="w-4 h-4" /> Tạo khóa học đầu tiên
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right column: Quick actions & Info */}
          <aside className="space-y-6">
            {/* Quick actions */}
            <div className="rounded-2xl border bg-white p-5">
              <div className="text-sm font-bold text-gray-900 mb-3">Hành động nhanh</div>
              <div className="space-y-2">
                <Link to="/i/courses/new" className="w-full rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> Tạo khóa mới
                </Link>
                <Link to="/i/courses" className="w-full rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4" /> Danh sách khóa
                </Link>
                <Link to="/i/exams" className="w-full rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Quản lý bài thi
                </Link>
              </div>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-5">
              <div className="text-sm font-bold text-gray-900 mb-2">💡 Mẹo cho giảng viên</div>
              <ul className="text-xs text-gray-700 space-y-2">
                <li>• Cập nhật nội dung thường xuyên để thu hút học viên</li>
                <li>• Phản hồi đánh giá để cải thiện chất lượng</li>
                <li>• Thêm bài tập và quiz để tăng tương tác</li>
                <li>• Sử dụng thumbnail hấp dẫn cho khóa học</li>
              </ul>
            </div>

            {/* Stats summary */}
            {courses.length > 0 && (
              <div className="rounded-2xl border bg-white p-5">
                <div className="text-sm font-bold text-gray-900 mb-3">Thống kê nhanh</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khóa xuất bản:</span>
                    <span className="font-semibold text-green-600">{kpi.published}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khóa nháp:</span>
                    <span className="font-semibold text-amber-600">{kpi.draft}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng học viên:</span>
                    <span className="font-semibold text-blue-600">{kpi.totalEnrolls}</span>
                  </div>
                  {kpi.avgRating > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Đánh giá TB:</span>
                      <span className="font-semibold text-violet-600">{kpi.avgRating}/5 ⭐</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </aside>
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
