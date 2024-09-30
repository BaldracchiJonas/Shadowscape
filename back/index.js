const express = require('express');
const { Pool } = require('pg');
const { Task, User, Status } = require('./models');

const app = express();
const port = 3000;

// Configure PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

// Get the tasks for a specific user by ID
app.get('/api/tasks/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const tasks = await Task.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Status,
                    attributes: ['id', 'name']
                }
            ]
        });        
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    const { userId, description, statusId } = req.body;

    if (!userId || !description || !statusId) {
        return res.status(400).json({ error: 'userId, description, and statusId are required' });
    }

    try {
        const task = await Task.create({
            user_id: userId,
            description,
            status_id: statusId
        });

        res.status(201).json({ message: 'Task created', task });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update task
app.put('/api/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const { description, statusId } = req.body;

    if (!description || !statusId) {
        return res.status(400).json({ error: 'description and statusId are required' });
    }

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.description = description;
        task.status_id = statusId;
        await task.save();

        res.status(200).json({ message: 'Task updated', task });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
