// src/pages/shared/CourseSearch.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Search, Filter, ArrowUpDown, Loader2, Tag, Star, AlertCircle } from "lucide-react";

/* ====== Config ====== */
const API_BASE = "http://localhost:5102";

/* ====== Helpers ====== */
const NF = new Intl.NumberFormat("vi-VN");
const money = (v) => (typeof v === "number" ? `${NF.format(v)}đ` : "—");
const fmtDate = (s) => {
  // API trả ISO: 2025-11-10T04:23:03.7491162
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("vi-VN");
};

const Badge = ({ children, color = "blue" }) => {
  const map = {
    blue: "bg-blue-100 text-blue-700",
    emerald: "bg-emerald-100 text-emerald-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${map[color] || map.blue}`}>
      {children}
    </span>
  );
};

export default function CourseSearch() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  // URL state
  const qUrl = params.get("q") || "";
  const categoryUrl = params.get("category") || "all";
  const sortUrl = params.get("sort") || "updated_desc"; // updated_desc|price_asc|price_desc|rating_desc
  const pageUrl = Math.max(1, Number(params.get("page") || 1));

  // UI states
  const [q, setQ] = useState(qUrl);
  const [category, setCategory] = useState(categoryUrl);
  const [sort, setSort] = useState(sortUrl);
  const [page, setPage] = useState(pageUrl);
  const [perPage] = useState(12);

  // data states
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0); // nếu API chưa trả total, sẽ suy từ length
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // categories (mock nhẹ; khi có API categories thì fetch thật)
  const [categories, setCategories] = useState([
    "All",
    "Frontend Web",
    "Backend",
    "Fullstack",
    "Mobile",
    "Data/AI",
    "Database",
    "DevOps",
    "Cloud",
    "Cybersecurity",
  ]);

  // sync URL -> local (khi user điều hướng bằng back/forward)
  useEffect(() => {
    setQ(qUrl);
    setCategory(categoryUrl);
    setSort(sortUrl);
    setPage(pageUrl);
  }, [qUrl, categoryUrl, sortUrl, pageUrl]);

  // fetch list
  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError("");

        // build query
        const hasQuery = !!qUrl.trim() || (categoryUrl && categoryUrl !== "all");
        const url = new URL(
          hasQuery ? `${API_BASE}/api/courses/search` : `${API_BASE}/api/courses`
        );

        // paging & sort on client (vì spec chưa định nghĩa rõ param), nhưng vẫn đính param để backend sẵn sàng
        if (qUrl.trim()) url.searchParams.set("q", qUrl.trim());
        if (categoryUrl && categoryUrl !== "all") url.searchParams.set("category", categoryUrl);
        url.searchParams.set("sort", sortUrl);
        url.searchParams.set("page", pageUrl);
        url.searchParams.set("pageSize", perPage);

        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        // Trường hợp API trả mảng thuần (không có total/paging)
        const arr = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        const reportedTotal = typeof data?.total === "number" ? data.total : arr.length;

        // client-side sort fallback
        const sorted = arr.slice().sort((a, b) => {
          if (sortUrl === "price_asc") return (a.price ?? 0) - (b.price ?? 0);
          if (sortUrl === "price_desc") return (b.price ?? 0) - (a.price ?? 0);
          if (sortUrl === "rating_desc") return (b.averageRating ?? 0) - (a.averageRating ?? 0);
          // default: updated_desc
          return String(b.updatedAt ?? "").localeCompare(String(a.updatedAt ?? ""));
        });

        // client-side paginate fallback
        const start = (pageUrl - 1) * perPage;
        const end = start + perPage;
        const pageSlice = sorted.slice(start, end);

        setList(pageSlice);
        setTotal(reportedTotal || sorted.length);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Fetch courses error:", e);
          setError("Không tải được danh sách khóa học. Vui lòng thử lại.");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, [qUrl, categoryUrl, sortUrl, pageUrl, perPage]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(page, totalPages);

  // handlers
  const applyFilters = () => {
    const next = new URLSearchParams();
    if (q.trim()) next.set("q", q.trim());
    if (category !== "all") next.set("category", category);
    if (sort) next.set("sort", sort);
    next.set("page", "1");
    setParams(next, { replace: false });
  };

  const clearFilters = () => {
    setQ("");
    setCategory("all");
    setSort("updated_desc");
    setPage(1);
    const next = new URLSearchParams();
    next.set("page", "1");
    setParams(next, { replace: false });
  };

  const gotoPage = (p) => {
    const next = new URLSearchParams(params);
    next.set("page", String(p));
    setParams(next, { replace: false });
  };

  // header subtitle
  const subtitle = useMemo(() => {
    const parts = [];
    if (qUrl.trim()) parts.push(`từ khóa “${qUrl.trim()}”`);
    if (categoryUrl !== "all") parts.push(`danh mục “${categoryUrl}”`);
    return parts.length ? `Kết quả theo ${parts.join(" & ")}` : "Khám phá các khóa học đang mở";
  }, [qUrl, categoryUrl]);

  return (
    <div className="min-h-screen w-screen max-w-none bg-white">
      <Header />

      {/* HERO */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Tất cả khóa học</h1>
          <p className="text-gray-700 mt-1">{subtitle}</p>

          {/* Controls */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(320px,1fr)_auto_auto_auto] gap-3">
            {/* search */}
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm theo tên khóa học, danh mục…"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <span className="absolute right-3 top-3 text-sm text-gray-400">⌘K</span>
            </div>

            {/* category */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>

            {/* sort */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-600" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="updated_desc">Mới cập nhật</option>
                <option value="price_asc">Giá ↑</option>
                <option value="price_desc">Giá ↓</option>
                <option value="rating_desc">Đánh giá cao</option>
              </select>
            </div>

            {/* actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={applyFilters}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold"
              >
                Áp dụng
              </button>
              <button
                onClick={clearFilters}
                className="rounded-xl border border-gray-300 hover:bg-gray-50 px-4 py-2 text-sm"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="w-full px-6 lg:px-12 py-10">
        {/* states */}
        {loading && (
          <div className="rounded-2xl border bg-white p-10 text-center text-gray-600 inline-flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Đang tải dữ liệu…
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 p-4 inline-flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {list.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {list.map((c) => {
                  const hasDiscount =
                    typeof c.discountPrice === "number" &&
                    c.discountPrice > 0 &&
                    c.discountPrice < (c.price ?? 0);

                  const finalPrice = hasDiscount ? c.discountPrice : c.price;
                  const percentOff =
                    hasDiscount && c.price > 0
                      ? Math.round(((c.price - c.discountPrice) / c.price) * 100)
                      : 0;

                  return (
                    <article
                      key={c.id}
                      className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
                    >
                      <div className="aspect-[16/9] bg-gray-100 grid place-items-center overflow-hidden">
                        {c.thumbnailUrl ? (
                          // eslint-disable-next-line jsx-a11y/img-redundant-alt
                          <img
                            src={c.thumbnailUrl}
                            alt={`Thumbnail ${c.title}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">Ảnh khóa học</span>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <Badge color="blue">{c.categoryName || "Khóa học"}</Badge>
                          <span>•</span>
                          <span>{c.status || "published"}</span>
                          <span>•</span>
                          <span>Cập nhật {fmtDate(c.updatedAt)}</span>
                        </div>

                        <h3 className="font-semibold text-gray-900 mt-2 line-clamp-2">{c.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{c.description}</p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-700">
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500" />
                            {Number(c.averageRating || 0).toFixed(1)} / 5
                          </span>
                          <span>•</span>
                          <span>{c.reviewCount || 0} đánh giá</span>
                          <span className="ml-auto text-gray-500">
                            GV: <b className="text-gray-800">{c.teacherName || "—"}</b>
                          </span>
                        </div>

                        <div className="mt-3 flex items-baseline gap-2">
                          <div className="text-lg font-extrabold text-gray-900">{money(finalPrice)}</div>
                          {hasDiscount && (
                            <>
                              <div className="text-sm text-gray-500 line-through">{money(c.price)}</div>
                              <Badge color="emerald">Giảm {percentOff}%</Badge>
                            </>
                          )}
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                          <Link
                            to={`/courses/${c.id}`}
                            className="rounded-lg border px-3 py-2 text-center hover:bg-gray-50"
                          >
                            Xem chi tiết
                          </Link>
                          {/* Bước tiếp theo sẽ làm trang Enroll/Checkout */}
                          <Link
                            to={`/s/enroll/${c.id}`}
                            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-center font-semibold"
                          >
                            Mua/Ghi danh
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-2xl p-10 text-center text-gray-600">
                Không tìm thấy khóa học phù hợp.{" "}
                <button onClick={clearFilters} className="text-blue-600 hover:text-blue-700">
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {total > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => gotoPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                    safePage === 1
                      ? "text-gray-300 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  type="button"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 7) return true;
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
                          onClick={() => gotoPage(p)}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            p === safePage
                              ? "bg-blue-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          type="button"
                        >
                          {p}
                        </button>
                      </span>
                    );
                  })}
                <button
                  onClick={() => gotoPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  className={`px-3 py-2 rounded-lg text-sm font-medium border ${
                    safePage === totalPages
                      ? "text-gray-300 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                  type="button"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
