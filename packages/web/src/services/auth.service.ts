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
