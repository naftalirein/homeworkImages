// routes/processRouter.js
const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');

router.get('/', processController.processFile);

module.exports = router;