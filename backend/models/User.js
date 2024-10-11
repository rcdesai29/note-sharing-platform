const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'First Name Required']},
    lastName: {type: String, required: [true, 'Last Name is required']},
    email: {type: String, required: [true, 'Email is required'], unique: true},
    password: {type: String, required: [true, 'Password is required']}
});

mongo.exports = mongoose.model('User', userSchema)