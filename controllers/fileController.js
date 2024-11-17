// controllers/fileController.js

const db = require('../config/db'); // Ensure db connection is correctly set

// Function to handle file upload
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const query = `INSERT INTO files (filename, path, size, user_id) VALUES (?, ?, ?, ?)`;

    db.run(query, [req.file.filename, filePath, req.file.size, req.user.id], function(err) {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ message: 'Error uploading file' });
        }
        res.status(201).json({ message: 'File uploaded successfully', file: req.file });
    });
};

// Function to list files
const listFiles = (req, res) => {
    const query = `SELECT * FROM files WHERE user_id = ?`;

    db.all(query, [req.user.id], (err, files) => {
        if (err) {
            console.error('Error retrieving files:', err);
            return res.status(500).json({ message: 'Error retrieving files' });
        }
        res.status(200).json({ files });
    });
};

// Function to handle file download
const downloadFile = (req, res) => {
    const fileId = req.params.id;
    const query = `SELECT * FROM files WHERE id = ? AND user_id = ?`;

    db.get(query, [fileId, req.user.id], (err, file) => {
        if (err || !file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json({
            message: 'File downloaded successfully.',
            file_url: `/uploads/${file.filename}`
        });
    });
};

module.exports = { uploadFile, listFiles, downloadFile };
