import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data from the backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees/get");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/delete/${id}`);
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // Handle edit operation
const handleEdit = (employee) => {
  // Navigate to the edit form with the employee data
  navigate(`/edit-employee/${employee._id}`, { state: { employee } });
};


  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-end mb-4">
          <Link to="/add-employee">
            <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition">
              Add Employee
            </button>
          </Link>
        </div>

        <table className="min-w-full border border-gray-200 shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              {["ID", "Image", "Name", "Email", "Mobile", "Designation", "Gender", "Course", "Created Date", "Action"].map((header) => (
                <th key={header} className="py-2 px-4 text-left text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <img
                    src={`http://localhost:3000/${emp.profileImage}`}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="py-2 px-4">{emp.name}</td>
                <td className="py-2 px-4">{emp.email}</td>
                <td className="py-2 px-4">{emp.mobile}</td>
                <td className="py-2 px-4">{emp.designation}</td>
                <td className="py-2 px-4">{emp.gender}</td>
                <td className="py-2 px-4">{emp.course}</td>
                <td className="py-2 px-4">{new Date(emp.createdDate).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && <p className="mt-4 text-center text-gray-500">No employees added yet.</p>}
      </div>
    </div>
  );
}

export default Dashboard;
