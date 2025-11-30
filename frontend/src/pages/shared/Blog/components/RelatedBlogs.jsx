// src/pages/shared/Blog/components/RelatedBlogs.jsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Section } from "./Common";
import PostCard from "./PostCard";

export default function RelatedBlogs({ posts }) {
    const ref = useRef(null);
    const scroll = (dir) =>
        ref.current?.scrollBy({
            left: dir === "left" ? -360 : 360,
            behavior: "smooth",
        });
    const related = posts.slice(0, 8);

    return (
        <Section
            id="related"
            title="Bài viết liên quan"
            action={
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="rounded-full border px-3 py-2 hover:bg-slate-50"
                        aria-label="Trượt trái"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="rounded-full border px-3 py-2 hover:bg-slate-50"
                        aria-label="Trượt phải"
                    >
                        ›
                    </button>
                    <Link to="/blog" className="text-[#2563eb] ml-2 hover:underline">
                        Xem tất cả
                    </Link>
                </div>
            }
        >
            <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar pr-6">
                {related.map((p) => (
                    <div key={p.id} className="min-w-[280px] max-w-[280px]">
                        <PostCard post={p} />
                    </div>
                ))}
            </div>
        </Section>
    );
}
