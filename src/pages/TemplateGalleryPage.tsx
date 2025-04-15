import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateGallery from '@/components/template-gallery/TemplateGallery';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const TemplateGalleryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleSelectTemplate = (templateId: string) => {
    // In a real app, this would create a new project with the selected template
    navigate('/template-builder');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 mb-6"
            onClick={handleBackToDashboard}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>

          <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>

          <TemplateGallery onSelectTemplate={handleSelectTemplate} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateGalleryPage;
