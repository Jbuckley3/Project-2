const express = require('express');
const router = express.Router();
const Task = require('../models/task.js'); 
const { ensureLoggedIn } = require('../utils/middleware');

// Apply ensureLoggedIn middleware to the entire router
router.use(ensureLoggedIn);

// Route to render the task creation form
router.get('/tasks/create', (req, res) => {
    res.render('tasks/create');
});

// Route to handle task creation
router.post('/tasks/create', ensureLoggedIn, async (req, res) => {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({
        title,
        description,
        dueDate,
        user: req.user.id,
    });
    await newTask.save();
    res.redirect('/tasks');
});

// Route to render the task update form
router.get('/tasks/:id/edit', ensureLoggedIn, async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('tasks/edit', { task });
});

// Route to handle task update
router.post('/tasks/:id/edit', ensureLoggedIn, async (req, res) => {
    const { title, description, dueDate } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate });
    res.redirect('/tasks');
});

// Route to handle task deletion
router.post('/tasks/:id/delete', ensureLoggedIn, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
});

// Route to display a list of tasks
router.get('/tasks', ensureLoggedIn, async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.render('tasks/index', { tasks });
});

module.exports = router;
