const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

// Define the route. Note: the path is just '/' because 
// the prefix '/health' will be defined in app.js
router.get('/', healthController.getHealthStatus);

module.exports = router;