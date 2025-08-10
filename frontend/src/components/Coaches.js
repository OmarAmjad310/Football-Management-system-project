// src/components/Coaches.js
import React, { useState, useEffect } from 'react';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
    team_id: '',
    hire_date: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api';
  const fetchCoaches = () => fetch(`${API_URL}/coaches`).then(res => res.json()).then(setCoaches);
  const fetchTeams = () => fetch(`${API_URL}/teams`).then(res => res.json()).then(setTeams);

  useEffect(() => {
    fetchCoaches();
    fetchTeams();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...formData,
        team_id: formData.team_id ? Number(formData.team_id) : null,
      };

      const res = await fetch(editId ? `${API_URL}/coaches/${editId}` : `${API_URL}/coaches`, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      fetchCoaches();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (coach) => {
    setFormData({
      first_name: coach.first_name,
      last_name: coach.last_name,
      specialization: coach.specialization,
      team_id: coach.team_id || '',
      hire_date: coach.hire_date?.split('T')[0] || '',
    });
    setEditId(coach.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this coach?')) {
      try {
        const res = await fetch(`${API_URL}/coaches/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error);
        fetchCoaches();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      specialization: '',
      team_id: '',
      hire_date: '',
    });
    setEditId(null);
  };

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f8f9fc',
        minHeight: '100vh',
        color: '#2c3e50',
      }}
    >
      {/* Page Header */}
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '600',
          color: '#e67e22',
          marginBottom: '10px',
        }}
      >
        👨‍🏫 Coach Management
      </h1>
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#7f8c8d',
          marginBottom: '30px',
        }}
      >
        Add, edit, and manage team coaches and their roles.
      </p>

      {/* Error Alert */}
      {error && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #f5c6cb',
            textAlign: 'center',
            fontWeight: '500',
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Form Card */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '40px',
          border: '1px solid #e0e0e0',
        }}
      >
        <h2
          style={{
            fontSize: '1.8rem',
            color: '#2c3e50',
            marginBottom: '20px',
            borderBottom: '2px solid #e67e22',
            paddingBottom: '8px',
          }}
        >
          {editId ? '✏️ Edit Coach' : '➕ Add New Coach'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '15px',
              marginBottom: '20px',
            }}
          >
            <input
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              placeholder="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleChange}
              style={inputStyle}
            />
            <select
              name="team_id"
              value={formData.team_id}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-- No Team --</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: editId ? '#f39c12' : '#e67e22',
              }}
              onMouseOver={e => (e.target.style.backgroundColor = editId ? '#e67e22' : '#d35400')}
              onMouseOut={e => (e.target.style.backgroundColor = editId ? '#f39c12' : '#e67e22')}
            >
              {editId ? '🔄 Update Coach' : '✅ Add Coach'}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#95a5a6',
                  marginLeft: '10px',
                }}
                onMouseOver={e => (e.target.style.backgroundColor = '#7f8c8d')}
                onMouseOut={e => (e.target.style.backgroundColor = '#95a5a6')}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Coaches List */}
      <h2
        style={{
          fontSize: '1.8rem',
          color: '#2c3e50',
          marginBottom: '15px',
        }}
      >
        📋 Coaches List
      </h2>

      <div
        style={{
          overflowX: 'auto',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: '#e67e22',
                color: 'white',
                fontWeight: '600',
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Specialization</th>
              <th style={thStyle}>Team</th>
              <th style={thStyle}>Hire Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coaches.length > 0 ? (
              coaches.map(c => (
                <tr
                  key={c.id}
                  style={{
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={e => (e.target.style.backgroundColor = '#f8f9fa')}
                  onMouseOut={e => (e.target.style.backgroundColor = 'white')}
                >
                  <td style={tdStyle}>{c.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '500' }}>
                    {c.first_name} {c.last_name}
                  </td>
                  <td style={tdStyle}>{c.specialization || '–'}</td>
                  <td style={tdStyle}>{c.team_name || 'Unassigned'}</td>
                  <td style={tdStyle}>{c.hire_date?.split('T')[0] || '–'}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(c)}
                      style={{
                        ...actionButtonStyle,
                        backgroundColor: '#3498db',
                      }}
                      onMouseOver={e => (e.target.style.backgroundColor = '#2980b9')}
                      onMouseOut={e => (e.target.style.backgroundColor = '#3498db')}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{
                        ...actionButtonStyle,
                        backgroundColor: '#e74c3c',
                        marginLeft: '8px',
                      }}
                      onMouseOver={e => (e.target.style.backgroundColor = '#c0392b')}
                      onMouseOut={e => (e.target.style.backgroundColor = '#e74c3c')}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    color: '#95a5a6',
                    fontStyle: 'italic',
                  }}
                >
                  👨‍🏫 No coaches found. Start building your coaching staff!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// === Reusable Inline Styles ===

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #bdc3c7',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.3s',
};

const buttonStyle = {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.3s',
  color: 'white',
};

const thStyle = {
  padding: '14px 12px',
  textAlign: 'left',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #ecf0f1',
  color: '#34495e',
};

const actionButtonStyle = {
  padding: '6px 12px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
  color: 'white',
};

export default Coaches;