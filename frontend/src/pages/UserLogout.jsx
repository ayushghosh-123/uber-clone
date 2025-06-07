import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/user-login');
        } else {
          console.error("Logout failed:", response.data);
        }
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logout();
  }, [navigate, token]);

  return (
    <div>Logging out...</div>
  );
}

export default UserLogout;
