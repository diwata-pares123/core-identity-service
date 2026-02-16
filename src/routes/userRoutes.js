const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authGuard = require('../middlewares/authGuard');

// Public: Anyone can register
router.post('/register', userController.registerUser);

// Protected: Only those with the API Key can see all users
router.get('/', authGuard, userController.getUsers);

// Public: Fetching a single user
router.get('/:id', userController.getUserById);

module.exports = router;