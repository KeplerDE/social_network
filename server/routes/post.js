const express = require('express');
const formidable = require('express-formidable')
const router = express.Router();
 
// middleware
const { requireSignIn } = require('../middlewares/index');

// controllers
const { createPost, uploadImage } = require('../controllers/post');


router.post('/create-post', requireSignIn, createPost);
router.post('/upload-image', requireSignIn, formidable({ maxFileSize: 5 * 1024 * 1024 }), uploadImage);

module.exports = router;
