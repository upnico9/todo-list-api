import client from "../database/connector.js";
import bcrypt from 'bcryptjs';

class User {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    static async getByLogin(login) {
        const response = await client.query('SELECT * FROM users WHERE login = $1', [login]);

        if (response.rows.length === 0) {
            return false;
        }

        return response.rows[0];
    }

    static async create(login, password) {
        const creation_date = new Date();
        const response = await client.query('INSERT INTO public.users (login, password, created_at, updated_at) VALUES ($1, $2, $3, $3) RETURNING *', [login, password, creation_date]);

        if (response.rowCount === 0) {
            return 'User not created';
        }

        return response.rows[0];
    }

    async delete(login) {
        const response = await client.query('DELETE FROM users WHERE login = $1', [login]);

        if (response.rowCount === 0) {
            return false;
        };

        return true;
    }

    static async getPasswordBylogin(login) {
        const response = await client.query('SELECT password FROM users WHERE login = $1', [login]);
        if (response.rows.length === 0) {
            return false;
        };

        return response.rows[0].password;
    }

    static async comparePassword(login, password) {
        const passwordData = await this.getPasswordBylogin(login);
        return await bcrypt.compare(password, passwordData);
    }
}

export default User;