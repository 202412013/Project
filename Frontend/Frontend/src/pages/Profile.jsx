// src/Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Profile.css"

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {user && (
        <div className="profile-card">
          <img src={user.profilePic} alt="Profile" className="profile-pic" />
          <h2>{user.name}</h2>
          <button onClick={handleSignOut} className="sign-out">Sign Out</button>
          <button className="add-account">Add Account</button>
        </div>
      )}
      <div className="profiles-list">
        <h3>Other Profiles</h3>
        <ul>
          {profiles.map((profile) => (
            <li key={profile.id}>{profile.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
