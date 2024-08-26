import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';
import LoginPage from './components/login';
import SignUpPage from './components/register';
import Layout from './components/layout';
import Nopage from './components/nopage';
import Header from './components/header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes will be rendered inside the Layout */}
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




