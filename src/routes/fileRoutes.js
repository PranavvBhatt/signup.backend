const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerconfig');

const verifyToken = require('../middleware/authMiddleware')
const { uploadFile, viewFiles } = require('../controllers/fileController');

router.post('/uploads', verifyToken, upload.single('file'), uploadFile);
router.get('/view', verifyToken, viewFiles);

module.exports = router;
