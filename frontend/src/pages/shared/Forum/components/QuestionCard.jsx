// src/pages/shared/Forum/components/QuestionCard.jsx
import { Link } from "react-router-dom";
import { BORDER } from "../utils/constants";

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
                {(q?.excerpt || q?.summary || "").trim() || "—"}
            </p>
            <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                <span className="truncate max-w-[70%]" title={q.authorName}>
                    {q.authorName || "Người hỏi"}
                </span>
                <span>
                    {new Date(q.createdAt || q.updatedAt || Date.now()).toLocaleString(
                        "vi-VN",
                        { hour12: false }
                    )}
                </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">{count} trả lời</div>
        </article>
    );
}
