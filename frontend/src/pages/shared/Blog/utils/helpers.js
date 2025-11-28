// src/pages/shared/Blog/utils/helpers.js
import { isLoggedIn } from "../../../../utils/auth";

export { isLoggedIn };

// ===== Local Helpers from Blog.OLD.jsx =====

function readLocal(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
        return null;
    }
}

function decodeJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1] || ""));
    } catch {
        return null;
    }
}

/** Lấy token + memberId (studentId || teacherId) chắc chắn */
export function getAuthInfoStrict() {
    // cố gắng lấy token từ nhiều nơi
    let token = null;
    const tObj = readLocal("auth_token"); // { accessToken, refreshToken } ?
    if (tObj?.accessToken) token = tObj.accessToken;

    if (!token) {
        const tStr = localStorage.getItem("access_token"); // chuỗi thuần?
        if (tStr) token = tStr;
    }
    if (!token) {
        const authUser = readLocal("auth_user"); // có thể { token, studentId, teacherId, userId, ... }
        if (authUser?.token) token = authUser.token;
        if (!token && authUser?.accessToken) token = authUser.accessToken;
    }
    if (!token) {
        const raw = localStorage.getItem("token"); // đôi khi bạn lưu thế này
        if (raw) token = raw.replace(/^"|"$/g, ""); // bỏ quote nếu là JSON string
    }

    // suy ra memberId
    let memberId = null;
    const authUser2 = readLocal("auth_user");
    if (authUser2?.studentId) memberId = authUser2.studentId;
    else if (authUser2?.teacherId) memberId = authUser2.teacherId;

    if (!memberId && token) {
        const claims = decodeJwt(token) || {};
        memberId =
            claims.StudentId ||
            claims.studentId ||
            claims.TeacherId ||
            claims.teacherId ||
            null;
    }

    return { token, memberId };
}

/** Tạo headers có Authorization nếu có token */
export function withAuthHeaders(base = {}) {
    const { token } = getAuthInfoStrict();
    return token ? { ...base, Authorization: `Bearer ${token}` } : base;
}

function getAuthUser() {
    try {
        return JSON.parse(localStorage.getItem("auth_user") || "null") || null;
    } catch {
        return null;
    }
}

function getAccessToken() {
    const u = getAuthUser();
    return u?.token || null;
}

export function authHeaders(extra = {}) {
    const token = getAccessToken();
    return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
}

// ===== Normalizer =====

export const normPost = (p) => {
    return {
        id: p?.id,
        title: p?.title || "Bài viết",
        cover: p?.thumbnailUrl || "/images/blog-placeholder.jpg",
        tags: (p?.tags || "").split(",").map((s) => s.trim()).filter(Boolean),
        tagDisplay:
            (p?.tags || "").split(",").map((s) => s.trim()).filter(Boolean)[0] ||
            "Blog",
        views: p?.viewCount ?? 0,
        likes: p?.likeCount ?? 0,
        comments: p?.discussionCount ?? 0,
        isPublished: !!p?.isPublished,
        createdAt: p?.createdAt || null,
        authorId: p?.authorId || null,
        authorName: p?.authorName || "Tác giả",
    };
};
