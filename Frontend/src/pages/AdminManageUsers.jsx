import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminManageUsers.css';
import Subscription from './Subscription';

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/admin/users'); 
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/admin/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <table className="manage-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Subscribed</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users
            // .filter((user) => user.userRole !== "Admin")
            .map((user) => (
              <tr key={user._id}>
                <td data-label="Name">{user.fullName}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Role">{user.userRole}</td>
                <td data-label="Subscribed">{user.subscriptionStatus}</td>
                <td data-label="Joined">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td data-label="Action">
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
            
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageUsers;
