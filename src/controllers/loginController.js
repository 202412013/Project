const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { comparePassword } = require('../utils/hashPassword');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user){
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
        const isMatch = await comparePassword(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Email or Password' });
        }
        
        res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
