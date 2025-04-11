const Subscription = require("../models/Subscription");
// const moment = require("moment");

exports.checkSubscription = async (req, res) => {
  try {
    const userId = req.user.id; // assuming JWT middleware adds user

    const activeSub = await Subscription.findOne({
      userId,
      status: "Active",
      expiryDate: { $gt: new Date() },
    });

    if (activeSub) {
      return res.json({ isSubscribed: true });
    } else {
      return res.json({ isSubscribed: false });
    }
  } catch (err) {
    console.error("Subscription check error:", err);
    res.status(500).json({ error: "Server error while checking subscription" });
  }
};
