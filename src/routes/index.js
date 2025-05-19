const express = require('express');
const uploadFile = require('../controllers/index');
const router = express.Router();

const upload = require('../upload'); // Adjust path if needed

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;