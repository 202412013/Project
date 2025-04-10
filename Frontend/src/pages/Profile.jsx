import React, { useEffect, useState } from 'react';
import './styles/Profile.css';
import { useUser } from '../context/Usercontext';

const Profile = () => {
  const context = useUser();
  if (!context) return null;

  const { user } = context;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    userRole: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        userRole: user.userRole || ''
      });
    }
  }, [user]);

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>

      <form>
        <label>
          Full Name:
          <input type="text" value={formData.fullName} disabled />
        </label>

        <label>
          Email:
          <input type="email" value={formData.email} disabled />
        </label>

        <label>
          Phone Number:
          <input type="tel" value={formData.phoneNumber} disabled />
        </label>

        <label>
          User Role:
          <input type="text" value={formData.userRole} disabled />
        </label>
      </form>
    </div>
  );
};

export default Profile;
