import ms from "ms";

const authConfig = {
  secret: process.env.AUTH_SECRET as string,
  secret_expires_in: process.env.AUTH_SECRET_EXPIRES_IN as string,
  refresh: process.env.AUTH_REFRESH as string,
  refresh_expires_in: process.env.AUTH_REFRESH_EXPIRES_IN as string,
};

export const { secret, secret_expires_in, refresh, refresh_expires_in } =
  authConfig;

export const ACCESS_TOKEN_MAX_AGE_MS = ms(secret_expires_in as ms.StringValue);
export const REFRESH_TOKEN_MAX_AGE_MS = ms(
  refresh_expires_in as ms.StringValue,
);
