// Assuming a basic file table schema in SQLite
const db = require('../config/db');

const createFileTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        path TEXT NOT NULL,
        size INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `;
    db.run(query);
};

createFileTable();

module.exports = db;
