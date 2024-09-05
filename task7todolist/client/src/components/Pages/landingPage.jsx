import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';

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
    backgroundImage:'url("https://i.pinimg.com/1200x/b1/e5/d9/b1e5d9c98a49442a683cea749316850e.jpg")'

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

