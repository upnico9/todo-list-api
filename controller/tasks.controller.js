import { create, deleteById, getById, updateById, getAll} from "../models/tasks.model.js";
import User from "../models/user.model.js";

export async function createTask(req, res) {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({message: 'Title and description are required'});
        }

        const userLogin = req.user.login
        const user = await User.getByLogin(userLogin);

        if (!user) {
            return res.status(403).json({message: 'Forbidden'});
        }

        const task = await create(user.id, title, description);

        if (!task) {
            return res.status(500).json({message: 'Task not created'});
        }

        res.status(200).json(task);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export async function getTaskById(req, res) {
    try {
        const { id } = req.params;

        const userLogin = req.user.login;
        const user = await User.getByLogin(userLogin);

        if (!user) {
            return res.status(403).json({message: 'Forbidden'});
        }

        const task = await getById(id, user.id);

        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        const userLogin = req.user.login;

        const user = await User.getByLogin(userLogin);

        if (!user) {
            return res.status(403).json({message: 'Forbidden'});
        }

        const task = await getById(id, user.id);

        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        const response = await deleteById(id, user.id);
        if (!response) {
            return res.status(500).json({message: 'Task not deleted'});
        }

        return res.status(204).send();
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        
        const userLogin = req.user.login;
        const user = await User.getByLogin(userLogin);

        if (!req.body.title && !req.body.description && !req.body.status) {
            return res.status(400).json({message: 'Title, description and status are required'});
        }

        const updatableFields = ['title', 'description', 'status'];
        const update = {};
        updatableFields.forEach(field => {
            if (req.body[field]) {
                update[field] = req.body[field];
            }
        });

        if (!user) {
            return res.status(403).json({message: 'Forbidden'});
        }

        const task = await getById(id, user.id);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }

        const response = await updateById(id, user.id, update);

        if (!response) {
            return res.status(500).json({message: 'Task not updated'});
        };

        return res.status(200).json(Object.assign(task, response));
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }

}

export async function getAllTasks(req, res) {
    // parse query for page and limit
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const userLogin = req.user.login;
    const user = await User.getByLogin(userLogin);

    if (!user) {
        return res.status(403).json({message: 'Forbidden'});
    }

    // get all tasks
    const tasks = await getAll(user.id, page, limit);
    console.log(tasks);
    const nbTasks = tasks.length;

    const taskObject = {
        data: tasks,
        page: page,
        limit: limit,
        total: nbTasks
    }

    return res.status(200).json(taskObject);
}












// export async function getAllTasks(req, res) {
//     try {
//         const userLogin = req.user.login;
//         const user = await User.getByLogin(userLogin);

//         const tasks = await Task.getAll(user.id);
//         res.json(tasks);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: error});
//     }
// }

// export async function updateTask(req, res) {
//     try {
//         const { id } = req.params;

//         // check req.body for empty fields
//         const title = req.body.title ;
//         const description = req.body.description;
//         const status = req.body.status;

        
//         const userLogin = req.user.login;
//         const user = await User.getByLogin(userLogin);

//         const task = await Task.getById(id, user.id);
//         if (task === 'Task not found') {
//             return res.status(404).json({message: 'Task not found'});
//         }

//         const mergedTask = await task.update(id, title || task.title, description || task.description, status || task.status);
        
//         console.log(mergedTask);
//         res.json(mergedTask);
//         // const response = await Task.update(id, title, description, status);
//         // res.json(response);
//     } catch (error) {
//         res.status(500).json({message: error});
//     }
// }

// export async function deleteTask(req, res) {
//     try {
//         const userLogin = req.user.login;
//         const user = await User.getByLogin(userLogin);

//         const { id } = req.params;


//         const task = await Task.getById(id, user.id);
//         if (task === 'Task not found') {
//             return res.status(404).json({message: 'Task not found'});
//         }
//         const response = task.delete(id);
//         res.json({message: response});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: error});
//     }
// }

