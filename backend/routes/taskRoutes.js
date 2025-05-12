const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
