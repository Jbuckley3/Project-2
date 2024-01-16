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
router.post('/tasks/create', async (req, res) => {
    try {
        // Ensure the user is logged in before proceeding
        if (!req.session.loggedIn || !req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        const { title, description, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            dueDate,
            user: req.session.userId, // Use session userId instead of req.user.id
        });

        await newTask.save();
        res.redirect('/tasks');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
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
    try {
        // Ensure the user is logged in before proceeding
        if (!req.session.loggedIn || !req.session.userId) {
            return res.status(401).send('Unauthorized');
        }

        const tasks = await Task.find({ user: req.session.userId }); // Use session userId
        res.render('tasks/index', { tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
