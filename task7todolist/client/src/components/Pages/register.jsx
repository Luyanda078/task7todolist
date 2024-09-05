import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../inputfield';
import Button from './button';
import Header from './header';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Handle sign-up logic
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
        />
        <InputField
          label="Enter your email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <InputField
          label="Enter a new password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button text="Done" onClick={handleSignUp} />
        <div style={styles.linkContainer}>
          <span>Already have an account? </span>
          <Link to="/login" style={styles.link}>Log In</Link> {/* Link to Login page */}
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
