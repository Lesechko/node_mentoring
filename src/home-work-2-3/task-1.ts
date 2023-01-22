import express from "express";
import { userRouter } from "./routes/index.js";
import { runDB } from "./DB/index.js";
import { defineModels } from "./models/User.js";

const app = express();
const PORT = 7000;
const host = "127.0.0.1";

app.use(express.json());
app.use("/users", userRouter);

const sequelize = await runDB();
defineModels(sequelize);

app.listen(PORT, host, () => {
  console.log(`Server listens http://${host}:${PORT}`);
});
