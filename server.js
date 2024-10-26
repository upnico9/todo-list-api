import express from "express";
import authRouter from "./router/auth.router.js";
import taskRouter from "./router/tasks.router.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", authRouter);
app.use("/tasks", taskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});