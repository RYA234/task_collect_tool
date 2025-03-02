import { Client } from 'pg';

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err: any) => console.error('Connection error', err.stack));

export default client;