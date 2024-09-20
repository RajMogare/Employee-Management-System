import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditEmployeeForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;

  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    mobile: employee?.mobile || '',
    designation: employee?.designation || '',
    gender: employee?.gender || '',
    course: employee?.course || '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("email", formData.email);
    updateData.append("mobile", formData.mobile);
    updateData.append("designation", formData.designation);
    updateData.append("gender", formData.gender);
    updateData.append("course", formData.course);
    if (formData.profileImage) {
      updateData.append("profileImage", formData.profileImage);
    }

    try {
      await axios.put(`http://localhost:3000/api/employees/update/${employee._id}`, updateData);
      navigate("/dashboard"); // Redirect back to dashboard after updating
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          required
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          name="profileImage"
          onChange={handleFileChange}
          accept="image/*"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
