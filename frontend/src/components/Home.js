// src/components/Home.js
import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        backgroundImage: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '40px 60px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          maxWidth: '800px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            margin: '0 0 20px 0',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          Welcome to the Sports Management App
        </h1>
        <p
          style={{
            fontSize: '1.4rem',
            lineHeight: '1.8',
            margin: '0',
            opacity: '0.95',
          }}
        >
          Browse teams, players, matches, and coaches with ease. 
          <br />
          Everything you need to manage your sports organization in one place.
        </p>
      </div>

      <footer
        style={{
          marginTop: '40px',
          fontSize: '0.9rem',
          opacity: '0.7',
        }}
      >
        🏀⚽🏏 Made with React & React Router
      </footer>
    </div>
  );
};

export default Home;