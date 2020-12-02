var express = require('express');
var router = express.Router();

let userController = require('../controllers/users');

/* POST User Registration */
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;
