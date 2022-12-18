declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PORT?: string;
    COOKIE_SECRET: string;
    COOKIE_NAME: string;
    REDIS_URL: string;
    DATABASE_URL: string;
  }
}
