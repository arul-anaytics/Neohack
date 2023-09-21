import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminSide from './components/AdminSide';
import TrainerSide from './components/TrainerSide';
import TraineeSide from './components/TraineeSide';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminSide />} />
        <Route path="/trainer" element={<TrainerSide />} />
        <Route path="/trainee" element={<TrainerSide />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
