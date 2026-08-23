import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPen,
  MessageCircleQuestionMark,
  BanknoteArrowUp,
  Scale,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

export function ProfileForm({ user }: { user: User | null }) {
  const { patchUser } = useAuth();
  const { setIsLoading, setError } = useAuthStore();
  const [name, setName] = useState(user?.name ?? "");
  const [income, setIncome] = useState<number | null>(user?.income ?? null);
  const [age, setAge] = useState<number | null>(user?.age ?? null);
  const [balance, setBalance] = useState<number | null>(user?.balance ?? null);

  const navigate = useNavigate();

  const handleEditProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await patchUser({ name, age, balance, income });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to edit edit profile");
    } finally {
      setIsLoading(false);
    }
  };
