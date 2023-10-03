import React from "react";
import "./App.css";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'; // Import the Dashboard component

function App() {
  return (
    <Router>
      <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes> {/* Use Routes component to define nested routes */}
          <Route path="/dashboard/client" element={<Dashboard dataType="client"/>} />
          <Route path="/dashboard/agency" element={<Dashboard dataType="agency"/>} />
          <Route path="/dashboard/location" element={<Dashboard dataType="location"/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;