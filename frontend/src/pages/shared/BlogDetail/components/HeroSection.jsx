// src/pages/shared/BlogDetail/components/HeroSection.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Eye } from "../utils/Icons";
import { fmtTime } from "../utils/helpers";

// Icons, học theo các component khác
const ThumbsUpIcon = ({ isLiked }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" 
         fill={isLiked ? "currentColor" : "none"} 
         stroke="currentColor" 
         strokeWidth="2" 
         strokeLinecap="round" 
         strokeLinejoin="round">
        <path d="M7 10v12" />
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
);

const CommentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

// Helper function, học theo QuestionCard.jsx
function decodeJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1] || ""));
    } catch {
        return null;
    }
}

export default function HeroSection({ post }) {
    const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0);
    const [commentCount, setCommentCount] = useState(post?.discussionCount ?? 0);
    const [isLiked, setIsLiked] = useState(false);

    // Lấy thông tin chi tiết về likes và comments
    useEffect(() => {
        if (!post?.id) return;

        // Lấy thông tin likes
        fetch(`http://localhost:5102/api/Likes/Post/${post.id}`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                if (Array.isArray(data)) {
                    setLikeCount(data.length);
                    const token = localStorage.getItem("app_access_token");
                    const claims = token ? decodeJwt(token) : null;
                    const studentId = claims?.StudentId || claims?.studentId;
                    if (studentId) {
                        setIsLiked(data.some(like => like.studentId === studentId));
                    }
                }
            })
            .catch(err => console.error("Failed to fetch post likes:", err));

        // Lấy thông tin comments
        fetch(`http://localhost:5102/api/Discussion/Post/${post.id}`)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(data => {
                if (Array.isArray(data)) {
                    setCommentCount(data.length);
                }
            })
            .catch(err => console.error("Failed to fetch post comments:", err));

    }, [post?.id]);

    // Hàm xử lý like/unlike
    const handleLike = async () => {
        if (!post?.id) return;

        const token = localStorage.getItem('app_access_token');
        if (!token) {
            alert("Bạn cần đăng nhập để thích bài viết.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5102/api/Likes/Post/${post.id}/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const result = await response.json();
                setLikeCount(result.likeCount);
                setIsLiked(result.liked);
            } else {
                alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thực hiện toggle like:", error);
        }
    };

    return (
        <section className="w-screen overflow-x-hidden pt-8">
            <div className="w-screen px-6 lg:px-12">
                {/* breadcrumb */}
                <div className="text-sm text-slate-500">
                    <Link to="/blog" className="hover:text-[#2563eb]">
                        Blog
                    </Link>{" "}
                    / <span>Chi tiết</span>
                </div>

                <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-screen-xl text-slate-900">
                    {post?.title || "Bài viết"}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden grid place-items-center">
                            <span className="text-xs text-slate-500">IMG</span>
                        </div>
                        <div>
                            {post?.authorId ? (
                                <Link
                                    to={`/blog/author/${post.authorId}`}
                                    className="font-medium leading-tight text-slate-900 hover:underline"
                                >
                                    {post?.authorName || "Tác giả"}
                                </Link>
                            ) : (
                                <div className="font-medium leading-tight text-slate-900">
                                    {post?.authorName || "Tác giả"}
                                </div>
                            )}
                            <div className="text-xs text-slate-500">
                                {post?.createdAt ? fmtTime(post.createdAt) : "—"}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-4 text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                            <Eye /> {Number(post?.views || 0).toLocaleString("vi-VN")}
                        </span>
                        <button onClick={handleLike} className={`inline-flex items-center gap-1.5 hover:text-slate-900 focus:outline-none ${isLiked ? 'text-blue-600' : ''}`}>
                            <ThumbsUpIcon isLiked={isLiked} />
                            {likeCount}
                        </button>
                        <span className="inline-flex items-center gap-1.5">
                            <CommentIcon />
                            {commentCount}
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
