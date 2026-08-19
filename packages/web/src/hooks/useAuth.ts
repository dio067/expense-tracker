import { authMe, update, login, register, logout } from "@/services";
import { useAuthStore } from "@/store/auth.store";
import type { AlterUserPayload } from "@/types";

export const useAuth = () => {
  const { user, setUser, setIsLoading, setError, signout, isAuthenticated } =
    useAuthStore();
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await authMe();
      if (res.ok && res.data) {
        setUser(res.data);
        return isAuthenticated;
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const patchUser = async (payload: AlterUserPayload) => {
    setIsLoading(true);
    try {
      const res = await update(payload);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async (payload: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await login(payload);
      setUser({ id: res.id, name: res.name, email: res.email });
    } catch (err: unknown) {
      const apiError = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      const msg = apiError.response?.data?.error ?? "Login failed";
      console.log(
        "ERROR:",
        JSON.stringify(apiError.response?.data),
        apiError.message,
      );
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await register(payload);
      setUser({ id: res.id, name: res.name, email: res.email });
    } catch (err: unknown) {
      const apiError = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      const msg = apiError.response?.data?.error ?? "Registeration failed";
      console.log(
        "ERROR:",
        JSON.stringify(apiError.response?.data),
        apiError.message,
      );
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await logout();
      signout();
    } catch (err: unknown) {
      const apiError = err as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      const msg = apiError.response?.data?.error ?? "Logout failed";
      console.log(
        "ERROR:",
        JSON.stringify(apiError.response?.data),
        apiError.message,
      );
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    checkAuth,
    patchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
