// src/pages/shared/Exam/Components/Pagination.jsx
import { PRIMARY } from "../utils/examHelpers";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2">

            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm font-medium border shadow-none"
                style={{
                    borderColor: "#e0e0e0",
                    backgroundColor: "#ffffff",          // ✅ chặn nền đen
                    boxShadow: "none",                    // ✅ chặn shadow lạ
                    color: currentPage === 1 ? "#a8b0bc" : "#677788",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.7 : 1, // nhìn disabled tự nhiên
                }}
                onMouseEnter={(e) => {
                    if (currentPage !== 1) e.currentTarget.style.backgroundColor = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                }}
            >
                ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                    if (totalPages <= 5) return true;
                    if (p === 1 || p === totalPages) return true;
                    return Math.abs(p - currentPage) <= 2;
                })
                .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev && p - prev > 1;
                    const isActive = p === currentPage;
                    return (
                        <span key={`p-${p}`} className="inline-flex">
                            {showEllipsis && <span className="px-2 text-[#a8b0bc]">…</span>}

                            <button
                                type="button"
                                onClick={() => onPageChange(p)}
                                className="px-3 py-2 rounded-lg text-sm font-medium border shadow-none appearance-none"
                                style={
                                    isActive
                                        ? {
                                            backgroundColor: PRIMARY,
                                            color: "#fff",
                                            borderColor: PRIMARY,
                                            boxShadow: "none",
                                        }
                                        : {
                                            backgroundColor: "#fff", // ✅ chặn nền đen
                                            color: "#677788",
                                            borderColor: "#e0e0e0",
                                            boxShadow: "none",
                                        }
                                }
                            >
                                {p}
                            </button>

                        </span>
                    );
                })}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-sm font-medium border shadow-none appearance-none"
                style={{
                    borderColor: "#e0e0e0",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    color: currentPage === totalPages ? "#a8b0bc" : "#677788",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                    if (currentPage !== totalPages) e.currentTarget.style.backgroundColor = "#f8fafc";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                }}
            >
                ›
            </button>

        </div>
    );
}
