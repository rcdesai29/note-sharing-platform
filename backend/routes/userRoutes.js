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


userRouter.post('/:id/follow', async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!userToFollow || !currentUser) {
            return res.status(404).send("User not found");
        }

        if (!userToFollow.followers.includes(currentUser._id)) {
            userToFollow.followers.push(currentUser._id);
            currentUser.following.push(userToFollow._id);

            await userToFollow.save();
            await currentUser.save();

            res.status(200).send("User followed successfully");
        } else {
            res.status(400).send("You are already following this user");
        }
    } catch (error) {
        res.status(500).send("Error following user");
    }
});

userRouter.post('/:id/unfollow', async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).send("User not found");
        }

        if (userToUnfollow.followers.includes(currentUser._id)) {
            userToUnfollow.followers = userToUnfollow.followers.filter(
                (id) => !id.equals(currentUser._id)
            );
            currentUser.following = currentUser.following.filter(
                (id) => !id.equals(userToUnfollow._id)
            );

            await userToUnfollow.save();
            await currentUser.save();

            res.status(200).send("User unfollowed successfully");
        } else {
            res.status(400).send("You are not following this user");
        }
    } catch (error) {
        res.status(500).send("Error unfollowing user");
    }
});

module.exports = userRouter;