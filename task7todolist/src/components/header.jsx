import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div style={styles.header}>
      <Link to="/" style={styles.backArrow}>
        &larr; Back
      </Link>
    </div>
  );
};

const styles = {
  header: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '24px',
    cursor: 'pointer',
  },
  backArrow: {
    fontSize: '20px',
    textDecoration: 'none',
    color: '#5B67CA',
    marginTop:'50%'
  },
};

export default Header;
