// src/pages/shared/BlogDetail/components/Comments.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ls, fmtTime } from "../utils/helpers";
import { BORDER } from "../utils/constants";

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

    const [items, setItems] = useState(ls.get(KEY, []));
    const [name, setName] = useState(ls.get("blog_comment_name", ""));
    const [content, setContent] = useState("");

    useEffect(() => {
        ls.set(KEY, items);
    }, [items, KEY]);

    useEffect(() => {
        if (name) ls.set("blog_comment_name", name);
    }, [name]);

    const addComment = (e) => {
        e.preventDefault();
        const trimmed = content.trim();
        const trimmedName = (name || "Khách").trim();
        if (!trimmed) return;

        const next = [
            ...items,
            {
                id: crypto.randomUUID(),
                name: trimmedName,
                content: trimmed,
                createdAt: Date.now(),
            },
        ];
        setItems(next);
        setContent("");
    };

    const removeComment = (id) => {
        setItems(items.filter((c) => c.id !== id));
    };

    return (
        <Section id="comments" title={`Bình luận (${items.length})`}>
            {/* form */}
            <form
                onSubmit={addComment}
                className="rounded-2xl border bg-white p-5 grid gap-3"
                style={{ borderColor: BORDER }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tên hiển thị (tuỳ chọn)"
                        className="rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                        style={{ borderColor: BORDER }}
                    />
                    <div className="sm:col-span-2">
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={3}
                            placeholder="Viết bình luận của bạn…"
                            className="w-full rounded-2xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#93c5fd]"
                            style={{ borderColor: BORDER }}
                        />
                    </div>
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
            <div className="mt-6 grid gap-4">
                {items.length === 0 && (
                    <div className="text-sm text-slate-500">
                        Chưa có bình luận nào. Hãy là người đầu tiên!
                    </div>
                )}
                {items.map((c) => (
                    <div
                        key={c.id}
                        className="rounded-2xl border bg-white p-4"
                        style={{ borderColor: BORDER }}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <div className="text-sm font-medium text-slate-900">
                                    {c.name || "Khách"}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {fmtTime(c.createdAt)}
                                </div>
                            </div>
                            <button
                                onClick={() => removeComment(c.id)}
                                className="text-xs text-slate-500 rounded-full border px-2 py-1 hover:bg-slate-50"
                                title="Xoá bình luận này (cục bộ)"
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
