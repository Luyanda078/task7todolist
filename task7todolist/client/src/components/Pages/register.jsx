import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../inputfield';
import Header from '../header';
import axios from 'axios';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^0\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!phoneNumber.match(phoneRegex)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits starting with 0';
    }
    if (!email.match(emailRegex)) {
      newErrors.email = 'Invalid email address';
    }
    if (!password.match(passwordRegex)) {
      newErrors.password = 'Password must be at least 8 characters long and include both letters and numbers';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSignUp = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        fullName,
        phoneNumber,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage('Registration successful! Please log in.');
        setErrors({});
        // Clear form fields after successful registration
        setFullName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      if (error.response) {
        setErrors({ server: error.response.data.error });
      } else {
        setErrors({ server: 'Network error' });
      }
      setMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.formContainer}>
        <InputField
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
        />
        <InputField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          error={errors.phoneNumber}
        />
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <button onClick={handleSignUp}>Done</button>
        {message && <p style={styles.successMessage}>{message}</p>}
        {errors.server && <p style={styles.errorMessage}>{errors.server}</p>}
        <div style={styles.linkContainer}>
          <span>Already have an account? </span>
          <Link to="/login" style={styles.link}>Log In</Link>
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
    backgroundImage: 'url("https://i.pinimg.com/originals/8e/94/8f/8e948f67e48d099f412133f8a3ca2f7f.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
  },
  formContainer: {
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '20px',
    borderRadius: '10px',
  },
  linkContainer: {
    marginTop: '20px',
  },
  link: {
    color: '#5B67CA',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
};

export default SignUpPage;
