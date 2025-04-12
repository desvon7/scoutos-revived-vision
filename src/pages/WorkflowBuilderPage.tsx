
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Maximize2, Minimize2, Layers, MoreHorizontal, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const WorkflowBuilderPage = () => {
  const [workflowName, setWorkflowName] = useState('Untitled');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleSave = () => {
    toast.success("Workflow saved successfully");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        toast.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const increaseZoom = () => {
    if (zoom < 200) setZoom(zoom + 10);
  };

  const decreaseZoom = () => {
    if (zoom > 50) setZoom(zoom - 10);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center border-b bg-white p-3">
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white">
              <Layers size={16} />
            </div>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-lg font-medium border-none focus:outline-none focus:ring-0 bg-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Saved
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div 
        className="flex-1 grid place-items-center bg-white bg-grid-pattern"
        style={{ 
          transform: `scale(${zoom / 100})`, 
          transition: 'transform 0.2s ease-out',
          backgroundSize: '20px 20px',
          backgroundImage: 'linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)'
        }}
      >
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="mb-4 text-sm text-gray-500">Trigger</div>
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="text-gray-700">Set a trigger</div>
          </div>
          <div className="text-sm text-gray-500 mb-4">OR</div>
          <Button variant="outline" className="w-full">
            <div className="flex items-center justify-center">
              <Layers className="h-4 w-4 mr-2" />
              Start with a template
            </div>
          </Button>
        </div>
      </div>

      {/* Footer Controls */}
      <footer className="flex justify-between items-center border-t bg-white p-3">
        <div></div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={decreaseZoom}>
            <span className="sr-only">Zoom out</span>
            <span>-</span>
          </Button>
          <span className="text-sm">{zoom}%</span>
          <Button variant="outline" size="icon" onClick={increaseZoom}>
            <span className="sr-only">Zoom in</span>
            <span>+</span>
          </Button>
          <Button variant="outline" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default WorkflowBuilderPage;
