const User = require('../models/User');
const sendEmail = require('../utils/SendEmail');
const { hashPassword } = require('../utils/hashPassword');
require('dotenv').config();

exports.forgotPassword = async (req, res) => {
    try {
        const { email, userType } = req.body;

        console.log("CLIENT_URL:", process.env.CLIENT_URL);
      
        const user = await User.findOne({ email, userRole: userType });

        if (!user) {
            return res.status(404).json({ error: 'Invalid Email or User Type' });
        }

        const baseUrl = process.env.CLIENT_URL;
        console.log(baseUrl);

        const resetLink = `${baseUrl}/reset-password?email=${email}`;

        const emailContent = `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>If you did not request this, please ignore it.</p>
        `;

        const emailResponse = await sendEmail(email, 'Password Reset Request', emailContent);

        if (!emailResponse.success) {
            return res.status(500).json({ error: 'Failed to send email' });
        }

        res.status(200).json({ message: 'Password reset link sent to your email.' });

    } catch (error) {
        res.status(500).json({ error: "Getting 500 error" });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        
        console.log(email);
        console.log(newPassword);

        if (!email || !newPassword) {
            return res.status(400).json({ error: "Email and new password are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ error: "Error resetting password" });
    }
};
