// client/src/components/Login.js
import React, { useState } from "react";
import bg_img from "../assets/ems_img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      // Submit form data
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', formData);
        console.log('Login successful:', response.data);
        // Store token or user data if necessary
        // Optionally redirect to dashboard
        navigate('/dashboard')
      } catch (error) {
        console.error('Login error:', error.response.data.message);
        setErrors({ ...errors, api: error.response.data.message });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-100">
      {/* Image Section */}
      <div className="lg:w-3/5 flex items-center justify-center bg-gray-200 lg:block hidden">
        <img src={bg_img} alt="EMS" className="object-cover w-full h-full" />
      </div>

      {/* Login Section */}
      <div className="lg:w-2/5 flex items-center justify-center  p-8">
        <div className="bg-violet-500 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-medium text-center mb-8 text-white">
            Let's Login!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-xl  text-white">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-200"
              />
              {errors.username && (
                <p className="text-red-300 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-xl  text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-200"
              />
              {errors.password && (
                <p className="text-red-300 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800"
            > 
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-700 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
