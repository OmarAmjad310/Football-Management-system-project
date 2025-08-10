// src/components/Teams.js
import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    founded_year: '',
    stadium: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/teams'; // Adjust to your backend URL

  // Fetch all teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      setError('Failed to fetch teams');
      console.error(err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { ...formData, founded_year: Number(formData.founded_year) };

      const res = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || 'Something went wrong');

      fetchTeams(); // Refresh list
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  // Populate form for editing
  const handleEdit = (team) => {
    setFormData({
      name: team.name,
      city: team.city,
      founded_year: team.founded_year,
      stadium: team.stadium,
    });
    setEditId(team.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      fetchTeams(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', city: '', founded_year: '', stadium: '' });
    setEditId(null);
  };

  return (
    <div
      style={{
        padding: '30px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f9fafc',
        minHeight: '100vh',
        color: '#2c3e50',
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '600',
          color: '#2980b9',
          marginBottom: '10px',
        }}
      >
        🏟️ Football Teams Management
      </h1>
      <p
        style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#7f8c8d',
          marginBottom: '30px',
        }}
      >
        Add, edit, and manage football teams with ease.
      </p>

      {/* Error Message */}
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
            borderBottom: '2px solid #3498db',
            paddingBottom: '8px',
          }}
        >
          {editId ? '✏️ Edit Team' : '➕ Add New Team'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '15px',
              marginBottom: '20px',
            }}
          >
            <input
              name="name"
              placeholder="Team Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #bdc3c7',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #3498db')}
              onBlur={(e) => (e.target.style.border = '1px solid #bdc3c7')}
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #bdc3c7',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #3498db')}
              onBlur={(e) => (e.target.style.border = '1px solid #bdc3c7')}
            />
            <input
              name="founded_year"
              placeholder="Founded Year"
              type="number"
              value={formData.founded_year}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #bdc3c7',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #3498db')}
              onBlur={(e) => (e.target.style.border = '1px solid #bdc3c7')}
            />
            <input
              name="stadium"
              placeholder="Stadium"
              value={formData.stadium}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #bdc3c7',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border 0.3s',
              }}
              onFocus={(e) => (e.target.style.border = '1px solid #3498db')}
              onBlur={(e) => (e.target.style.border = '1px solid #bdc3c7')}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: editId ? '#f39c12' : '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginRight: '10px',
                transition: 'background 0.3s',
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = editId ? '#e67e22' : '#2ecc71')
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = editId ? '#f39c12' : '#27ae60')
              }
            >
              {editId ? '🔄 Update Team' : '✅ Add Team'}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#7f8c8d')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#95a5a6')}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Teams List */}
      <h2
        style={{
          fontSize: '1.8rem',
          color: '#2c3e50',
          marginBottom: '15px',
        }}
      >
        📋 Teams List
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
                backgroundColor: '#3498db',
                color: 'white',
                fontWeight: '600',
              }}
            >
              <th
                style={{
                  padding: '14px 12px',
                  textAlign: 'left',
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: '14px 12px',
                  textAlign: 'left',
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '14px 12px',
                  textAlign: 'left',
                }}
              >
                City
              </th>
              <th
                style={{
                  padding: '14px 12px',
                  textAlign: 'left',
                }}
              >
                Founded
              </th>
              <th
                style={{
                  padding: '14px 12px',
                  textAlign: 'left',
                }}
              >
                Stadium
              </th>
              <th
                style={{
                  padding: '14px 12px',
                  textAlign: 'center',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map((team) => (
                <tr
                  key={team.id}
                  style={{
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#f8f9fa')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
                >
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #ecf0f1',
                      color: '#7f8c8d',
                    }}
                  >
                    {team.id}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #ecf0f1',
                      fontWeight: '500',
                    }}
                  >
                    {team.name}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #ecf0f1',
                      color: '#2c3e50',
                    }}
                  >
                    {team.city}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #ecf0f1',
                      color: '#7f8c8d',
                    }}
                  >
                    {team.founded_year}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #ecf0f1',
                      color: '#34495e',
                    }}
                  >
                    {team.stadium}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      borderBottom: '1px solid #ecf0f1',
                      textAlign: 'center',
                    }}
                  >
                    <button
                      onClick={() => handleEdit(team)}
                      style={{
                        padding: '6px 12px',
                        marginRight: '8px',
                        backgroundColor: '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#c0392b')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#e74c3c')}
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
                  🏁 No teams found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;