// src/pages/shared/Blog/components/PostCard.jsx
import { Link } from "react-router-dom";
import { BORDER } from "../utils/constants";

export default function PostCard({ post }) {
    return (
        <article
            className="rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
            style={{ borderColor: BORDER }}
        >
            <div className="aspect-[16/9] bg-blue-50">
                {post?.cover ? (
                    <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full grid place-items-center">
                        <span className="text-xs text-blue-400">Ảnh blog</span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs uppercase tracking-wide text-[#2563eb]">
                        {post.tagDisplay}
                    </span>
                    {post.tags.slice(1, 3).map((t, i) => (
                        <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8]"
                        >
                            #{t}
                        </span>
                    ))}
                </div>
                <h3 className="mt-1 font-semibold text-lg leading-snug text-slate-900 line-clamp-2">
                    {post.title}
                </h3>

                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                    <span className="truncate max-w-[60%]" title={post.authorName}>
                        {post.authorName || "Tác giả"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                        {Number(post.views || 0).toLocaleString("vi-VN")}
                    </span>
                </div>

                <Link
                    to={`/blog/${post.id}`}
                    className="mt-3 inline-block text-[#2563eb] hover:underline"
                >
                    Đọc thêm
                </Link>
            </div>
        </article>
    );
}
