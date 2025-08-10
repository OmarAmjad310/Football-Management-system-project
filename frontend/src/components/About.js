// src/components/About.js
import React from 'react';

const About = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '50px 60px',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e0e0e0',
        }}
      >
        <h1
          style={{
            fontSize: '2.8rem',
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          About This App
        </h1>

        <div
          style={{
            height: '4px',
            width: '80px',
            backgroundColor: '#3498db',
            margin: '0 auto 30px',
            borderRadius: '2px',
          }}
        />

        <p
          style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            color: '#34495e',
            marginBottom: '20px',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '20px auto',
          }}
        >
          This is a simple sports management dashboard built with <strong>React</strong> and{' '}
          <strong>React Router</strong>. It allows you to view and manage teams, players,
          matches, and coaches in a clean, responsive interface.
        </p>

        <p
          style={{
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: '#7f8c8d',
            textAlign: 'center',
            marginTop: '30px',
          }}
        >
          Created for learning and demonstration purposes. 🚀
        </p>

        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              backgroundColor: '#e0f7fa',
              color: '#0288d1',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            React
          </span>
          <span
            style={{
              backgroundColor: '#f9fbe7',
              color: '#7cb342',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            React Router
          </span>
          <span
            style={{
              backgroundColor: '#fff3e0',
              color: '#f57c00',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            Responsive Design
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;