import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  const navigate = useNavigate();

  // Check login status when component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to landing page on logout
  };

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.title}>TO DO LIST</h1>
        <p style={styles.subtitle}>Organize Your Tasks Efficiently</p>
        <div style={styles.buttonContainer}>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button style={styles.button}>Login</button>
              </Link>
              <Link to="/signup">
                <button style={styles.button}>Signup</button>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          )}
          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate('/todo'); // Navigate to To Do page if logged in
              } else {
                alert('Please login or sign up to access the To Do List.');
              }
            }}
            style={styles.button}
          >
            To Do List
          </button>
         
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B67CA',
    backgroundImage:
      'url("https://i.pinimg.com/1200x/b1/e5/d9/b1e5d9c98a49442a683cea749316850e.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  banner: {
    textAlign: 'center',
    color: '#fff',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '0.5em',
  },
  subtitle: {
    fontSize: '1.2em',
    marginBottom: '1.5em',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap', // Allow wrapping to keep layout nice on smaller screens
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#5B67CA',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    margin: '5px', // Space out buttons nicely
  },
};

export default LandingPage;
