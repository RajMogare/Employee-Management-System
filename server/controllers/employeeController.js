import Employee from '../models/employeeModel.js';


// GET route to fetch all employees
export const getEmployee= async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees
    res.status(200).json(employees); // Send the employees as a JSON response
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Add new employee
export const addEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course, createdDate } = req.body;
  const profileImage = req.file ? req.file.path : null; // Uploaded image path

  try {
    // Check if employee with the same email exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    // Create a new employee object
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      profileImage,
      createdDate,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message }); // Use error.message for more details
  }
  
};

// Update employee
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course, createdDate } = req.body;
    const profileImage = req.file ? req.file.path : undefined;
  
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      // Update employee details
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.mobile = mobile || employee.mobile;
      employee.designation = designation || employee.designation;
      employee.gender = gender || employee.gender;
      employee.course = course || employee.course;
      employee.createdDate = createdDate || employee.createdDate;
  
      if (profileImage) {
        employee.profileImage = profileImage;
      }
  
      // Save the updated employee data
      const updatedEmployee = await employee.save();
      res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Delete employee
  export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  

