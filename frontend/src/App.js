import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LeadsList from './pages/LeadsList';
import LeadForm from './pages/LeadForm';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><LeadsList /></PrivateRoute>} />
        <Route path="/leads/new" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
        <Route path="/leads/:id/edit" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
