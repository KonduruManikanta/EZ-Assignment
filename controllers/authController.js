const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const crypto = require('crypto'); // To generate the verification code
const jwtSecret = require('../config/jwtSecret');

// Sign-up user
const signup = (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(query, [username, email, hashedPassword], function(err) {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ message: 'Error creating user' });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
};

// Login user
const login = (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;

    db.get(query, [email], (err, user) => {
        if (err || !user) return res.status(400).json({ message: 'Invalid email or password' });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

            const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};






// Simulating email verification
const verifyEmail = (req, res) => {
    const { verification_code } = req.params; // The verification code from the URL

    // This is a simplified check; in a real app, you'd store the code in DB and verify it
    const query = `SELECT * FROM users WHERE verification_code = ?`;
    
    db.get(query, [verification_code], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: 'Invalid or expired verification code.' });
        }

        // Mark the user as verified
        const updateQuery = `UPDATE users SET verified = 1 WHERE verification_code = ?`;
        db.run(updateQuery, [verification_code], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error verifying email.' });
            }
            res.status(200).json({ message: 'Email verified successfully.' });
        });
    });
};

module.exports = { signup, login, verifyEmail };
