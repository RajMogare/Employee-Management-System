// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Add more components as needed
import AddEmployeeForm from './components/AddEmplyeeForm';
import EditEmployeeForm from './components/EditEmployeeForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for login */}
        <Route path="/" element={<Login />} />

        {/* Define the route for register */}
        <Route path="/register" element={<Register />} />

        {/* Define the route for the dashboard (for manager/HR after login) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Add more routes here for other pages */}
        <Route path="/add-employee" element={<AddEmployeeForm />} />

        <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />

      </Routes>
    </Router>
  );
}

export default App;
