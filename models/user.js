const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        isAdmin: this.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_IN });

    return token;
}


module.exports = {
    User: mongoose.model('User', userSchema)
}