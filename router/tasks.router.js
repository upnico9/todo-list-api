import { Router } from "express";
import { authenticate } from "../middleware/auth.js";
import { createTask, deleteTask, updateTask, getTaskById, getAllTasks } from "../controller/tasks.controller.js";

const router = Router();

router.use(authenticate);

router.get("/", (req, res) => getAllTasks(req, res));

router.get("/:id", (req, res) => getTaskById(req, res));

router.post("/", (req, res) => createTask(req, res));

router.put("/:id", (req, res) => updateTask(req, res));

router.delete("/:id", (req, res) => deleteTask(req, res));

export default router;