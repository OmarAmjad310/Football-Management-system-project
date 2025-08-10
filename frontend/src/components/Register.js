// components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Account</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
          <option value="user">User</option>
          <option value="coach">Coach</option>
          <option value="scout">Scout</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

const styles = {
  container: { maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' },
  input: { width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' },
  button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  error: { color: 'red' },
};