const db = require('./config/db');

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );
`);

// Create files table
db.run(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    uploaded_by INTEGER NOT NULL,
    encrypted_url TEXT NOT NULL,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
  );
`, (err) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Database setup complete.');
  }

  db.close();
});
