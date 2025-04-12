import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/index';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
