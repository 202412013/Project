const User = require('../models/User');
const Subscription = require('../models/Subscription'); 

exports.viewUser = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // exclude password from response

        const usersWithSubscriptions = await Promise.all(
          users.map(async (user) => {
            const subscription = await Subscription.findOne({ userId: user._id });
    
            return {
              ...user._doc,
              subscriptionStatus: subscription ? "Yes" : "No",
              subscriptionType: subscription ? subscription.subscriptionType : null,
              expiryDate: subscription ? subscription.expiryDate : null
            };
          })
        );
    
        res.json(usersWithSubscriptions);
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.deleteuser = async (req,res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    
        res.json({ message: 'User deleted successfully', userId: req.params.id });
      } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error' });
      }
}