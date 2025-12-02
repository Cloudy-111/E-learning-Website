// src/pages/shared/Blog/components/PostCard.jsx
import { Link } from "react-router-dom";
import { BORDER } from "../utils/constants";

const EyeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ThumbsUpIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
);

const MessageSquareIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

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

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
                    <span className="truncate max-w-[50%]" title={post.authorName}>
                        {post.authorName || "Tác giả"}
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <EyeIcon />
                            {Number(post.views || 0).toLocaleString("vi-VN")}
                        </span>
                        <span className="flex items-center gap-1">
                            <ThumbsUpIcon />
                            {Number(post.likes || 0).toLocaleString("vi-VN")}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquareIcon />
                            {Number(post.comments || 0).toLocaleString("vi-VN")}
                        </span>
                    </div>
                </div>

                <Link
                    to={`/blog/${post.id}`}
                    className="mt-4 inline-block text-sm text-[#2563eb] hover:underline"
                >
                    Đọc thêm
                </Link>
            </div>
        </article>
    );
}
