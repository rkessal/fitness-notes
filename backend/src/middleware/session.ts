import session, { Session } from "express-session";
import config from "config";
import Redis from "ioredis";
import connectRedis from "connect-redis";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const sessionLifeTime = config.get<number>("session_lifetime");
const cookieSecret = config.get<string>("cookie_secret");
const redisClient = new Redis();
const RedisStore = connectRedis(session);

const expressSession = session({
  name: "sid",
  store: new RedisStore({ client: redisClient, logErrors: true }),
  resave: false,
  saveUninitialized: false,
  secret: cookieSecret,
  cookie: {
    maxAge: sessionLifeTime,
    sameSite: true,
    secure: "auto",
  },
});

export default expressSession;
