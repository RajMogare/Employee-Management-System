// client/src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import bg_img from '../assets/ems_img.png'; // Import image if needed
import axios from 'axios';

function Register() {
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.profilePhoto) errors.profilePhoto = 'Profile photo is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('profilePhoto', formData.profilePhoto);
    
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', formDataToSend); // Ensure the correct port is used
        console.log('Registration successful:', response.data);
        navigate('/'); // Redirect after successful registration
      } catch (error) {
        // Check if error.response exists before accessing it
        if (error.response) {
          console.log('Registration error:', error.response.data.message);
          setErrors({ ...errors, api: error.response.data });
        } else {
          console.error('Registration error:', error.message);
          setErrors({ ...errors, api: { message: 'Network error or server not responding' } });
        }
      }
    }
  };
  

  return (
    <div className="min-h-screen flex">
    

      {/* Register Section */}
      <div className="w-2/5 flex items-center justify-center bg-white p-8">
        <div className="bg-violet-500 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">Register Here...</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-xl font-medium text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {errors.username && (
                <p className="text-red-300 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-xl font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              />
              {errors.password && (
                <p className="text-red-300 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-xl font-medium text-white">
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              {errors.profilePhoto && (
                <p className="text-red-300 text-sm">{errors.profilePhoto}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800"
            >
              Register
            </button>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/" className="text-indigo-600 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

        {/* Image Section */}
        <div className="w-3/5 bg-white flex items-center justify-center">
        <img src={bg_img} alt="EMS" className="object-cover w-full h-full" />
      </div>
    </div>
  );
}

export default Register;
