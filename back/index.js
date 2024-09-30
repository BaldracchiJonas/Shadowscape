const express = require('express');
const { Pool } = require('pg');
const { Task, User, Status } = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

//Get users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
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
    const { userId, description } = req.body;

    if (!userId || !description) {
        return res.status(400).json({ error: 'userId, and description are required' });
    }

    try {
        let task = await Task.create({
            user_id: userId,
            description,
            status_id: 1
        });
        task = task.toJSON();
        task.Status = { id: 1, name: 'Open' }; 

        res.status(201).json({ message: 'Task created', task });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update task
app.put('/api/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    const { statusId } = req.body;

    if (!statusId) {
        return res.status(400).json({ error: 'statusId is required' });
    }

    try {
        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

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
