import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskAdded(res.data);
      setFormData({ title: '', description: '' });
    } catch (err) {
      setError(err.response?.data.msg || 'Failed to add task');
    }
  };

  return (
    <div>
      <h3>Add Task</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Task Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;