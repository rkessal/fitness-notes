import session from "express-session";
import config from "config";
import Redis from "ioredis";
import connectRedis from "connect-redis";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const cookieSecret =
  process.env.NODE_ENV === "production"
    ? process.env.COOKIE_SECRET
    : "randomsecret";
const redisClient = new Redis({
  connectionName:
    process.env.NODE_ENV === "production" ? process.env.REDIS_URL : "",
});
const RedisStore = connectRedis(session);

const expressSession = session({
  name: "sid",
  store: new RedisStore({ client: redisClient, logErrors: true }),
  resave: false,
  saveUninitialized: false,
  secret: cookieSecret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 10,
    sameSite: true,
    secure: "auto",
  },
});

export default expressSession;
