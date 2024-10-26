import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Client } = pg;


const client = new Client({
    user: process.env.DATABASE_USER || 'nicolas',
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE_NAME || 'todo_app',
    password: process.env.DATABASE_PASSWORD ||'test_password',
    port: process.env.PORT || 5432,
    options: '-c search_path=public'
});


async function connect() {
    try {
        await client.connect();
        console.log('Connected to the database successfully.');
    } catch (err) {
        console.error('Connection to the database failed.', err.stack);
    }
}

await connect();

export default client;


