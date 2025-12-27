import { create } from "zustand";
import { api } from "../lib/api";

export const useAuth = create((set, get) => ({
  user: null,
  isHydrated: false,

  hydrate: () => {
    try {
      const raw = localStorage.getItem("auth_state");
      if (raw) {
        const state = JSON.parse(raw);
        if (state?.user) set({ user: state.user });
        if (state?.token) localStorage.setItem("app_access_token", state.token);
        if (state?.refreshToken)
          localStorage.setItem("app_refresh_token", state.refreshToken);
      }
    } catch { }
    set({ isHydrated: true });
  },

  login: async ({ email, password, remember = false }) => {
    try {
      const res = await api.post("/api/Auth/login", { email, password });
      const {
        token,
        refreshToken,
        userId,
        fullName,
        studentId = null,
        teacherId = null,
      } = res.data || {};

      if (!token || !userId) {
        const e = new Error("Đăng nhập thất bại: thiếu token hoặc userId");
        e.code = "MALFORMED_RESPONSE";
        throw e;
      }

      const user = { id: userId, fullName, studentId, teacherId };

      localStorage.setItem("app_access_token", token);
      localStorage.setItem("app_refresh_token", refreshToken || "");
      if (remember) {
        localStorage.setItem(
          "auth_state",
          JSON.stringify({ user, token, refreshToken })
        );
      } else {
        localStorage.removeItem("auth_state");
      }

      set({ user });
      return user;
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg =
        err?.response?.data?.message || err?.data?.message || err?.message;

      let friendly = "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.";
      if (status === 401) {
        friendly =
          serverMsg || "Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.";
      } else if (serverMsg?.toLowerCase?.().includes("network")) {
        friendly = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.";
      } else if (serverMsg) {
        friendly = serverMsg;
      }

      const e = new Error(friendly);
      e.code = status || "LOGIN_FAILED";

      throw e;
    }
  },

  register: async (data) => {
    try {
      const payload = {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth || null,
        gender: data.gender || null,
        avatarUrl: data.avatarUrl || null,
        socialLinks: data.socialLinks || null,
      };

      // 1) Gọi API đăng ký
      const res = await api.post("/api/Auth/register", payload);

      // 2) KHÔNG auto-login, KHÔNG lưu token ở đây
      return { ok: true };
    } catch (err) {
      const status = err?.response?.status;
      const data = err?.response?.data;
      const code = data?.code || data?.error || "";
      const message = data?.message || "";

      if (
        status === 409 ||
        /already exists|đã tồn tại/i.test(message) ||
        /exists/i.test(code)
      ) {
        if (/email/i.test(message) || /EMAIL/i.test(code)) {
          throw new Error("Email đã tồn tại.");
        }
        if (/username|account|tài khoản/i.test(message)) {
          throw new Error("Tài khoản đã tồn tại.");
        }
        throw new Error("Tài khoản hoặc email đã tồn tại.");
      }

      if (status === 400) {
        const errors = data?.errors || data?.Errors;
        const passErr =
          errors?.Password?.[0] ||
          errors?.password?.[0] ||
          (/password/i.test(message) ? message : "");

        if (passErr) {
          throw new Error("Mật khẩu chưa tuân thủ quy tắc.");
        }

        const emailErr = errors?.Email?.[0] || errors?.email?.[0];
        if (emailErr && /exist|tồn tại/i.test(emailErr)) {
          throw new Error("Email đã tồn tại.");
        }
        const userErr =
          errors?.Username?.[0] ||
          errors?.username?.[0] ||
          errors?.Account?.[0];
        if (userErr && /exist|tồn tại/i.test(userErr)) {
          throw new Error("Tài khoản đã tồn tại.");
        }

        if (message) {
          if (/password/i.test(message))
            return new Error("Mật khẩu chưa tuân thủ quy tắc.");
          if (/email.*exist|đã tồn tại/i.test(message))
            return new Error("Email đã tồn tại.");
          if (/username|account.*exist|đã tồn tại/i.test(message))
            return new Error("Tài khoản đã tồn tại.");
          throw new Error(message);
        }

        throw new Error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
      }

      if (err?.message?.toLowerCase?.().includes("network")) {
        throw new Error(
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng."
        );
      }

      throw new Error(
        message || "Không thể tạo tài khoản. Vui lòng thử lại sau."
      );
    }
  },

  logout: () => {
    localStorage.removeItem("app_access_token");
    localStorage.removeItem("app_refresh_token");
    localStorage.removeItem("auth_state");
    localStorage.removeItem("auth_user");
    set({ user: null });
  },

  ping: async () => (await api.get("/api/Auth/test")).data,
  claims: async () => (await api.get("/api/Auth/claims")).data,
}));
