const express = require('express');
const router = express.Router();

// middleware
const { requireSignIn } = require('../middlewares/index');

// controllers
const { register, login, currentUser } = require('../controllers/auth');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Current user route
router.get('/current-user', requireSignIn, currentUser);

module.exports = router;
