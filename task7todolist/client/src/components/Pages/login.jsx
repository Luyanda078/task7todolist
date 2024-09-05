import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../inputfield';
import Button from '../button';
import Header from '../header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Logging in with:', username, password);
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.formContainer}>
        <InputField
          label="Enter your username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <InputField
          label="Enter your password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button text="Log In" onClick={handleLogin} />
        <p style={styles.forgotPassword}>Forgot Password?</p>
        <div style={styles.linkContainer}>
          <span>Don’t have an account? </span>
          <Link to="/signup" style={styles.link}>Sign Up</Link> {/* Link to Sign Up page */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    backgroundImage: 'url("https://i.pinimg.com/1200x/b2/09/30/b2093077dae964752b7eabd17fe8d59d.jpg")',
    backgroundRepeat:'no-repeat',
    backgroundSize: 'cover',
    
    
  
  },
  formContainer: {
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  forgotPassword: {
    marginTop: '10px',
    color: '#888',
    cursor: 'pointer',
  },
  linkContainer: {
    marginTop: '20px',
  },
  link: {
    color: '#5B67CA',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Login;

