const Razorpay = require("razorpay");
const Subscription = require("../models/Subscription");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});


const subscriptionPlans = {
    "1 Month": 149,
    "3 Months": 399,
    "6 Months": 599,
    "1 Year": 999
};

exports.createSubscriptionOrder = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, subscriptionType } = req.body;
        if (!subscriptionPlans[subscriptionType]) {
            return res.status(400).json({ error: "Invalid subscription type" });
        }

        const amount = subscriptionPlans[subscriptionType] * 100; 

        const options = {
            amount,
            currency: "INR",
            receipt: `order_${userId}_${subscriptionType}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order_id: order.id, key_id: process.env.RAZORPAY_ID_KEY });
    } catch (error) {
        res.status(500).json({ error: "Error creating order" });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId, subscriptionType } = req.body;

        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");

        console.log(generated_signature);
        console.log(razorpay_signature);
        
        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ error: "Payment verification failed" });
        }

        let expiryDate = new Date();
        if (subscriptionType === "1 Month") expiryDate.setMonth(expiryDate.getMonth() + 1);
        else if (subscriptionType === "3 Months") expiryDate.setMonth(expiryDate.getMonth() + 3);
        else if (subscriptionType === "6 Months") expiryDate.setMonth(expiryDate.getMonth() + 6);
        else if (subscriptionType === "1 Year") expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        const subscription = new Subscription({
            userId,
            subscriptionType,
            expiryDate,
            razorpay_payment_id,
            status: "Active"
        });

        await subscription.save();
        res.json({ success: true, message: "Subscription activated" });

    } catch (error) {
        res.status(500).json({ error: "Error verifying payment" });
    }
};
