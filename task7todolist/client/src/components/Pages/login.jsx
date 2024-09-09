import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../inputfield';
import Button from '../button';
import Header from '../header';

import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailRegex)) {
      newErrors.email = 'Invalid email address';
    }
    if (password.length === 0) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Replace with your server login logic
      const response = await axios.fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Logged in successfully:', result);
        // Handle successful login (e.g., redirect or store user info)
      } else {
        setErrors({ server: result.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ server: 'Network error' });
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.formContainer}>
        <InputField
          label="Enter your email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Enter your password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={errors.password}
        />
        {errors.server && <p style={styles.error}>{errors.server}</p>}
        <Button text="Log In" onClick={handleLogin} />
        <p style={styles.forgotPassword}>Forgot Password?</p>
        <div style={styles.linkContainer}>
          <span>Don’t have an account? </span>
          <Link to="/signup" style={styles.link}>Sign Up</Link>
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
    backgroundRepeat: 'no-repeat',
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
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default Login;
