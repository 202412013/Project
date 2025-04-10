const User = require('../models/User');
const { comparePassword } = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, userRole: user.userRole },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 din
    });

    res.status(200).json({ message: 'Login successful', user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.getMe = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  };
