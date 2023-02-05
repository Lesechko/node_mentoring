import express from "express";
import { groupRouter, userRouter } from "./routes/index.js";
import { runDB } from "./DB/index.js";

const app = express();
const PORT = 7000;
const host = "127.0.0.1";

app.use(express.json());
app.use("/users", userRouter);
app.use("/groups", groupRouter);

await runDB();

app.listen(PORT, host, () => {
  console.log(`Server listens http://${host}:${PORT}`);
});
