// src/pages/BlogSearch.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { http } from "../../utils/http";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5102";
const BORDER = "#e5e7eb";

const mapListItem = (p) => ({
  id: p?.id,
  title: p?.title || "Bài viết",
  cover: p?.thumbnailUrl || "/images/blog-placeholder.jpg",
  tags: (p?.tags || "").split(",").map(s => s.trim()).filter(Boolean),
  tagDisplay: (p?.tags || "").split(",").map(s => s.trim()).filter(Boolean)[0] || "Blog",
  authorName: p?.authorName || "Tác giả",
  authorId: p?.authorId || null,
  views: p?.viewCount ?? 0,
});

export default function BlogSearch() {
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q") || "";
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, [q]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // ưu tiên gọi /api/Posts/search — không chắc tham số tên gì: thử ?q= và fallback ?tag=
        let list = [];
        const tryQueries = [
          `${API_BASE}/api/Posts/search?q=${encodeURIComponent(q)}`,
          `${API_BASE}/api/Posts/search?tag=${encodeURIComponent(q)}`,
        ];

        for (const url of tryQueries) {
          try {
            const res = await http(url, { headers: { accept: "*/*" } });
            if (res.ok) {
              const json = await res.json();
              const arr = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
              if (arr?.length) {
                list = arr.map(mapListItem);
                break;
              }
            }
          } catch {}
        }

        if (!list.length) {
          // fallback: lấy tất cả rồi lọc client theo title/tags
          const all = await http(`${API_BASE}/api/Posts`, { headers: { accept: "*/*" } });
          if (all.ok) {
            const json = await all.json();
            const arr = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
            const allMapped = arr.map(mapListItem);
            const key = q.trim().toLowerCase();
            list = allMapped.filter(p =>
              p.title.toLowerCase().includes(key) ||
              (p.tags || []).some(t => t.toLowerCase().includes(key))
            );
          }
        }

        if (mounted) setItems(list);
      } catch (e) {
        if (mounted) setErr(e?.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [q]);

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <section className="w-screen overflow-x-hidden py-10 lg:py-14">
          <div className="w-screen px-6 lg:px-12">
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">
                Kết quả tìm kiếm cho “{q}”
              </h1>
              <p className="text-slate-600 mt-2">
                {loading ? "Đang tìm..." : `Tìm thấy ${items.length} kết quả`}
              </p>
            </div>

            {err && (
              <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
                Không thể tải kết quả (chi tiết: {err})
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="rounded-2xl border bg-white overflow-hidden animate-pulse" style={{ borderColor: BORDER }}>
                      <div className="aspect-[16/9] bg-slate-100" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 w-3/4 bg-slate-100 rounded" />
                        <div className="h-3 w-full bg-slate-100 rounded" />
                      </div>
                    </div>
                  ))
                : items.map((p) => (
                    <article key={p.id} className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition" style={{ borderColor: BORDER }}>
                      <div className="aspect-[16/9] bg-blue-50">
                        {p.cover ? (
                          <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full grid place-items-center"><span className="text-xs text-blue-400">Ảnh blog</span></div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="text-xs uppercase tracking-wide text-[#2563eb]">{p.tagDisplay}</div>
                        <h3 className="mt-2 font-semibold text-lg leading-snug text-slate-900 line-clamp-2">{p.title}</h3>
                        <div className="mt-3 text-sm text-slate-600">{p.authorName}</div>
                        <Link to={`/blog/${p.id}`} className="mt-3 inline-block text-[#2563eb] hover:underline">Đọc thêm</Link>
                      </div>
                    </article>
                  ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
