// src/pages/shared/BlogDetail/components/HeroSection.jsx
import { Link } from "react-router-dom";
import { Eye } from "../utils/Icons";
import { fmtTime } from "../utils/helpers";

export default function HeroSection({ post }) {
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

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
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

                    <span className="inline-flex items-center gap-1 text-slate-600">
                        <Eye /> {Number(post?.views || 0).toLocaleString("vi-VN")}
                    </span>
                </div>
            </div>
        </section>
    );
}
