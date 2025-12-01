// src/pages/shared/Forum/components/QuestionCard.jsx
import { Link } from "react-router-dom";
import { BORDER } from "../utils/constants";

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ThumbsUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
);

export default function QuestionCard({ q }) {
    const count = q?.discussionCount ?? q?.answers ?? 0;
    return (
        <article
            className="rounded-2xl border bg-white p-5 hover:shadow-sm transition"
            style={{ borderColor: BORDER }}
        >
            <Link to={`/forum/${q.id}`} className="block">
                <h3 className="font-semibold text-slate-900 line-clamp-2">
                    {q.title || "Câu hỏi"}
                </h3>
            </Link>
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                #{(q?.tags  || "").trim() || "—"}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span className="truncate max-w-[70%]" title={q.authorName}>
                    {q.studentName || "Người hỏi"}
                </span>
                <span>
                    {new Date(q.createdAt || q.updatedAt || Date.now()).toLocaleString(
                        "vi-VN",
                        { hour12: false }
                    )}
                </span>
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                    <EyeIcon />
                    {q.views ?? q.viewCount ?? 0}
                </span>
                <span className="flex items-center gap-1">
                    <ThumbsUpIcon />
                    {q.likes ?? q.likeCount ?? 0}
                </span>
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    {count}
                </span>
            </div>
        </article>
    );
}
