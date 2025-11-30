// src/pages/shared/Blog/components/BlogList.jsx
import { BORDER } from "../utils/constants";
import { Section, Tag } from "./Common";
import PostCard from "./PostCard";

export default function BlogList({
    posts,
    loading,
    error,
    onSelectTag,
    selectedTag,
    allTags,
}) {
    return (
        <Section
            id="list"
            title="Bài viết mới"
            subtitle="Chọn chủ đề bạn quan tâm để lọc nội dung"
            action={
                <div className="flex flex-wrap gap-2">
                    {allTags.map((t) => (
                        <Tag
                            key={t}
                            active={t === selectedTag}
                            onClick={() => onSelectTag(t)}
                        >
                            {t}
                        </Tag>
                    ))}
                </div>
            }
        >
            {error && (
                <div className="bg-white border border-red-200 rounded-lg p-4 text-sm text-red-600 mb-4">
                    Không thể tải bài viết (chi tiết: {error})
                </div>
            )}

            {loading && posts.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border bg-white overflow-hidden animate-pulse"
                            style={{ borderColor: BORDER }}
                        >
                            <div className="aspect-[16/9] bg-slate-100" />
                            <div className="p-5 space-y-3">
                                <div className="h-3 w-16 bg-slate-100 rounded" />
                                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                                <div className="h-3 w-full bg-slate-100 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((p) => (
                        <PostCard key={p.id} post={p} />
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-full text-center text-slate-600">
                            Không có bài viết cho bộ lọc hiện tại.
                        </div>
                    )}
                </div>
            )}
        </Section>
    );
}
