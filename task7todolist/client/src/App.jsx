import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes , Navigate} from 'react-router-dom';
import LandingPage from './components/Pages/landingPage';
import LoginPage from './components/Pages/login';
import SignUpPage from './components/Pages/register';
import Layout from './components/layout';
import Nopage from './components/Pages/nopage';
import Header from './components/header';
import ToDoListPage from './components/Pages/todolist';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes will be rendered inside the Layout */}
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/todolist" element={<ToDoListPage />} />
          <Route path="*" element={<Nopage />} />
          
          <Route
            path="todolist"
            element={isAuthenticated ? <ToDoListPage /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




