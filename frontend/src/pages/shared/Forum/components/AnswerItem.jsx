// src/pages/shared/Forum/components/AnswerItem.jsx
import { useState, useRef, useEffect } from "react";
import { BORDER } from "../utils/constants";

const MoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
    </svg>
);

// Giả sử bạn có thông tin người dùng hiện tại, ví dụ: { _id: "some_user_id" }
// Bạn cần truyền currentUser vào component này.
export default function AnswerItem({ a, currentUser }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Giả sử `a.studentId` là ID của người trả lời
    const isMyAnswer = currentUser && currentUser._id === a.studentId;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div
            className="p-5 border-b last:border-b-0 relative"
            style={{ borderColor: BORDER }}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="font-semibold text-slate-900">
                        {a.studentName || "Người trả lời"}
                    </div>
                    {a.isAccepted && (
                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            Accepted
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xs text-slate-500">
                        {new Date(a.createdAt || Date.now()).toLocaleString("vi-VN")}
                    </div>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-500 hover:text-slate-700"
                        >
                            <MoreIcon />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border">
                                <ul className="py-1 text-sm text-slate-700">
                                    {isMyAnswer ? (
                                        <>
                                            <li>
                                                <button className="w-full text-left px-4 py-2 hover:bg-slate-100">Sửa</button>
                                            </li>
                                            <li>
                                                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-slate-100">Xóa</button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <button className="w-full text-left px-4 py-2 hover:bg-slate-100">Báo cáo</button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {a.content}
            </div>
        </div>
    );
}
