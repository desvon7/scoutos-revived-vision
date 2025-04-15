import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import WorkflowEditor from '@/components/workflow/workflow-editor';
import NodePalette from '@/components/workflow/NodePalette';
import PropertiesPanel from '@/components/workflow/PropertiesPanel';
import WorkflowConsole from '@/components/workflow/WorkflowConsole';
import { useWorkflowStore } from '@/components/workflow/store';

const WorkflowBuilderPage: React.FC = () => {
  const { workflow, saveWorkflow, exportWorkflow, importWorkflow, undo, redo } = useWorkflowStore();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');

  // Handle saving the workflow
  const handleSave = () => {
    saveWorkflow();
    toast({
      title: 'Success',
      description: 'Workflow saved successfully',
    });
  };

  // Handle exporting the workflow
  const handleExport = () => {
    setShowExportModal(true);
  };

  // Handle importing a workflow
  const handleImport = () => {
    setShowImportModal(true);
  };

  // Handle workflow import submission
  const handleImportSubmit = () => {
    try {
      importWorkflow(importData);
      setShowImportModal(false);
      setImportData('');
      toast({
        title: 'Success',
        description: 'Workflow imported successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Error importing workflow: ${error.message}`,
      });
    }
  };

  return (
    <div className="workflow-builder-page h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Scout OS Revived</h1>
          <div className="ml-8 flex items-center space-x-2">
            <input
              type="text"
              value={workflow.name}
              onChange={(e) => {
                workflow.name = e.target.value;
                useWorkflowStore.setState({ workflow: { ...workflow } });
              }}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-1"
            />
            <span className="text-gray-400 text-sm">v{workflow.version}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            onClick={redo}
          >
            Redo
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            onClick={handleExport}
          >
            Export
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Node palette */}
        <NodePalette />

        {/* Workflow editor */}
        <div className="flex-1 relative overflow-hidden">
          <WorkflowEditor />
        </div>

        {/* Properties panel */}
        <PropertiesPanel />
      </div>

      {/* Console */}
      <WorkflowConsole />

      {/* Export modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Export Workflow</h2>
            <textarea
              className="w-full h-64 bg-gray-900 text-white font-mono p-4 rounded"
              readOnly
              value={exportWorkflow()}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-2"
                onClick={() => setShowExportModal(false)}
              >
                Close
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => {
                  navigator.clipboard.writeText(exportWorkflow());
                  toast({
                    title: 'Success',
                    description: 'Workflow JSON copied to clipboard',
                  });
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Import Workflow</h2>
            <textarea
              className="w-full h-64 bg-gray-900 text-white font-mono p-4 rounded"
              placeholder="Paste workflow JSON here..."
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-2"
                onClick={() => {
                  setShowImportModal(false);
                  setImportData('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={handleImportSubmit}
                disabled={!importData.trim()}
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilderPage;
