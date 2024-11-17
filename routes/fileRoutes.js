const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadFile, listFiles, downloadFile } = require('../controllers/fileController'); // Import the functions
const verifyToken = require('../middleware/authMiddleware'); // Import token verification middleware
const router = express.Router();

// Multer setup for file upload
const allowedFileTypes = /jpeg|jpg|png|pdf|txt/;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);

    if (extname && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid file type. Only .txt, .pdf, .jpg, .png are allowed.'), false);
    }
};

const upload = multer({ storage, fileFilter }).single('file');

// Routes
router.post('/upload', verifyToken, upload, uploadFile);  // Ensure upload function is defined and imported correctly
router.get('/list-files', verifyToken, listFiles);         // Ensure listFiles function is defined and imported correctly
router.get('/download-file/:id', verifyToken, downloadFile);  // Ensure downloadFile function is defined and imported correctly

module.exports = router;

exports.uploadFile = (req, res) => {
    // Your upload logic here
    res.status(200).send({ message: 'File uploaded successfully' });
};
