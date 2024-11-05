const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../models/User');


const userRouter = express.Router();

  
userRouter.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Sign Up Successful');
    } catch (error) {
        res.status(500).send('Error Signing Up');
    }
});


userRouter.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))){
            res.cookie('userToken', user._id.toString(), {httpOnly: true});
            res.status(201).send('Login Successful');
        }
    } catch (error) {
        res.status(500).send('Error Logging In');
    }
});


module.exports = userRouter;