const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId; 
        }
    },
    googleId: {
        type: String, 
        default: null
    },
    phoneNumber: {
        type: String, 
        required: function () {
            return !this.googleId; 
        }
    },
    profilePic: {
        type: String, 
        default: 'default-profile.png'
    },
    userRole: {
        type: String,
        enum: ['Student', 'Professor', 'Author', 'Admin'],
        required: true
    },
    premiumExpiry: {
        type: Date,
        default: null 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
