const express = require('express');
const controller = require('./controllers/userController');
const router = express.Router();


//POST /users: create a new user account
router.post('/', controller.create);

//POST /users/login: authenticate user's login
router.post('/login', controller.login);

module.exports = router;