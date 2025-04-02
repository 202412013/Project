import React from "react";
import "./styles/Sub_plan.css";

const Subscription = () => {
  const plans = [
    { title: "Basic", price: "₹149", duration: "1 Month" },
    { title: "Standard", price: "₹399", duration: "3 Months" },
    { title: "Premium", price: "₹599", duration: "6 Months" },
    { title: "Ultimate", price: "₹999", duration: "1 Year" },
  ];

  return (
    <div className="subscription-container">
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <h2>{plan.title}</h2>
          <h1>{plan.price}</h1>
          <p>{plan.duration}</p>
          <ul>
            <li>Access to all books</li>
            <li>Unlimited reading</li>
            <li>Premium support</li>
          </ul>
          <button>Choose Plan</button>
        </div>
      ))}
    </div>
  );
};

export default Subscription;
