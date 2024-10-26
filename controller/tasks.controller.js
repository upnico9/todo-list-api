import Task from "../models/tasks.model.js";
import User from "../models/user.model.js";

export async function createTask(req, res) {
    try {
        const userLogin = req.user.login;
        console.log(userLogin);
        const user = await User.getByLogin(userLogin);
        console.log(user);

        const { title, description } = req.body;
        const task = await Task.create(user.id, title, description);
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export async function getTaskById(req, res) {
    try {
        const userLogin = req.user.login;
        const user = await User.getByLogin(userLogin);

        const { id } = req.params;
        const task = await Task.getById(id, user.id);
        res.json(task);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export async function getAllTasks(req, res) {
    try {
        const userLogin = req.user.login;
        const user = await User.getByLogin(userLogin);

        const tasks = await Task.getAll(user.id);
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;

        // check req.body for empty fields
        const title = req.body.title ;
        const description = req.body.description;
        const status = req.body.status;

        
        const userLogin = req.user.login;
        const user = await User.getByLogin(userLogin);

        const task = await Task.getById(id, user.id);
        if (task === 'Task not found') {
            return res.status(404).json({message: 'Task not found'});
        }

        const mergedTask = await task.update(id, title || task.title, description || task.description, status || task.status);
        
        console.log(mergedTask);
        res.json(mergedTask);
        // const response = await Task.update(id, title, description, status);
        // res.json(response);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export async function deleteTask(req, res) {
    try {
        const userLogin = req.user.login;
        const user = await User.getByLogin(userLogin);

        const { id } = req.params;


        const task = await Task.getById(id, user.id);
        if (task === 'Task not found') {
            return res.status(404).json({message: 'Task not found'});
        }
        const response = task.delete(id);
        res.json({message: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

