const fs = require('fs');
const path = require('path');

// Upload handler
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = {
        path: req.file.path,
        filename: req.file.filename,
        uploader: req.user.id,
        role: req.user.role,
    };

    // Save this file info in your DB here, if you're using MongoDB
    res.status(201).json({ message: 'File uploaded successfully', file });
};

// Role-based view
const viewFiles = (req, res) => {
    const userRole = req.user.role;
    const userId = req.user.id;

    const allFiles = fs.readdirSync('uploads/');
    let accessibleFiles = [];

    allFiles.forEach(file => {
        const [timestamp, uploader] = file.split('-');

        if (userRole === 'admin') {
            accessibleFiles.push(file);
        } else if (userRole === 'manager' && (file.includes('manager') || file.includes(userId))) {
            accessibleFiles.push(file);
        } else if (userRole === 'user' && file.includes(userId)) {
            accessibleFiles.push(file);
        }
    });

    res.json({ files: accessibleFiles });
};

module.exports = { uploadFile, viewFiles };
