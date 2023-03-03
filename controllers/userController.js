const { User } = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerEmployee = async (req, res) => {
    const user = req.body;

    try {
        const existingUser = await User.findOne({ username: user.username }).exec();
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
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

const userLogin = async (req, res) => {
    const user = req.body;
    if (!user.username || !user.password) {
        console.log(user.username, user.password);
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const existingUser = await User.findOne({ username: user.username });

        if (!existingUser) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(user.password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({
            id: existingUser._id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName
        }, process.env.JWT_SECRET, { expiresIn: 3600 });

        res.status(200).json({
            token,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                username: existingUser.username,
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// https://levelup.gitconnected.com/authentication-using-jwt-in-mern-1cc5c8ccd03c


module.exports = {
    registerEmployee,
    userLogin
}