
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import TemplateGalleryPage from './pages/TemplateGalleryPage';
import WorkflowBuilderPage from './pages/WorkflowBuilderPage';
import TemplateBuilderPage from './pages/TemplateBuilderPage';
import Index from './pages/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard/*" element={
          <DashboardLayout>
            <div>Dashboard Content</div>
          </DashboardLayout>
        } />
        <Route path="/template-gallery" element={<TemplateGalleryPage />} />
        <Route path="/workflow-builder/:id?" element={<WorkflowBuilderPage />} />
        <Route path="/template-builder" element={<TemplateBuilderPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
