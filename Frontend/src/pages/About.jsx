import React from "react";
import { Link } from "react-router-dom";
import './styles/About.css';



const About = () => {
  return (
    <div className="About">
      <div className="about-container">
        <h1 className="title">
          Welcome to Unwritten Cove – Your Digital Library, Anytime, Anywhere!
        </h1>

        <p className="text">
          Hey, book lover! If you’re all about discovering new stories, diving into deep knowledge, or sharing your own words, *Unwritten Cove* is the place for you.
        </p>

        <h2 className="about-subtitle">Who Are We?</h2>
        <p className="about-text">
          We are a *community-driven digital library* designed for *students, teachers, researchers, and authors*. Whether you’re looking for a thrilling novel, an insightful self-help guide, an academic reference, or even a place to publish your writing, we’ve got you covered.
        </p>

        <h2 className="about-subtitle">Why You'll Love Us</h2>
        <ul className="about-list">
          <li><strong>Endless Reads:</strong> Fiction, non-fiction, self-help, poetry, academic texts—you name it, we got it!</li>
          <li><strong>Read Anytime, Anywhere:</strong> 24/7 access from any device, no limits.</li>
          <li><strong>Personalized Space:</strong> Save favorites, create wishlists, and pick up right where you left off.</li>
          <li><strong>Become an Author:</strong> Publish your own books, blogs, or research papers.</li>
          <li><strong>Stress-Free Studying:</strong> Perfect for last-minute revision or deep research.</li>
          <li><strong>Smart Search:</strong> AI-powered recommendations to find your next favorite book.</li>
          <li><strong>Engage & Interact:</strong> Join discussions, leave reviews, and connect with fellow readers.</li>
        </ul>

        <h2 className="about-subtitle">Why We Exist</h2>
        <p className="about-text">
          Because reading should be *easy, fun, and accessible. We’re here to help you **learn, grow, and get lost in amazing books—without barriers*. Knowledge is power, and we believe that everyone deserves access to it.
        </p>

        <h2 className="about-subtitle">Features You'll Love</h2>
        <ul className="about-list">
          <li><strong>User-Friendly Interface:</strong> Seamless reading experience.</li>
          <li><strong>Massive Book Collection:</strong> From bestsellers to hidden gems.</li>
          <li><strong>Perfect for Students & Teachers:</strong> Academic resources for learning and teaching.</li>
          <li><strong>Secure & Ad-Free:</strong> No distractions, just pure reading bliss.</li>
          <li><strong>Community-Driven:</strong> Engage with authors, readers, and content creators.</li>
        </ul>

        <h2 className="about-subtitle">Ready to Dive In?</h2>
        <p className="about-text">
          Sign up, grab a book, and start your next reading adventure. Unwritten Cove is waiting for you. Let’s turn the page together!
        </p>

        <p className="about-footer">
          Got questions? Contact us anytime! Let’s build the ultimate reading experience—together.
        </p>
        <Link to="/contact">
        <button className="button">
            Contact Us
        </button>
        </Link>
      </div>
    </div>
  );
};

export default About;