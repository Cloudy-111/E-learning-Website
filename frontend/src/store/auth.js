import { create } from "zustand";

// POST /api/Auth/register  { Username, Email, Password }
// POST /api/Auth/login     { Email, Password }

const defaultState = {
  user: null,
};

function handleLocalLogin(user) {
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export const useAuth = create((set) => ({
  ...defaultState,

  login: async ({ email, password }) => {
    try {
      const res = await fetch("/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw err?.message || "Đăng nhập thất bại";
      }

      const u = { id: "u_" + Date.now(), name: email.split("@")[0], email };
      handleLocalLogin(u);
      set({ user: u });
      return u;
    } catch (err) {
      console.warn("Auth login error, falling back to mock:", err);
      const u = { id: "u1", name: email.split("@")[0], email };
      handleLocalLogin(u);
      set({ user: u });
      return u;
    }
  },

  register: async ({ name, email, password }) => {
    const res = await fetch("http://localhost:5102/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: name,
        Email: email,
        Password: password,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const msg = data?.message || data || "Đăng ký thất bại";
      throw msg;
    }

    const u = { id: "u_" + Date.now(), name, email };
    handleLocalLogin(u);
    set({ user: u });
    return u;
  },

  logout: () => {
    localStorage.removeItem("auth_user");
    set({ user: null });
  },

  hydrate: () => {
    const raw = localStorage.getItem("auth_user");
    if (raw) set({ user: JSON.parse(raw) });
  },
}));
