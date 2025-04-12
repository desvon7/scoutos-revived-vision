import { NodeTemplate } from './NodeTemplates';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NodePanelProps {
  templates: NodeTemplate[];
  onClose: () => void;
  onSelectNode: (template: NodeTemplate) => void;
}

export function NodePanel({ templates, onClose, onSelectNode }: NodePanelProps) {
  return (
    <div className="absolute right-4 top-4 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Add Node</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {templates.map((template) => (
          <button
            key={template.type}
            className="w-full p-3 text-left rounded-md hover:bg-gray-100 flex items-center gap-2"
            onClick={() => onSelectNode(template)}
          >
            {template.icon}
            <div>
              <div className="font-medium">{template.name}</div>
              <div className="text-sm text-gray-500">{template.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
