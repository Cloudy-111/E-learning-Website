// src/pages/shared/BlogDetail/components/Comments.jsx
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ls, fmtTime } from "../utils/helpers";
import { authHeaders } from "../../Blog/utils/helpers";
import { BORDER } from "../utils/constants";

// TODO: Move this to a constants file
const API_BASE = "http://localhost:5102";

const Primary = ({ children, className = "", ...props }) => (
    <button
        type="button"
        className={
            "rounded-full bg-[#2563eb] text-white px-5 py-3 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#93c5fd] transition " +
            className
        }
        {...props}
    >
        {children}
    </button>
);

const Section = ({ id, title, children }) => (
    <section id={id} className="w-screen overflow-x-hidden py-10 lg:py-14">
        <div className="w-screen px-6 lg:px-12">
            {title && (
                <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#1d4ed8]">{title}</h2>
                </div>
            )}
            {children}
        </div>
    </section>
);

export default function Comments() {
    const { id: postId = "default" } = useParams();
    const KEY = `blog_comments_${postId}`;

    const getUserNameFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return "Khách";
        try {
            // Giả sử claim trong token chứa studentId
            const decoded = jwtDecode(token);
            return decoded.StudentId || decoded.studentId || "Người dùng";
        } catch (error) {
            console.error("Failed to decode token:", error);
            return "Khách";
        }
    };

    const [items, setItems] = useState([]);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchComments = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Endpoint để lấy danh sách bình luận cho một bài viết
            const response = await fetch(`${API_BASE}/api/Discussion/Post/${postId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch comments.");
            }
            const data = await response.json();
            // API trả về trực tiếp một mảng các bình luận
            const comments = data || [];
            // Sắp xếp bình luận theo thời gian gần nhất
            setItems(comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const addComment = async (e) => {
        e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed) return;

        try {
            const requestHeaders = authHeaders();
            // DEBUG: Kiểm tra headers trước khi gửi yêu cầu tạo bình luận
            console.log("[Comments.jsx] addComment - Sending request with headers:", requestHeaders);

            // Endpoint chính xác như user đã xác nhận
            const response = await fetch(`${API_BASE}/api/Discussion/Post/${postId}`, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({ content: trimmed }),
            });

            if (!response.ok) {
                throw new Error("Failed to post comment.");
            }

            setContent("");
            // Tải lại danh sách bình luận để hiển thị bình luận mới
            await fetchComments();
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    const removeComment = async (commentId) => {
        // Xác nhận trước khi xóa
        if (!window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
            return;
        }

        try {
            const requestHeaders = authHeaders(false);
            // DEBUG: Kiểm tra headers trước khi gửi yêu cầu xóa
            console.log(`[Comments.jsx] removeComment (ID: ${commentId}) - Sending request with headers:`, requestHeaders);

            const response = await fetch(`${API_BASE}/api/Discussion/${commentId}`, {
                method: 'DELETE',
                headers: requestHeaders, // Không cần Content-Type cho DELETE
            });

            if (!response.ok) {
                throw new Error("Failed to delete comment.");
            }

            // Xóa bình luận khỏi state để cập nhật UI ngay lập tức
            setItems(items.filter((c) => c.id !== commentId));
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    return (
        <Section id="comments" title={`Bình luận (${items.length})`}>
            {/* form */}
            <form
                onSubmit={addComment}
                className="rounded-2xl border bg-white p-5 grid gap-3"
                style={{ borderColor: BORDER }}
            >
                {error && (
                    <div className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg p-2">
                        Lỗi: {error}
                    </div>
                )}
                <div>
                    <textarea
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        placeholder={`Viết bình luận với tư cách ${getUserNameFromToken()}…`}
                        className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                        style={{ borderColor: BORDER }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                        Ấn <b>Ctrl + Enter</b> để đăng nhanh
                    </div>
                    <Primary
                        type="submit"
                        onKeyDown={(e) => {
                            if (e.ctrlKey && e.key === "Enter") addComment(e);
                        }}
                    >
                        Đăng bình luận
                    </Primary>
                </div>
            </form>

            {/* list */}
            <div
                className="mt-6 grid gap-4 max-h-[70vh] overflow-y-auto pr-2"
                style={{ scrollbarWidth: "thin" }}
            >
                {isLoading && <div className="text-sm text-slate-500">Đang tải bình luận...</div>}
                {!isLoading && items.length === 0 && (
                    <div className="text-sm text-slate-500">
                        Chưa có bình luận nào. Hãy là người đầu tiên!
                    </div>
                )}
                {items.map((c) => (
                    <div
                        // Giả sử API trả về `id` cho mỗi bình luận
                        key={c.id} 
                        className="rounded-2xl border bg-white p-4"
                        style={{ borderColor: BORDER }}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-sm font-medium text-slate-900">
                                    {/* API trả về `studentName` cho mỗi bình luận */}
                                    {c.studentName || "Khách"}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {fmtTime(c.createdAt)}
                                </div>
                            </div>
                            <button
                                onClick={() => removeComment(c.id)} // Sử dụng id từ API
                                className="text-xs text-red-500 rounded-full border px-2 py-1 hover:bg-red-50 hover:border-red-400"
                                title="Xoá bình luận này"
                                style={{ borderColor: BORDER }}
                            >
                                Xoá
                            </button>
                        </div>
                        <p className="mt-2 text-slate-800 whitespace-pre-wrap">
                            {c.content}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
