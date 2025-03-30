const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { hashPassword } = require('../utils/hashPassword');

exports.signup = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, userRole, premiumExpiry } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });

        const hashedPassword = await hashPassword(password);

        const profilePicUrl = req.file ? req.file.path : null;

        user = new User({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            userRole,
            profilePic: profilePicUrl,
            premiumExpiry: premiumExpiry || null
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.googleSignup = async (req, res) => {
    try {
        const { googleId, fullName, email, profilePic, userRole, premiumExpiry } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                googleId,
                fullName,
                email,
                profilePic,
                userRole,
                premiumExpiry: premiumExpiry || null
            });
            await user.save();
        }else{
            return res.status(400).json({ error: 'User already exists' });
        }

        res.status(200).json({ message: 'Google Signup successful', user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
