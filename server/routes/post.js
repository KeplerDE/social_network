const express = require('express');
const router = express.Router();

// middleware
const { requireSignIn } = require('../middlewares/index');

// controllers
const { createPost } = require('../controllers/post');


router.post('/create-post', requireSignIn, createPost);

module.exports = router;
