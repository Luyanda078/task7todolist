import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../inputfield';
import Button from '../button';
import Header from '../header';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^0\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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

  const handleSignUp = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Handle sign-up logic (e.g., send data to server)
    console.log('Signing up with:', fullName, phoneNumber, email, password);
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.formContainer}>
        <InputField
          label="Full Name"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <InputField
          label="Enter your phone number"
          type="tel"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          error={errors.phoneNumber}
        />
        <InputField
          label="Enter your email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Enter a new password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={errors.password}
        />
        <InputField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <button text="Done" onClick={handleSignUp} />
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
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
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

export default SignUpPage;
