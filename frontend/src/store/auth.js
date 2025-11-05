import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  login: async ({ email, password }) => {
    // mock: nhận mọi email/pass
    const u = { id: "u1", name: email.split("@")[0], email };
    localStorage.setItem("auth_user", JSON.stringify(u));
    set({ user: u });
    return u;
  },
  register: async ({ name, email, password }) => {
    const u = { id: "u_" + Date.now(), name, email };
    localStorage.setItem("auth_user", JSON.stringify(u));
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
