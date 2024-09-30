import React, { useState } from 'react';
import Tasks from './tasks';
import './App.css';

function App() {
    const [userId, setUserId] = useState(1);

    const handleUserChange = (e) => {
        setUserId(e.target.value);
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <label htmlFor="userId">Select User: </label>
            <select id="userId" value={userId} onChange={handleUserChange}>
                <option value="1">Alice</option>
                <option value="2">Bob</option>
                <option value="3">Charlie</option>
            </select>

            {/* Display tasks for selected user */}
            <Tasks userId={userId} />
        </div>
    );
}

export default App;
