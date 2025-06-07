import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/Usercontex';
import { useNavigate } from 'react-router-dom';

function Userprotectedrap({ children }) {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
    }
  }, [token, navigate]);

  // Prevent rendering protected content if not logged in
  if (!token) return null;

  return <>{children}</>;
}

export default Userprotectedrap;
