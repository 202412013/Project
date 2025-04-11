import React from "react";
import axios from "axios";
import "./styles/Sub_plan.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/Usercontext"; // 👈 adjust path as per your setup


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const Subscription = () => {
  const user = useUser(); 
  const navigate = useNavigate();
  const plans = [
    { title: "Basic", price: 149, duration: "1 Month" },
    { title: "Standard", price: 399, duration: "3 Months" },
    { title: "Premium", price: 599, duration: "6 Months" },
    { title: "Ultimate", price: 999, duration: "1 Year" },
  ];

  console.log(user.user.fullName);

  const handlePayment = async (subscriptionType) => {
    if (!user.user || !user.user._id) {
      alert("Please login to purchase a subscription.");
      return;
    }
  
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/subscription/createorder", {
        userId: user.user._id,
        subscriptionType,
      });
  
      const { order_id, key_id } = response.data;
  
      const options = {
        key: key_id,
        amount: plans.find((plan) => plan.duration === subscriptionType).price * 100,
        currency: "INR",
        name: "Unwritten Cove",
        description: `Subscription for ${subscriptionType}`,
        order_id,
        handler: async function (response) {
          const verifyRes = await axios.post("http://localhost:5000/api/auth/verify-payment", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            userId: user.user._id,
            subscriptionType,
          });
  
          if (verifyRes.data.success) {
            alert("Subscription Activated!");
            navigate("/books");
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: user.user.fullName || "User",
          email: user.user.email || "test@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong during payment!");
    }
  };
  

  return (
    <div className="subscription-container">
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <h2>{plan.title}</h2>
          <h1>₹{plan.price}</h1>
          <p>{plan.duration}</p>
          <ul>
            <li>Access to all books</li>
            <li>Unlimited reading</li>
            <li>Premium support</li>
          </ul>
          <button onClick={() => handlePayment(plan.duration)}>Choose Plan</button>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
