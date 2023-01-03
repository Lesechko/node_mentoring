import express from "express";
import { userRouter } from "./routes/index.js";

const app = express();
const PORT = 7000;
const host = "127.0.0.1";

app.use(express.json());
app.use("/users", userRouter);

app.listen(PORT, host, () => {
  console.log(`Server listens http://${host}:${PORT}`);
});
