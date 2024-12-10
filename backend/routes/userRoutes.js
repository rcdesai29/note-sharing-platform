const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const userRouter = express.Router();

async function issueAuthToken(user){
    const payload = {_id: user._id, email: user.email};
    const secret = process.env.JWT_SECRET;
    const options = {expiresIn: '1h'};

    const token = jwt.sign(payload, secret, options);
    return token;
}


function issueAuthCookie(res, token){
    const cookieOptions = {httpOnly: true, maxAge: 1000*60*60, secure: true, sameSite: 'strict'};
    res.cookie('authToken', token, cookieOptions);
}
  
userRouter.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Sign Up Successful');
    } catch (error) {
        console.error('Error Signing Up:', error);
        res.status(500).send('Error Signing Up');
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))){
            const authToken = await issueAuthToken(user);
            issueAuthCookie(res, authToken);
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



userRouter.get('/profile', async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send('Error fetching profile');
    }
});

module.exports = userRouter;