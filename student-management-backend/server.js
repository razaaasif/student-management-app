const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define Schema
const studentSchema = new mongoose.Schema({
  rollNo: String,
  name: String,
  course: String,
  email: String,
});

// Create Model
const Student = mongoose.model('Student', studentSchema);

const cors = require('cors');

app.use(cors());

// Middleware
app.use(express.json());

// Routes
// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new student
app.post('/students', async (req, res) => {
  const student = new Student({
    rollNo: req.body.rollNo,
    name: req.body.name,
    course: req.body.course,
    email: req.body.email,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
