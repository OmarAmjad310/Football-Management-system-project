// App.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Pages
import Teams from './components/Teams';
import Players from './components/Players';
import Matches from './components/Matches';
import Coaches from './components/Coaches';
import Home from './components/Home';
import About from './components/About';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext'; // Make sure useAuth is exported!
import './App.css';

// Lazy-loaded Auth Components
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));

// ✅ Styles (define before use)
const linkStyle = {
  color: 'white',
  margin: '0 10px',
  textDecoration: 'none',
  fontWeight: '500',
};

const logoutButtonStyle = {
  background: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

// ✅ Auth Status Component (must come after useAuth and styles)
function AuthStatus() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ color: '#ddd' }}>Hi, {user.username}</span>
        <button onClick={logout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/register" style={linkStyle}>Register</Link>
    </>
  );
}

// ✅ Protected Route (must come after useAuth)
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

// ✅ Public Route (redirect if logged in)
function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/teams" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
          {/* Navigation Bar */}
          <nav
            style={{
              padding: '15px',
              backgroundColor: '#333',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              fontSize: '16px',
            }}
          >
            {/* Main Links */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/" style={linkStyle}>Home</Link>
              <Link to="/teams" style={linkStyle}>Teams</Link>
              <Link to="/players" style={linkStyle}>Players</Link>
              <Link to="/matches" style={linkStyle}>Matches</Link>
              <Link to="/coaches" style={linkStyle}>Coaches</Link>
              <Link to="/about" style={linkStyle}>About</Link>
            </div>

            {/* Auth Links */}
            <AuthStatus />
          </nav>

          {/* Routes */}
          <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* Protected Routes */}
              <Route
                path="/teams"
                element={
                  <ProtectedRoute>
                    <Teams />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/players"
                element={
                  <ProtectedRoute>
                    <Players />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/matches"
                element={
                  <ProtectedRoute>
                    <Matches />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/coaches"
                element={
                  <ProtectedRoute>
                    <Coaches />
                  </ProtectedRoute>
                }
              />

              {/* Auth Routes */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;