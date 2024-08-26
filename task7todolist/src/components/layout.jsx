import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>To Do List App</h1>
      </header>

      <main style={styles.mainContent}>
        <Outlet /> {/* This is where the child routes will be rendered */}
      </main>

      <footer style={styles.footer}>
        <p>&copy; Task 7 Luyanda Shamase To Do List App. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width:'300%'
  },
  header: {
    backgroundColor: '#5B67CA',
    padding: '10px 20px',
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    margin: 0,
    fontSize: '1.5em',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  footer: {
    backgroundColor: '#3E5151',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
  }
};

export default Layout;
