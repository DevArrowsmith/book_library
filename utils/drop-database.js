const myswl = require('mysql2/promise');
const path = require('path');
const envFile = '../.env.test';

require('dotenv').config({
    path: path.join(__dirname, envFile),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const dropDatabase = async () => {
    try {
        const db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSOWRD,
            port: DB_PORT,
        });
        await db.query(`DROP DATABASE ${DB_NAME}`);
        db.close();
    } catch (error) {
        console.log('Your environment variables may be wrong. Please check the .env file.');
        console.log('Environment variables are:', {
            DB_PASSWORD,
            DB_NAME,
            DB_USER,
            DB_HOST,
            DB_PORT
        });
        console.log(error);
    }
};

dropDatabase();