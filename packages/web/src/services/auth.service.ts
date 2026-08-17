import type { User, AlterUserPayload } from "@/types";
import api from "./api";

type AuthResponse = {
  id: number;
  name: string;
  email: string;
};
type AuthorizedResponse = {
  ok: boolean;
  message: string;
  data: User | null;
};

const AuthService = {
  authMe: async (): Promise<AuthorizedResponse> => {
    const res = await api.get("/auth/me");
    return res.data;
  },
  update: async (payload: AlterUserPayload) => {
    const res = await api.put("/auth/update", payload);
    return res.data;
  },
  register: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await api.post<AuthResponse>("/auth/register", payload);
    return res.data;
  },
  login: async (payload: { email: string; password: string }) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Failed to logout", err);
    } finally {
      window.location.href = "/login";
    }
  },
};

export const { authMe, login, update, register, logout } = AuthService;
