const appConfig = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT as string),
  node_env: process.env.NODE_ENV,
};

export const { host, port, node_env } = appConfig;
