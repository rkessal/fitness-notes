import dayjs from "dayjs";
import pino from "pino";

const transport = pino.transport({
  target: "pino-pretty",
  options: { colorize: true },
});

const logger = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
  },
  transport
);

export default logger;
