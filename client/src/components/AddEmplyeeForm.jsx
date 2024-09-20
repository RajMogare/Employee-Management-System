import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddEmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    profileImage: '',
    createdDate: new Date().toLocaleDateString()
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData({ ...formData, profileImage: file }); // Store the file instead of the data URL
    } else {
      alert("Please upload a valid jpg/png file");
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.profileImage) {
      alert("Please fill out all required fields and upload an image");
      return;
    }
  
    const employeeData = new FormData();
    employeeData.append('name', formData.name);
    employeeData.append('email', formData.email);
    employeeData.append('mobile', formData.mobile);
    employeeData.append('designation', formData.designation);
    employeeData.append('gender', formData.gender);
    employeeData.append('course', formData.course);
    employeeData.append('profileImage', formData.profileImage); // This is the file now
  
    try {
      const response = await axios.post('http://localhost:3000/api/employees/add', employeeData);
      alert(response.data.message); // Show success message
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error adding employee:', error.response?.data?.message || error.message);
      alert('Error adding employee. Please try again.');
    }
  };
  
  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;
