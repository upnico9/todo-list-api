import client from "../database/connector.js";


export async function create(userId, title, description) {
    const status = 'Todo';
    const date = new Date();

    const response = await client.query('INSERT INTO tasks (user_id, title, description, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $5) RETURNING *', [userId, title, description, status, date]);

    if (response.rowCount === 0) {
        return false;
    }

    const taskObject = { 
        id: response.rows[0].id,
        title: response.rows[0].title,
        description: response.rows[0].description,
    }

    return taskObject;
}

export async function getById(id, userId) {
    const response = await client.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);

    if (response.rows.length === 0) {
        return false;
    }

    const taskObject = {
        title: response.rows[0].title,
        description: response.rows[0].description,
        status: response.rows[0].status,
    }

    return taskObject;

}

export async function deleteById(id, userId) {
    const response = await client.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);

    if (response.rowCount === 0) {
        return false;
    }

    return true;
}

export async function updateById(id, user_id, fields_to_update) {
    const updated_at = new Date();
    const { title, description, status } = fields_to_update;
    const response = await client.query('UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = $4 WHERE id = $5 AND user_id = $6', [title, description, status, updated_at, id, user_id]);
    
    if (response.rowCount === 0) {
        return false;
    }
    // fill with each field to update keys and values if they are not empty
    const taskObject = {
        id: id,
        title: title,
        description: description,
        status: status,
    }


    return taskObject;
}

export async function getAll(user_id, page, limit) {
    console.log(user_id, page, limit);
    const response = await client.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3', [user_id, limit, (page - 1) * limit]);
    return response.rows.map(({title, description, status}) => ({title, description, status}));
}
