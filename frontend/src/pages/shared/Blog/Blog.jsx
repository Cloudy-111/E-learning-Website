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
    const [selectedTag, setSelectedTag] = useState("Tất cả");
    const [myReloadKey, setMyReloadKey] = useState(0);

    // Lấy danh sách post ban đầu (public)
    const fetchAll = async () => {
        const res = await http(`${API_BASE}/api/Posts`, {
            headers: { accept: "*/*" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const arr = Array.isArray(json)
            ? json
            : Array.isArray(json?.data)
                ? json.data
                : [];
        return arr.map(normPost);
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const list = await fetchAll();
                if (mounted) setPosts(list);
            } catch (e) {
                if (mounted) setError(e?.message || "Fetch error");
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    // Suy ra tag list từ dữ liệu
    const allTags = useMemo(() => {
        const tags = new Set(["Tất cả"]);
        posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
        return Array.from(tags);
    }, [posts]);

    // Chọn tag -> gọi API search, fallback lọc local
    const handleSelectTag = async (t) => {
        setSelectedTag(t);
        if (t === "Tất cả") {
            try {
                setLoading(true);
                const list = await fetchAll();
                setPosts(list);
            } catch {
                // giữ nguyên
            } finally {
                setLoading(false);
            }
            return;
        }

        try {
            setLoading(true);
            const res = await http(
                `${API_BASE}/api/Posts/search?tag=${encodeURIComponent(t)}`,
                {
                    headers: { accept: "*/*" },
                }
            );
            if (res.ok) {
                const json = await res.json();
                const arr = Array.isArray(json)
                    ? json
                    : Array.isArray(json?.data)
                        ? json.data
                        : [];
                setPosts(arr.map(normPost));
            } else {
                setPosts((prev) => prev.filter((p) => p.tags.includes(t)));
            }
        } catch {
            setPosts((prev) => prev.filter((p) => p.tags.includes(t)));
        } finally {
            setLoading(false);
        }
    };

    // Bài viết liên quan dùng dữ liệu hiện tại
    const related = useMemo(() => posts.slice(0, 8), [posts]);

    // Khi tạo mới thành công -> prepend + trigger MyBlog reload
    const onCreated = (created) => {
        setPosts((prev) => [created, ...prev]);
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
