import client from "../database/connector.js";

class Task {
    constructor(id, userId, title, description, status, created_at) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.created_at = created_at
    }


    async update(id, title, description, status) {
        const updated_at = new Date();
        const response = await client.query('UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = $5 WHERE id = $4', [title, description, status, id, updated_at]);

        if (response.rowCount === 0) {
            return 'Task not updated';
        };

        return `Task with id ${this.id} updated`;
    }

    async delete(id) {
        const response = await client.query('DELETE FROM tasks WHERE id = $1' , [id]);

        if (response.rowCount === 0) {
            return 'Task not deleted';
        };

        return `Task with id ${this.id} deleted`;
    }

    static async create(userId, title, description) {
        const status = 'Todo';
        const creation_date = new Date();
        const response = await client.query('INSERT INTO tasks (user_id, title, description, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $5) RETURNING *', [userId, title, description, status, creation_date]);

        if (response.rowCount === 0) {
            return 'Task not created';
        }

        return response.rows[0];
    }

    static async getById(id, userId) {
        const response = await client.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
        if (response.rows.length === 0) {
            return 'Task not found';
        };

        const { title, description, status, created_at } = response.rows[0];
        return new Task(id, userId, title, description, status, created_at);
    }

    static async getAll(user_id) {
        const response = await client.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
        if (response.rows.length === 0) {
            return 'Tasks not found';
        };

        return response.rows.map(({id ,title, description, status }) => new Task(id, user_id, title, description, status));
    }

}

export default Task;