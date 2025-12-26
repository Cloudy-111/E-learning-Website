const BASE_URL = "http://localhost:5102";

export async function baseFetch(path, options = {}) {
  // Lấy token từ localStorage
  const token = localStorage.getItem("app_access_token");

  // Merge headers: giữ custom headers nếu có, thêm Authorization nếu có token
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Thêm Authorization header nếu có token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw body?.message || `Request failed: ${res.status}`;
  }

  return res.json();
}
