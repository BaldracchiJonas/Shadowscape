import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tasks from './Tasks';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                const usersData = response.data;

                setUsers(usersData);
                if (usersData.length > 0) {
                    setUserId(usersData[0].id);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        setUserId(e.target.value);
    };

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <div className="App">
            <h1>Task Manager</h1>

            <label htmlFor="userId">Select User: </label>
            <select id="userId" value={userId} onChange={handleUserChange}>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {userId && <Tasks userId={userId} />}
        </div>
    );
}

export default App;
