const { User } = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerEmployee = async (req, res) => {
    const user = req.body;

    try {
        const existingUser = await User.findOne({ username: user.username }).exec();
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: hashedPassword,
            isAdmin: false
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports = {
    registerEmployee
}