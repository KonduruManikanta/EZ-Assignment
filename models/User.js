// For SQLite, we don’t have a strict schema, but we assume a simple table setup
const db = require('../config/db');

const createUserTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    `;
    db.run(query);
};

createUserTable();

module.exports = db;
