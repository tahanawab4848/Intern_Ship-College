const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks (with filtering and sorting)
router.get('/', async (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    
    // Filtering
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Sorting (default to latest)
    let sortObj = { createdAt: -1 };
    if (sort === 'dueDate') sortObj = { dueDate: 1 };
    else if (sort === 'priority') sortObj = { priority: -1 }; // high to low usually needs custom logic, but this is simple

    const tasks = await Task.find(query).sort(sortObj);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
