// src/pages/shared/Forum/components/AnswerItem.jsx
import { BORDER } from "../utils/constants";

export default function AnswerItem({ a }) {
    return (
        <div
            className="p-5 border-b last:border-b-0"
            style={{ borderColor: BORDER }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="font-semibold text-slate-900">
                        {a.authorName || "Người trả lời"}
                    </div>
                    {a.isAccepted && (
                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            Accepted
                        </span>
                    )}
                </div>
                <div className="text-xs text-slate-500">
                    {new Date(a.createdAt || Date.now()).toLocaleString("vi-VN")}
                </div>
            </div>
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {a.content}
            </div>
        </div>
    );
}
