import { useState } from 'react'
import './App.css'
import LoginPage from './components/login'
import SignUpPage from './components/register'
import LandingPage from './components/landingPage'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;

