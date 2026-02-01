const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const seed = async () => {
    try {
        // 1. Create Connection to MySQL Server (no DB selected yet)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log('Connected to MySQL...');

        // 2. Create DB
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database ${process.env.DB_NAME} created or exists.`);

        await connection.end();

        // 3. Connect to DB and Create Tables
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const schema = `
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          role ENUM('Admin', 'Employee') NOT NULL DEFAULT 'Employee',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
          status ENUM('Pending', 'In Progress', 'Completed', 'Approved', 'Rejected') DEFAULT 'Pending',
          assigned_to INT,
          created_by INT,
          due_date DATE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
          FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS activity_logs (
          id INT AUTO_INCREMENT PRIMARY KEY,
          task_id INT,
          user_id INT,
          action VARCHAR(255) NOT NULL,
          details TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `;

        // Split by semicolon and run each
        const statements = schema.split(';').filter(s => s.trim());
        for (let statement of statements) {
            await db.query(statement);
        }
        console.log('Tables created.');

        // 4. Seed Admin & Employee
        const salt = await bcrypt.genSalt(10);
        const adminHash = await bcrypt.hash('admin123', salt);
        const employeeHash = await bcrypt.hash('emp123', salt);

        // Check if admin exists
        const [existing] = await db.query("SELECT * FROM users WHERE email = 'admin@ironlady.com'");
        if (existing.length === 0) {
            await db.query("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
                ['Admin User', 'admin@ironlady.com', adminHash, 'Admin']);
            console.log('Admin user created: admin@ironlady.com / admin123');
        }

        const [existingEmp] = await db.query("SELECT * FROM users WHERE email = 'employee@ironlady.com'");
        if (existingEmp.length === 0) {
            await db.query("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
                ['John Doe', 'employee@ironlady.com', employeeHash, 'Employee']);
            console.log('Employee user created: employee@ironlady.com / emp123');
        }

        console.log('Seeding complete.');
        await db.end();
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
