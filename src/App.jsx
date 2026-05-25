import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Import Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import CardiologyClinic from './pages/CardiologyClinic';
import PathologyClinic from './pages/PathologyClinic';
import LaboratoryAnalysis from './pages/LaboratoryAnalysis';
import PediatricClinic from './pages/PediatricClinic';
import CardiacClinic from './pages/CardiacClinic';
import NeurologyClinic from './pages/NeurologyClinic';
import ContactUs from './pages/ContactUs';
import BookAppointment from './pages/BookAppointment';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Routing Paths */}
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="services" element={<Services />} />
          
          {/* Clinic Service Sub-Paths */}
          <Route path="services/cardiology-clinic" element={<CardiologyClinic />} />
          <Route path="services/pathology-clinic" element={<PathologyClinic />} />
          <Route path="services/laboratory-analysis" element={<LaboratoryAnalysis />} />
          <Route path="services/pediatric-clinic" element={<PediatricClinic />} />
          <Route path="services/cardiac-clinic" element={<CardiacClinic />} />
          <Route path="services/neurology-clinic" element={<NeurologyClinic />} />
          
          {/* Contact & Appointment Pages */}
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          
          {/* Fallback Redirection */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
