import express from 'express';
import { addEmployee, updateEmployee, deleteEmployee, getEmployee } from '../controllers/employeeController.js';
import upload from '../middleware/fileUpload.js';  // Multer middleware

const router = express.Router();

router.get('/get',getEmployee)

// Route to add a new employee
router.post('/add', upload.single('profileImage'), (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    next();
  }, addEmployee);
  

// Route to update an employee
router.put('/update/:id', upload.single('profileImage'), updateEmployee);

// Route to delete an employee
router.delete('/delete/:id', deleteEmployee);

export default router;
