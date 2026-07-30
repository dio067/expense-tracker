const authConfig = {
  secret: process.env.AUTH_SECRET as string,
  secret_expires_in: process.env.AUTH_SECRET_EXPIRES_IN as string,
  refresh: process.env.AUTH_REFRESH as string,
  refresh_expires_in: process.env.AUTH_REFRESH_EXPIRES_IN as string,
};

export const { secret, secret_expires_in, refresh, refresh_expires_in } =
  authConfig;
