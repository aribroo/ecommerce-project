import { useEffect, useState } from 'react';
import '../components/styles/Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = ({ countCartItems }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState('');

  const token = localStorage.getItem('access_token');

  const getUserProfile = async () => {
    const response = await fetch('http://localhost:3000/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await response.json();

    if (result.data) setUser(result.data);
    if (result.errors) navigate('/login');
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3000/api/user/logout', {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    });
    if (response.ok) {
      localStorage.removeItem('access_token');
      countCartItems([]);

      navigate('/');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    getUserProfile();
  }, []);

  return (
    <>
      <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-info">
          <div className="profile-field">
            <h3>Username:</h3>
            <p>{user.username}</p>
          </div>
          <div className="profile-field">
            <h3>Phone Number:</h3>
            <p>{user.phone_number}</p>
          </div>
          <div className="profile-field">
            <h3>Email:</h3>
            <p>{user.email}</p>
          </div>
          <div className="profile-field">
            <h3>Address:</h3>
            <p>{user.address}</p>
          </div>
        </div>
        <div className="profile-buttons">
          <button>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
