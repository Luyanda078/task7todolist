import React from 'react';
import { Link } from 'react-router-dom';
import Button from './button';

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.title}>TO DO LIST</h1>
        <p style={styles.subtitle}>Lorem ipsum dolor sit amet</p>
        <Link to="/login">
          <Button text="Let's Go in baba" />
        </Link>
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
  },
  banner: {
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '2em',
    marginBottom: '0.5em',
  },
  subtitle: {
    fontSize: '1em',
    marginBottom: '1.5em',
  }
};

export default LandingPage;

