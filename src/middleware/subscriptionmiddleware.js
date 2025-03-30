const Subscription = require("../models/Subscription");

const verifySubscription = async (req, res, next) => {
    try {
        const { userId } = req.user;

        const subscription = await Subscription.findOne({ userId, status: "Active" });
        if (!subscription || new Date(subscription.expiryDate) < new Date()) {
            return res.status(403).json({ error: "Subscription expired or not found" });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Error checking subscription" });
    }
};

module.exports = verifySubscription;
