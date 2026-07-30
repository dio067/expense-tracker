const appConfig = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT as string),
};

export const { host, port } = appConfig;
