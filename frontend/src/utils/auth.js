// // src/utils/auth.js
// // Auth dựa trên access/refresh token + localStorage

// export const AUTH_KEY = "app_auth_status";       // "1" = logged-in
// export const AT_KEY   = "app_access_token";      // access token
// export const RT_KEY   = "app_refresh_token";     // refresh token
// export const REDIRECT_KEY = "post_login_redirect";

// export function isLoggedIn() {
//   try { return localStorage.getItem(AUTH_KEY) === "1" && !!localStorage.getItem(AT_KEY); }
//   catch { return false; }
// }

// export function setTokens({ accessToken, refreshToken }) {
//   try {
//     if (accessToken) localStorage.setItem(AT_KEY, accessToken);
//     if (refreshToken) localStorage.setItem(RT_KEY, refreshToken);
//     localStorage.setItem(AUTH_KEY, "1");
//   } catch {}
// }

// export function clearToken() {  // compat with http.js
//   try { localStorage.removeItem(AT_KEY); } catch {}
// }
// export function clearAllAuth() {
//   try {
//     localStorage.removeItem(AUTH_KEY);
//     localStorage.removeItem(AT_KEY);
//     localStorage.removeItem(RT_KEY);
//   } catch {}
// }

// export function getToken() {
//   try { return localStorage.getItem(AT_KEY) || null; } catch { return null; }
// }
// export function getRefreshToken() {
//   try { return localStorage.getItem(RT_KEY) || null; } catch { return null; }
// }

// export function authHeader() {
//   const t = getToken();
//   return t ? { Authorization: `Bearer ${t}` } : {};
// }

// export function requireAuth(navigate, redirectTo) {
//   if (isLoggedIn()) return true;
//   const target = redirectTo ||
//     (typeof window !== "undefined" ? window.location.pathname + window.location.search : "/");
//   try { localStorage.setItem(REDIRECT_KEY, target); } catch {}
//   const qs = `redirect=${encodeURIComponent(target)}&returnTo=${encodeURIComponent(target)}`;
//   navigate(`/login?${qs}`, { replace: true });
//   return false;
// }

// export function consumePendingNext() {
//   try {
//     const v = localStorage.getItem(REDIRECT_KEY);
//     if (v) { localStorage.removeItem(REDIRECT_KEY); return v; }
//   } catch {}
//   return null;
// }
// export function redirectBackAfterLogin(navigate, fallback = "/") {
//   const saved = consumePendingNext();
//   navigate(saved || fallback, { replace: true });
// }









































// src/utils/auth.js
// Quản lý access/refresh token + localStorage + helper điều hướng

/*** ===== Keys trong localStorage ===== ***/
export const AUTH_KEY = "app_auth_status";     // "1" = đã đăng nhập
export const AT_KEY   = "app_access_token";    // access token (JWT)
export const RT_KEY   = "app_refresh_token";   // refresh token
export const USER_KEY = "app_user";            // thông tin hiển thị (name/email/avatar)
export const REDIRECT_KEY = "post_login_redirect";

/*** ===== Trạng thái đăng nhập ===== ***/
export function isLoggedIn() {
  try { return localStorage.getItem(AUTH_KEY) === "1" && !!localStorage.getItem(AT_KEY); }
  catch { return false; }
}

/*** ===== Lấy/Ghi token ===== ***/
export function getToken() {
  try { return localStorage.getItem(AT_KEY) || null; }
  catch { return null; }
}
export function getRefreshToken() {
  try { return localStorage.getItem(RT_KEY) || null; }
  catch { return null; }
}

/**
 * Lưu cặp access/refresh token (dùng chung).
 * @param {{accessToken?: string, refreshToken?: string}} param0
 */
export function setTokens({ accessToken, refreshToken }) {
  try {
    if (accessToken) localStorage.setItem(AT_KEY, accessToken);
    if (refreshToken) localStorage.setItem(RT_KEY, refreshToken);
    localStorage.setItem(AUTH_KEY, "1");
  } catch {}
}

/** Xoá chỉ access token (giữ refresh nếu muốn) – tương thích http.js cũ */
export function clearToken() {
  try { localStorage.removeItem(AT_KEY); } catch {}
}

/** Đăng xuất hoàn toàn */
export function clearAllAuth() {
  try {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AT_KEY);
    localStorage.removeItem(RT_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
}

/*** ===== Thông tin người dùng để hiển thị header ===== ***/
export function setUserDisplay(userLike) {
  // userLike: { name?, fullName?, username?, email?, avatarUrl? }
  try {
    const u = {
      name: userLike?.name || userLike?.fullName || userLike?.username || "",
      email: userLike?.email || "",
      avatar: userLike?.avatarUrl || userLike?.avatar || null,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  } catch {}
}
export function getUserDisplay() {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); }
  catch { return null; }
}

/*** ===== Header Authorization ===== ***/
export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

/*** ===== Hỗ trợ điều hướng bắt buộc đăng nhập ===== ***/
export function requireAuth(navigate, redirectTo) {
  if (isLoggedIn()) return true;
  const target =
    redirectTo ||
    (typeof window !== "undefined"
      ? window.location.pathname + window.location.search
      : "/");
  try { localStorage.setItem(REDIRECT_KEY, target); } catch {}
  const qs = `redirect=${encodeURIComponent(target)}&returnTo=${encodeURIComponent(target)}`;
  navigate(`/login?${qs}`, { replace: true });
  return false;
}
export function consumePendingNext() {
  try {
    const v = localStorage.getItem(REDIRECT_KEY);
    if (v) { localStorage.removeItem(REDIRECT_KEY); return v; }
  } catch {}
  return null;
}
export function redirectBackAfterLogin(navigate, fallback = "/") {
  const saved = consumePendingNext();
  navigate(saved || fallback, { replace: true });
}

/*** ===== Helpers map theo format backend của bạn =====
 * Backend trả về:
 *  - /api/Auth/login:
 *      { token, userId, fullName, refreshToken, studentId, teacherId }
 *  - /api/Auth/refresh-token:
 *      { token, userId, fullName, refreshToken, studentId, teacherId }
 */

/**
 * Dùng ngay sau khi gọi /api/Auth/login
 * Tự động lưu token/refresh + user hiển thị.
 */
export function setLoginPayload(loginJson) {
  if (!loginJson) return;
  setTokens({
    accessToken: loginJson.token,
    refreshToken: loginJson.refreshToken,
  });
  setUserDisplay({
    name: loginJson.fullName,
    email: loginJson.email,     // nếu backend có
    avatarUrl: loginJson.avatar // nếu backend có
  });
}

/**
 * Dùng sau /api/Auth/refresh-token
 * Lưu lại token/refresh mới + cập nhật user hiển thị (nếu có).
 */
export function setRefreshPayload(refreshJson) {
  if (!refreshJson) return;
  setTokens({
    accessToken: refreshJson.token,
    refreshToken: refreshJson.refreshToken,
  });
  if (refreshJson.fullName || refreshJson.email || refreshJson.avatar) {
    setUserDisplay({
      name: refreshJson.fullName,
      email: refreshJson.email,
      avatarUrl: refreshJson.avatar
    });
  }
}

/*** ===== Tiện ích nhỏ: fetch có kèm Bearer (tuỳ chọn dùng) ===== ***/
// Ví dụ:
// const res = await authFetch('/api/secure', { method: 'GET' });
export async function authFetch(input, init = {}) {
  const headers = { ...(init.headers || {}), ...authHeader() };
  return fetch(input, { ...init, headers });
}

