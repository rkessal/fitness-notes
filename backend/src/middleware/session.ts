import session from "express-session";
import config from "../../config/config";
import Redis from "ioredis";
import connectRedis from "connect-redis";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const cookieSecret =
  config.NODE_ENV === "production" ? config.COOKIE_SECRET : "randomsecret";
const redisClient = new Redis(config.REDIS_URL);
export const RedisStore = connectRedis(session);

const expressSession = session({
  name: "sid",
  store: new RedisStore({
    client: redisClient,
    logErrors: true,
  }),
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
