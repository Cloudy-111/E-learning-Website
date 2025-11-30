// src/pages/student/MyEnrollments.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Loader2, AlertCircle } from "lucide-react";

/**
 * BẮT BUỘC: API trả date theo ISO string (ví dụ: "2025-11-10T04:23:03.7491162")
 * -> ta parse bằng new Date(iso).toLocaleString("vi-VN") khi hiển thị.
 */
const API_BASE = "http://localhost:5102";

/** Fallback demo từ localStorage: key "my_enrollments"
 * Mỗi item: { courseId, title, thumbnailUrl, categoryName, progress (0-100), lastAccessISO }
 */
function getLocalEnrollments() {
  try {
    const raw = localStorage.getItem("my_enrollments");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function setLocalEnrollment(enr) {
  try {
    const cur = getLocalEnrollments();
    const i = cur.findIndex((x) => x.courseId === enr.courseId);
    const next = i >= 0 ? (cur[i] = enr, [...cur]) : [...cur, enr];
    localStorage.setItem("my_enrollments", JSON.stringify(next));
  } catch {}
}

const statusOf = (p) => (p >= 100 ? "Hoàn thành" : p > 0 ? "Đang học" : "Chưa học");
const statusClass = (s) =>
  s === "Hoàn thành"
    ? "bg-green-100 text-green-700 border-green-200"
    : s === "Đang học"
    ? "bg-blue-100 text-blue-700 border-blue-200"
    : "bg-gray-100 text-gray-700 border-gray-200";

function Progress({ value }) {
  const pct = Math.min(100, Math.max(0, Number(value || 0)));
  return (
    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-blue-600" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function MyEnrollments() {
  const navigate = useNavigate();

  // UI state
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all"); // all | studying | completed | not
  const [sort, setSort] = useState("recent"); // recent | progress-desc | progress-asc
  const [page, setPage] = useState(1);
  const perPage = 8;

  // data state
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // NOTE: API hiện có: GET api/courses/{courseId}/enrollments (theo khóa)
  // chưa có endpoint “my enrollments” => ta thử gọi giả định /api/me/enrollments.
  // Nếu 404/500 → fallback localStorage.
  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      setLoading(true);
      setErr("");
      try {
        // Thử endpoint “chuẩn” cho học viên (nếu backend của bạn đã làm):
        const res = await fetch(`${API_BASE}/api/me/enrollments`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Chuẩn hoá về format dùng trong UI
        const normalized = (Array.isArray(data) ? data : []).map((e) => ({
          courseId: e.courseId,
          title: e.courseTitle,
          categoryName: e.categoryName || "—",
          progress: Number(e.progress ?? 0),
          lastAccessISO: e.lastAccess || e.updatedAt || e.createdAt || null,
          thumbnailUrl: e.thumbnailUrl || null,
          lessons: e.lessonsTotal ?? null,
          durationLabel: e.durationLabel || null,
        }));
        setItems(normalized);

        // lưu nhẹ localStorage để lỡ offline vẫn có
        normalized.forEach(setLocalEnrollment);
      } catch (e) {
        // fallback local
        const local = getLocalEnrollments();
        if (local.length) {
          setItems(local);
        } else {
          setErr("Chưa có dữ liệu ghi danh hoặc API chưa sẵn sàng.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, []);

  // derived list (filter/search/sort)
  const filtered = useMemo(() => {
    let list = items.slice();

    if (status !== "all") {
      list = list.filter((c) => {
        const st = statusOf(c.progress);
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
          (c.title || "").toLowerCase().includes(key) ||
          (c.categoryName || "").toLowerCase().includes(key)
      );
    }

    if (sort === "progress-desc") list.sort((a, b) => (b.progress || 0) - (a.progress || 0));
    if (sort === "progress-asc") list.sort((a, b) => (a.progress || 0) - (b.progress || 0));
    if (sort === "recent") {
      list.sort((a, b) => {
        const da = a.lastAccessISO ? Date.parse(a.lastAccessISO) : 0;
        const db = b.lastAccessISO ? Date.parse(b.lastAccessISO) : 0;
        return (db || 0) - (da || 0);
      });
    }

    return list;
  }, [items, q, status, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  useEffect(() => setPage(1), [q, status, sort]);

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Khóa học của tôi</h1>
          <p className="text-gray-700 mt-1">Danh sách các khoá bạn đã ghi danh, có thể tiếp tục học ngay.</p>

          {/* controls */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm theo tên khóa học, danh mục…"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-3 text-sm text-gray-400">⌘K</span>
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
        {/* loading / error */}
        {loading && (
          <div className="rounded-2xl border bg-white p-6 text-gray-700 inline-flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Đang tải dữ liệu ghi danh…
          </div>
        )}
        {!loading && err && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800 inline-flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {err} — Bạn có thể ghi danh tại{" "}
            <Link to="/courses" className="text-blue-700 underline ml-1">Trang khoá học</Link>.
          </div>
        )}

        {/* list */}
        {!loading && !err && (slice.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {slice.map((c) => {
              const st = statusOf(c.progress);
              const last = c.lastAccessISO
                ? new Date(c.lastAccessISO).toLocaleString("vi-VN", { hour12: false })
                : "—";

              return (
                <article key={c.courseId} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition">
                  <div className="aspect-[16/9] bg-gray-100 grid place-items-center overflow-hidden">
                    {c.thumbnailUrl ? (
                      <img src={c.thumbnailUrl} alt={c.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400 text-sm">Ảnh khóa học</span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs text-gray-500">
                          {c.categoryName || "—"}{c.lessons ? ` • ${c.lessons} bài` : ""}{c.durationLabel ? ` • ${c.durationLabel}` : ""}
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mt-1 line-clamp-2">{c.title}</h3>
                      </div>
                      <span className={`shrink-0 inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusClass(st)}`}>
                        {st}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{c.progress ?? 0}%</span>
                      </div>
                      <Progress value={c.progress} />
                      <div className="mt-2 text-xs text-gray-500">
                        Lần học gần nhất: <span className="font-medium text-gray-700">{last}</span>
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

                      <Link
                        to={`/s/enrollments/${c.courseId}/cancel-request`}
                        className="ml-auto rounded-xl border border-red-300 text-red-700 hover:bg-red-50 px-3 py-2 text-xs font-medium"
                        title="Gửi yêu cầu hủy ghi danh"
                      >
                        Yêu cầu hủy
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-gray-200 rounded-2xl p-10 text-center text-gray-600">
            Chưa có khóa học nào khớp bộ lọc.{" "}
            <Link to="/courses" className="text-blue-600 hover:text-blue-700">Khám phá khóa học</Link>
          </div>
        ))}

        {/* pagination */}
        {!loading && filtered.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                safePage === 1 ? "text-gray-300 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              type="button"
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
                        p === safePage ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                      type="button"
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
                safePage === totalPages ? "text-gray-300 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              type="button"
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
