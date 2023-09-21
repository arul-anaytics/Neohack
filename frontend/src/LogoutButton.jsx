import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';  // Use useNavigate

const LogoutButton = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    // Navigate to login or another appropriate page
    navigate('/login');
  };

  return (
    <Button type="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
