import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = ({ userId }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [newTaskDescription, setNewTaskDescription] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/api/tasks/${userId}`);
                setTasks(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load tasks');
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);

    const filteredTasks = filter === 'All'
        ? tasks
        : tasks.filter(task => task.Status.name === filter);

    const handleStatusChange = async (taskId, newStatusId) => {
        try {
            await axios.put(`/api/tasks/${taskId}`, {
                userId,
                statusId: newStatusId,
            });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status_id: newStatusId, Status: { name: getStatusName(newStatusId) } } : task
                )
            );
        } catch (err) {
            console.error('Failed to update task status', err);
        }
    };

    const getStatusName = (statusId) => {
        switch (statusId) {
            case 1:
                return 'Open';
            case 2:
                return 'In Progress';
            case 3:
                return 'Done';
            default:
                return 'Unknown';
        }
    };

    const handleCreateTask = async () => {
        try {
            const response = await axios.post('/api/tasks', {
                userId,
                description: newTaskDescription,
            });

            setTasks([...tasks, response.data.task]);
            setShowModal(false);
        } catch (err) {
            console.error('Failed to create task', err);
        } 
    };

    if (loading) return <p>Loading tasks...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Create New Task</button>

            {showModal && (
                <div className="modal">
                    <h2>Create New Task</h2>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                    />
                    <button onClick={handleCreateTask}>Create</button>
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            )}

            <div>
                <button onClick={() => setFilter('All')}>All</button>
                <button onClick={() => setFilter('Open')}>Open</button>
                <button onClick={() => setFilter('In Progress')}>In Progress</button>
                <button onClick={() => setFilter('Done')}>Done</button>
            </div>

            {filteredTasks.map((task) => (
                <div key={task.id}>
                    {task.description} (Status: {task.Status.name})
                    <select
                        value={task.status_id}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                        <option value="1">Open</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
                    </select>
                </div>
            ))}

        </div>
    );
};

export default Tasks;
