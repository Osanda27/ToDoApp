import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data.msg || 'Login failed');
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the input data
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login Response:', res.data); // Log the API response
      localStorage.setItem('token', res.data.token);
      //navigate('/tasks');
      window.location.href = '/tasks'; // Force redirect
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message); // Log the error
      setError(err.response?.data.msg || 'Login failed');
    }
  };// changed handlesubmit to fix login btn error

  //handle register new add
  const handleRegisterClick = () => {
    localStorage.removeItem('token'); // Clear token to log out
    navigate('/register'); // Navigate to register page
  };

  /*return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );*/

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={handleRegisterClick} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;