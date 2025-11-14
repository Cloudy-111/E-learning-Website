import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <-- đọc từ ENV (5102)
  headers: {
    "Content-Type": "application/json",
    // backend đôi khi trả text/plain nên Accept thêm text/plain
    Accept: "application/json, text/plain;q=0.9,*/*;q=0.8",
  },
  withCredentials: false, // để true nếu BE dùng cookie
});

// Gắn token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Chuẩn hoá response khi server trả text nhưng là JSON
api.interceptors.response.use(
  (res) => {
    if (typeof res.data === "string") {
      try { res.data = JSON.parse(res.data); } catch {}
    }
    return res;
  },
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      err?.message ||
      "Request error";
    return Promise.reject(new Error(msg));
  }
);
