import pg from 'pg';
const { Client } = pg;

const client = new Client({
    user: 'nicolas',
    host: 'localhost',
    database: 'todo_app',
    password: 'test_password',
    port: 5432,
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


