import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { SpinnerBasic } from "@/components/common";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <SpinnerBasic />;
  return isAuthenticated ? <>{children}</> : null;
}
