import type { User } from "@/generated/prisma/client";

export function toPublicUser<T extends Partial<User>>(user: T) {
  const { password, refreshToken, ...safe } = user;
  return safe;
}
