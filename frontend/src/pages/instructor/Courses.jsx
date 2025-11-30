// src/pages/instructor/Courses.jsx
"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Plus, Search, Filter, Edit, Rocket, FileClock, Users, ArrowUpDown,
  MoreVertical, Eye, Undo2, Copy, Download, CalendarRange, ChevronLeft, ChevronRight
} from "lucide-react";

/* ================= Mock data ================= */
const MOCK = [
  { id: 1, title: "React 18 Pro",           status: "published", enrolls: 1420, updated: "2025-11-06" },
  { id: 2, title: "Node.js RESTful API",    status: "published", enrolls: 980,  updated: "2025-11-04" },
  { id: 3, title: "SQL Practical for Dev",  status: "published", enrolls: 1240, updated: "2025-11-01" },
  { id: 4, title: "Kubernetes cơ bản",      status: "draft",     enrolls: 0,    updated: "2025-10-30" },
  { id: 5, title: "TypeScript Essentials",  status: "draft",     enrolls: 0,    updated: "2025-10-28" },
  { id: 6, title: "DevOps CI/CD",           status: "published", enrolls: 410,  updated: "2025-10-27" },
  { id: 7, title: "Docker từ A-Z",          status: "published", enrolls: 560,  updated: "2025-10-25" },
];

const BADGE = (s) =>
  s === "published"
    ? "bg-emerald-100 text-emerald-700"
    : "bg-gray-100 text-gray-700";

/* ================ Page ================ */
export default function InstructorCourses() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("updated_desc");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // derived list
  const filtered = useMemo(() => {
    let list = [...MOCK];

    if (q.trim()) {
      const k = q.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(k));
    }
    if (status !== "all") list = list.filter(c => c.status === status);

    list.sort((a, b) => {
      switch (sortBy) {
        case "title_asc":   return a.title.localeCompare(b.title);
        case "title_desc":  return b.title.localeCompare(a.title);
        case "enrolls_desc":return b.enrolls - a.enrolls;
        case "enrolls_asc": return a.enrolls - b.enrolls;
        case "updated_asc": return a.updated.localeCompare(b.updated);
        case "updated_desc":
        default:            return b.updated.localeCompare(a.updated);
      }
    });
    return list;
  }, [q, status, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const curPage = Math.min(page, totalPages);
  const pageData = filtered.slice((curPage - 1) * pageSize, curPage * pageSize);

  // top stats
  const stats = useMemo(() => {
    const pub = MOCK.filter(c => c.status === "published").length;
    const draft = MOCK.filter(c => c.status === "draft").length;
    const totalEnrolls = MOCK.reduce((s, c) => s + c.enrolls, 0);
    return { pub, draft, totalEnrolls, total: MOCK.length };
  }, []);

  const exportCSV = () => {
    const rows = [
      ["id","title","status","enrolls","updated"],
      ...filtered.map(c => [c.id, c.title, c.status, c.enrolls, c.updated]),
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "courses.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">📚 Khoá học đã tạo</h1>
            <p className="text-gray-600">Quản lý khoá học, trạng thái và cập nhật nội dung</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="rounded-xl border border-gray-300 hover:bg-gray-50 px-4 py-2 text-sm font-medium text-gray-800 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <Link
              to="/i/courses/new"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Tạo khoá học
            </Link>
          </div>
        </div>
      </section>

      <main className="w-full px-6 lg:px-12 py-8 space-y-8">
        {/* Mini stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border bg-white p-5">
            <div className="text-sm text-gray-600 flex items-center gap-2"><Users className="w-4 h-4" /> Tổng ghi danh</div>
            <div className="mt-2 text-2xl font-extrabold text-blue-700">{stats.totalEnrolls}</div>
            <div className="text-xs text-gray-500 mt-1">Trên {stats.total} khoá</div>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <div className="text-sm text-gray-600">Khoá đã publish</div>
            <div className="mt-2 text-2xl font-extrabold text-emerald-700">{stats.pub}</div>
            <div className="text-xs text-gray-500 mt-1">Đang mở ghi danh</div>
          </div>
          <div className="rounded-2xl border bg-white p-5">
            <div className="text-sm text-gray-600">Bản nháp</div>
            <div className="mt-2 text-2xl font-extrabold text-gray-900">{stats.draft}</div>
            <div className="text-xs text-gray-500 mt-1">Chờ xuất bản</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="rounded-2xl border bg-white p-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="relative xl:col-span-2">
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Tìm theo tên khoá…"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={status}
              onChange={(e) => { setStatus(e.target.value); setPage(1); }}
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="all">Trạng thái: Tất cả</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="updated_desc">Mới cập nhật</option>
              <option value="updated_asc">Cũ nhất</option>
              <option value="title_asc">Tên A → Z</option>
              <option value="title_desc">Tên Z → A</option>
              <option value="enrolls_desc">Ghi danh ↓</option>
              <option value="enrolls_asc">Ghi danh ↑</option>
            </select>
          </div>
        </div>

        {/* List (cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {pageData.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-600 border rounded-2xl py-10">
              Không có khoá học nào khớp bộ lọc hiện tại.
            </div>
          )}

          {pageData.map((c) => (
            <article key={c.id} className="rounded-2xl border bg-white p-5 hover:shadow-sm transition relative">
              {/* header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{c.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className={`px-2 py-1 rounded-full ${BADGE(c.status)}`}>{c.status}</span>
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" /> {c.enrolls} HV
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <FileClock className="w-4 h-4" /> {c.updated}
                    </span>
                  </div>
                </div>

                {/* quick menu (demo) */}
                <div className="relative group shrink-0">
                  <button className="rounded-lg border p-2 hover:bg-gray-50">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-lg hidden group-hover:block z-10">
                    <Link to={`/courses/${c.id}`} className="block px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Xem trang public
                    </Link>
                    {c.status === "draft" ? (
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
                        <Rocket className="w-4 h-4" /> Publish
                      </button>
                    ) : (
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
                        <Undo2 className="w-4 h-4" /> Chuyển Draft
                      </button>
                    )}
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center gap-2">
                      <Copy className="w-4 h-4" /> Duplicate
                    </button>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Link
                  to={`/i/courses/${c.id}/edit`}
                  className="rounded-lg border px-3 py-2 text-center hover:bg-gray-50 inline-flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" /> Sửa
                </Link>

                {c.status === "draft" ? (
                  <button className="rounded-lg border px-3 py-2 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" /> Publish
                  </button>
                ) : (
                  <Link
                    to={`/i/courses/${c.id}/lessons`}
                    className="rounded-lg border px-3 py-2 text-center hover:bg-gray-50"
                  >
                    Quản lý bài học
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={curPage === 1}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm ${
                curPage === 1 ? "text-gray-400 border-gray-200" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                if (totalPages <= 7) return true;
                if (p === 1 || p === totalPages) return true;
                return Math.abs(p - curPage) <= 2;
              })
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const ellipsis = prev && p - prev > 1;
                return (
                  <span key={p} className="inline-flex">
                    {ellipsis && <span className="px-2 text-gray-400">…</span>}
                    <button
                      onClick={() => setPage(p)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        p === curPage ? "bg-blue-600 text-white" : "border text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={curPage === totalPages}
              className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm ${
                curPage === totalPages ? "text-gray-400 border-gray-200" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


























