// src/pages/AuthorPosts.jsx
"use client";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

export default function BlogAuthor() {
  const { memberId } = useParams();
  const [items, setItems] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [memberId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await http(`${API_BASE}/api/Posts/member/${memberId}`, { headers: { accept: "*/*" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const arr = Array.isArray(json) ? json : (Array.isArray(json?.data) ? json.data : []);
        const list = arr.map(mapListItem);
        if (mounted) {
          setItems(list);
          setAuthorName(list[0]?.authorName || "Tác giả");
        }
      } catch (e) {
        if (mounted) setErr(e?.message || "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [memberId]);

  return (
    <>
      <Header />
      <main className="w-screen overflow-x-hidden">
        <section className="w-screen overflow-x-hidden py-10 lg:py-14">
          <div className="w-screen px-6 lg:px-12">
            <div className="mb-6">
              <div className="text-sm text-slate-500"><Link to="/blog" className="hover:underline">Blog</Link> / Tác giả</div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">
                Tác giả: {authorName}
              </h1>
              <p className="text-slate-600 mt-2">{loading ? "Đang tải..." : `Có ${items.length} bài viết`}</p>
            </div>

            {err && (
              <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
                Không thể tải bài viết của tác giả (chi tiết: {err})
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
