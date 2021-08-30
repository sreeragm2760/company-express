const express = require('express');
const { signup, sigin, login } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login)

module.exports = router;