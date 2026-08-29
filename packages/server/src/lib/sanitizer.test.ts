import { describe, it, expect } from "vitest";
import { toPublicUser } from "./sanitizer";

describe("toPublicUser", () => {
  it("strips password and refreshToken from the user record", () => {
    const result = toPublicUser({
      id: 1,
      name: "Yousef",
      email: "yousef@example.com",
      password: "hashed",
      refreshToken: "token",
    } as any);

    expect(result).not.toHaveProperty("password");
    expect(result).not.toHaveProperty("refreshToken");
    expect(result.email).toBe("yousef@example.com");
  });
});
