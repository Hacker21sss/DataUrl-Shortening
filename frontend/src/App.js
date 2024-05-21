
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Urlshortner from './components/Urlshortner';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
        <Route path="/"  element={<Signup/>} />
        <Route path="/login"  element={<Login/>} />
          <Route path="/url"  element={<Urlshortner/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
