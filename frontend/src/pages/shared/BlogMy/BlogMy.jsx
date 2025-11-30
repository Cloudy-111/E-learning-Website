// src/pages/shared/BlogMy/BlogMy.jsx
"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../store/auth";
import { isLoggedIn, requireAuth } from "../../../utils/auth";
import { fetchPostsByMember, softDeletePost, hardDeletePost, restorePost } from "../../../api/posts.api";

import MyBlogHero from "./Components/MyBlogHero";
import Error from "./Components/Error";
import Loading from "./Components/Loading";
import PostList from "./Components/PostList";

function getMemberId(user) {
    if (user?.memberId) return user.memberId;
    if (user?.studentId) return user.studentId;
    if (user?.id) return user.id;

    // Try localStorage
    try {
        const u = JSON.parse(localStorage.getItem("auth_user") || "null");
        if (u?.memberId) return u.memberId;
        if (u?.studentId) return u.studentId;
        if (u?.id) return u.id;
    } catch { }

    // Try token decode
    const token = localStorage.getItem("access_token");
    if (token) {
        try {
            const [, payload] = token.split(".");
            const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
            if (decoded?.StudentId) return decoded.StudentId;
            if (decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
                return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            if (decoded?.nameidentifier) return decoded.nameidentifier;
            if (decoded?.userId) return decoded.userId;
        } catch { }
    }

    return null;
}

function BlogMy() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [showDeleted, setShowDeleted] = useState(false);

    const memberId = useMemo(() => getMemberId(user), [user]);

    // Guard: require login
    if (!isLoggedIn()) {
        requireAuth(navigate, location.pathname + location.search);
        return null;
    }

    // Fetch my posts
    const {
        data: postsData,
        isLoading: loading,
        error: postsError,
        refetch
    } = useQuery({
        queryKey: ['my-posts', memberId],
        queryFn: async () => {
            if (!memberId) throw new Error("Không xác định được memberId từ tài khoản. Hãy đăng xuất và đăng nhập lại.");
            const res = await fetchPostsByMember(memberId);
            const list = res.data || [];
            // Sort by newest first
            list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            return list;
        },
        enabled: !!memberId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const filtered = useMemo(
        () => (postsData || []).filter((p) => (showDeleted ? p.isDeleted === true : p.isDeleted !== true)),
        [postsData, showDeleted]
    );

    const handleSoftDelete = async (id) => {
        if (!confirm("Xoá mềm bài viết này?")) return;
        try {
            await softDeletePost(id);
            queryClient.invalidateQueries(['my-posts']);
            alert("Đã xoá mềm.");
        } catch (e) {
            alert(`Lỗi thao tác: ${e.message || "error"}`);
        }
    };

    const handleHardDelete = async (id) => {
        if (!confirm("⚠️ Xoá cứng KHÔNG THỂ khôi phục. Tiếp tục?")) return;
        try {
            await hardDeletePost(id);
            queryClient.invalidateQueries(['my-posts']);
            alert("Đã xoá cứng.");
        } catch (e) {
            alert(`Lỗi thao tác: ${e.message || "error"}`);
        }
    };

    const handleRestore = async (id) => {
        try {
            await restorePost(id);
            queryClient.invalidateQueries(['my-posts']);
            alert("Đã khôi phục.");
        } catch (e) {
            alert(`Lỗi thao tác: ${e.message || "error"}`);
        }
    };

    const error = postsError ? postsError.message || "Không thể tải dữ liệu" : "";

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden">
                <MyBlogHero showDeleted={showDeleted} setShowDeleted={setShowDeleted} />

                <section className="w-screen overflow-x-hidden py-8 lg:py-10">
                    <div className="w-screen px-6 lg:px-12">
                        {loading && <Loading />}
                        {error && !loading && <Error error={error} onRetry={refetch} />}
                        {!loading && !error && (
                            <PostList
                                posts={filtered}
                                onSoftDelete={handleSoftDelete}
                                onHardDelete={handleHardDelete}
                                onRestore={handleRestore}
                            />
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default BlogMy;
