const mongoose = require("mongoose");

const Subscription = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscriptionType: { type: String, enum: ["1 Month", "3 Months", "6 Months", "1 Year"], required: true },
    expiryDate: { type: Date, required: true },
    razorpay_payment_id: { type: String, required: true },
    status: { type: String, enum: ["Active", "Expired"], default: "Active" }
}, { timestamps: true });

module.exports = mongoose.model("Subscription", Subscription);
