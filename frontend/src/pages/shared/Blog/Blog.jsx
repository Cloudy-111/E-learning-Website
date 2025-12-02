// src/pages/shared/Blog/Blog.jsx
import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { http } from "../../../utils/http";
import { API_BASE } from "./utils/constants";
import { normPost } from "./utils/helpers";
import {
    HeroSection,
    SearchBar,
    BlogList,
    RelatedBlogs,
    MyBlogPreview,
    Composer,
} from "./components";

export default function Blog() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); // 8 bài/trang
    const [selectedTag, setSelectedTag] = useState("Tất cả");
    const [myReloadKey, setMyReloadKey] = useState(0);

    // Lấy danh sách post có phân trang
    const fetchPosts = async (currentPage, currentTag) => {
        setLoading(true);
        setError(null);
        try {
            const url = new URL(`${API_BASE}/api/Posts/paging`);
            url.searchParams.append('page', currentPage);
            url.searchParams.append('pageSize', pageSize);
            if (currentTag && currentTag !== 'Tất cả') {
                url.searchParams.append('tags', currentTag);
            }

            const res = await http(url.toString(), {
                headers: { accept: "*/*" },
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();

            setPosts(json.items.map(normPost));
            setTotalPages(json.totalPages || 0);
            setPage(json.page || 1);
        } catch (e) {
            setError(e?.message || "Lỗi tải bài viết");
            // Giữ lại bài viết cũ nếu có lỗi
        } finally {
            setLoading(false);
        }
    };

    // Fetch posts when page or tag changes
    useEffect(() => {
        fetchPosts(page, selectedTag);
    }, [page, selectedTag]);

    // Suy ra tag list từ dữ liệu (có thể cần API riêng để lấy tất cả tags)
    const allTags = useMemo(() => {
        const tags = new Set(["Tất cả"]);
        // Tạm thời vẫn lấy tag từ post đã tải
        posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
        return Array.from(tags);
    }, [posts]);

    // Chọn tag -> reset về trang 1 và fetch lại
    const handleSelectTag = (tag) => {
        setPage(1);
        setSelectedTag(tag);
    };

    // Bài viết liên quan dùng dữ liệu hiện tại
    const related = useMemo(() => posts.slice(0, 8), [posts]);

    // Khi tạo mới thành công -> fetch lại trang 1 + trigger MyBlog reload
    const onCreated = (created) => {
        // setPosts((prev) => [created, ...prev]); // Không cần nữa vì sẽ fetch lại
        if (page === 1) {
            fetchPosts(1, selectedTag); // Tải lại trang 1 nếu đang ở trang 1
        } else {
            setPage(1); // Chuyển về trang 1, useEffect sẽ trigger fetch
        }
        setMyReloadKey((k) => k + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <main className="w-screen overflow-x-hidden">
                <HeroSection />

                {/* (1) Search */}
                <SearchBar />

                {/* Danh sách blog (public) */}
                <BlogList
                    posts={posts}
                    loading={loading}
                    error={error}
                    selectedTag={selectedTag}
                    allTags={allTags}
                    onSelectTag={handleSelectTag}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

                {/* Related */}
                <RelatedBlogs posts={related} />

                {/* (2) My Blog Preview */}
                <MyBlogPreview refreshKey={myReloadKey} />

                {/* Composer: đăng bài có token + thông báo thành công */}
                <Composer onCreated={onCreated} />
            </main>
            <Footer />
        </>
    );
}
