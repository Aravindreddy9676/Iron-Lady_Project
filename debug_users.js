const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const debug = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log('--- Checking Users Table ---');
        const [users] = await db.query('SELECT * FROM users');

        if (users.length === 0) {
            console.log("NO USERS FOUND IN DATABASE!");
        } else {
            for (const u of users) {
                console.log(`Found User: ${u.email} (Role: ${u.role})`);
                // Test password
                const isMatch = await bcrypt.compare('admin123', u.password_hash);
                console.log(`   -> Password 'admin123' matches? ${isMatch}`);

                const isEmpMatch = await bcrypt.compare('emp123', u.password_hash);
                console.log(`   -> Password 'emp123' matches? ${isEmpMatch}`);
            }
        }

        await db.end();
    } catch (error) {
        console.error('Debug failed:', error);
    }
};

debug();
