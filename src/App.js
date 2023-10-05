import React from "react";
import "./App.css";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SubDashboard from './pages/SubDashboard';

function App() {
  return (
    <Router>
      <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/client" element={<Dashboard dataType="client"/>} />
          <Route path="/dashboard/agency" element={<Dashboard dataType="agency"/>} />
          <Route path="/dashboard/location" element={<Dashboard dataType="location"/>} />
          <Route path="/dashboard/trial" element={<Dashboard dataType="trial"/>} />
          <Route path="/dashboard/rize" element={<SubDashboard dataType="rize"/>} />
          <Route path="/dashboard/reviewtrackers" element={<SubDashboard dataType="reviewtrackers"/>} />
          <Route path="/dashboard/reviewshake" element={<SubDashboard dataType="reviewshake"/>} />
          <Route path="/dashboard/grade" element={<SubDashboard dataType="grade"/>} />
          <Route path="/dashboard/whitelabel" element={<SubDashboard dataType="whitelabel"/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;