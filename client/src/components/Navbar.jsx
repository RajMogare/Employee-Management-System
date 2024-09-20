// client/src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state and redirect to login
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <span className="text-lg font-semibold">Dashboard</span>
      <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
