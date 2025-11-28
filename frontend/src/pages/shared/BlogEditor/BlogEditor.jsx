// src/pages/shared/BlogEditor/BlogEditor.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { isLoggedIn, requireAuth } from "../../../utils/auth";
import { fetchPostById, createPost, updatePost } from "../../../api/posts.api";

import EditorHero from "./Components/EditorHero";
import EditorForm from "./Components/EditorForm";

function BlogEditor({ mode = "edit" }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = mode === "edit" && !!id;

    // Guard: require login
    useEffect(() => {
        if (!isLoggedIn()) {
            requireAuth(navigate, isEditMode ? `/blog/${id}/edit` : "/blog/new");
        }
    }, [id, navigate, isEditMode]);

    // Form state
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [content, setContent] = useState("");
    const [isPublished, setIsPublished] = useState(true);

    // Fetch post for edit mode
    const {
        data: postData,
        isLoading: loading,
        error: fetchError
    } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const post = await fetchPostById(id);
            return post;
        },
        enabled: isEditMode,
        staleTime: 0,
    });

    // Populate form when data is loaded
    useEffect(() => {
        if (postData && isEditMode) {
            setTitle(postData.title || "");
            setTags(postData.tags || "");
            setThumbnailUrl(postData.thumbnailUrl || "");
            setIsPublished(!!postData.isPublished);

            let text = "";
            if (postData.contentJson) {
                try {
                    const cj = typeof postData.contentJson === "string"
                        ? JSON.parse(postData.contentJson)
                        : postData.contentJson;
                    text = cj?.blocks?.[0]?.text || "";
                } catch {
                    text = "";
                }
            }
            setContent(text);
        }
    }, [postData, isEditMode]);

    const canSubmit = useMemo(
        () => title.trim().length >= 1 && content.trim().length >= 1,
        [title, content]
    );

    const handleSave = async () => {
        if (!canSubmit || saving) return;

        try {
            setSaving(true);
            setError("");

            const payload = {
                title: title.trim(),
                contentJson: JSON.stringify({ blocks: [{ text: content.trim() }] }),
                thumbnailUrl: thumbnailUrl.trim() || null,
                tags: (tags || "").trim(),
                isPublished,
            };

            if (isEditMode) {
                await updatePost(id, payload);
                navigate("/blog/my?ok=updated", { replace: true });
            } else {
                const result = await createPost(payload);
                navigate(`/blog/${result.id || result.data?.id}`, { replace: true });
            }
        } catch (e) {
            setError(e?.message || "Lưu thất bại");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden">
                <EditorHero
                    mode={mode}
                    canSubmit={canSubmit}
                    saving={saving}
                    onSave={handleSave}
                />

                <section className="w-screen overflow-x-hidden py-8 lg:py-10">
                    <div className="w-screen px-6 lg:px-12">
                        <EditorForm
                            mode={mode}
                            postId={id}
                            title={title}
                            setTitle={setTitle}
                            tags={tags}
                            setTags={setTags}
                            thumbnailUrl={thumbnailUrl}
                            setThumbnailUrl={setThumbnailUrl}
                            content={content}
                            setContent={setContent}
                            isPublished={isPublished}
                            setIsPublished={setIsPublished}
                            canSubmit={canSubmit}
                            saving={saving}
                            onSave={handleSave}
                            loading={loading && isEditMode}
                            error={error || (fetchError ? fetchError.message : "")}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default BlogEditor;
