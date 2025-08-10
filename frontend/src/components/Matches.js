// src/components/Matches.js
import React, { useState, useEffect } from 'react';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    match_date: '',
    venue: '',
    status: 'scheduled',
    home_score: '',
    away_score: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api';
  const fetchMatches = () => fetch(`${API_URL}/matches`).then(res => res.json()).then(setMatches);
  const fetchTeams = () => fetch(`${API_URL}/teams`).then(res => res.json()).then(setTeams);

  useEffect(() => {
    fetchMatches();
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
        home_team_id: Number(formData.home_team_id),
        away_team_id: Number(formData.away_team_id),
        home_score: formData.home_score ? Number(formData.home_score) : null,
        away_score: formData.away_score ? Number(formData.away_score) : null,
      };

      const res = await fetch(editId ? `${API_URL}/matches/${editId}` : `${API_URL}/matches`, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error);

      fetchMatches();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (match) => {
    setFormData({
      home_team_id: match.home_team_id || '',
      away_team_id: match.away_team_id || '',
      match_date: match.match_date?.split('T')[0] || '',
      venue: match.venue || '',
      status: match.status || 'scheduled',
      home_score: match.home_score || '',
      away_score: match.away_score || '',
    });
    setEditId(match.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this match?')) {
      try {
        const res = await fetch(`${API_URL}/matches/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error);
        fetchMatches();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      home_team_id: '',
      away_team_id: '',
      match_date: '',
      venue: '',
      status: 'scheduled',
      home_score: '',
      away_score: '',
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
          color: '#8e44ad',
          marginBottom: '10px',
        }}
      >
        ⚽ Match Management
      </h1>
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#7f8c8d',
          marginBottom: '30px',
        }}
      >
        Schedule, update, and manage football matches with ease.
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
            borderBottom: '2px solid #8e44ad',
            paddingBottom: '8px',
          }}
        >
          {editId ? '✏️ Edit Match' : '📅 Schedule Match'}
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
            <select
              name="home_team_id"
              value={formData.home_team_id}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">HomeAsd Team</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <select
              name="away_team_id"
              value={formData.away_team_id}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Away Team</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>

            <input
              type="date"
              name="match_date"
              value={formData.match_date}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              placeholder="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={inputStyle}
            >
              {['scheduled', 'completed', 'postponed', 'cancelled'].map(s => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Home Score"
              name="home_score"
              value={formData.home_score}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Away Score"
              name="away_score"
              value={formData.away_score}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: editId ? '#f39c12' : '#8e44ad',
              }}
              onMouseOver={e => (e.target.style.backgroundColor = editId ? '#e67e22' : '#9b59b6')}
              onMouseOut={e => (e.target.style.backgroundColor = editId ? '#f39c12' : '#8e44ad')}
            >
              {editId ? '🔄 Update Match' : '✅ Schedule Match'}
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

      {/* Matches List */}
      <h2
        style={{
          fontSize: '1.8rem',
          color: '#2c3e50',
          marginBottom: '15px',
        }}
      >
        📋 Matches List
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
                backgroundColor: '#8e44ad',
                color: 'white',
                fontWeight: '600',
              }}
            >
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Home</th>
              <th style={thStyle}>Away</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Score</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.length > 0 ? (
              matches.map(m => (
                <tr
                  key={m.id}
                  style={{
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={e => (e.target.style.backgroundColor = '#f8f9fa')}
                  onMouseOut={e => (e.target.style.backgroundColor = 'white')}
                >
                  <td style={tdStyle}>{m.id}</td>
                  <td style={{ ...tdStyle, fontWeight: '500' }}>{m.home_team_name}</td>
                  <td style={{ ...tdStyle, fontWeight: '500' }}>{m.away_team_name}</td>
                  <td style={tdStyle}>{m.match_date?.split('T')[0] || '–'}</td>
                  <td style={tdStyle}>
                    <strong>
                      {m.home_score ?? '–'} - {m.away_score ?? '–'}
                    </strong>
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      color:
                        m.status === 'completed'
                          ? '#27ae60'
                          : m.status === 'scheduled'
                          ? '#3498db'
                          : m.status === 'postponed'
                          ? '#f39c12'
                          : '#e74c3c',
                      fontWeight: '500',
                    }}
                  >
                    {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(m)}
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
                      onClick={() => handleDelete(m.id)}
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
                  colSpan="7"
                  style={{
                    textAlign: 'center',
                    padding: '30px',
                    color: '#95a5a6',
                    fontStyle: 'italic',
                  }}
                >
                  🏟️ No matches scheduled yet. Time to kick off!
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

export default Matches;