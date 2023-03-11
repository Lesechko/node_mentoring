import express from "express";
import { groupRouter, userRouter } from "./routes/index.js";
import { runDB } from "./DB/index.js";
import {
  errorMiddleware,
  logger,
  requestLogger,
} from "./middleware/logger.middleware.js";

const app = express();
const PORT = 7000;
const host = "127.0.0.1";

app.use(express.json());
app.use(requestLogger);
app.use("/users", userRouter);
app.use("/groups", groupRouter);

await runDB();

app.use(errorMiddleware);

process.on("unhandledRejection", (reason, promise) => {
  const message = `Unhandled Rejection at: ${promise} reason: ${reason}`;

  logger.error({ message });
});

process.on("uncaughtException", (err) => {
  const message = `Uncaught Exception: ${err}`;

  logger.error({ message });

  process.exit(1);
});

app.listen(PORT, host, () => {
  console.log(`Server listens http://${host}:${PORT}`);
});
