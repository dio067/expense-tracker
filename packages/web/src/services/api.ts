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
      originalRequest?.url?.includes("/refresh-token");
    if (
      error.response?.status === 401 &&
      !isAuthRoute &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
