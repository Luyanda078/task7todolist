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
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Logged in successfully:', response.data);
        // Handle successful login (e.g., redirect or store user info)
      } else {
        setErrors({ server: response.data.error || 'Login failed' });
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
    backgroundImage: 'url("https://preview.redd.it/nmgj2dntkym71.jpg?auto=webp&s=b8a21cba35f44062e9092e46bf98721cde37ef0d")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff', // Adjust text color for better readability
  },
  formContainer: {
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for readability
    padding: '20px',
    borderRadius: '10px',
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
