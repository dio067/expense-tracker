import axios from "axios";
import { Config } from "@/constants";

const api = axios.create({
  baseURL: Config.API_URL,
  withCredentials: true,
});

const publicPaths = ["/", "/login", "/register"];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/auth/refresh-token");
    if (
      error.response?.status === 401 &&
      !isAuthRoute &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${Config.API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        if (!publicPaths.includes(window.location.pathname)) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
