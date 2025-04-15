import React from 'react';
import { Search } from 'lucide-react';
import TemplateCard from './TemplateCard';

interface TemplateData {
  id: string;
  emoji: string;
  title: string;
  description: string;
  category: string;
  backgroundColor: string;
}

interface TemplateResultsProps {
  filteredTemplates: TemplateData[];
  onUseTemplate: () => void;
}

const TemplateResults = ({ filteredTemplates, onUseTemplate }: TemplateResultsProps) => {
  if (filteredTemplates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
        <div className="mb-3">
          <Search className="h-12 w-12 mx-auto text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-1">No templates found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.map((template) => (
        <TemplateCard
          key={template.id}
          emoji={template.emoji}
          title={template.title}
          description={template.description}
          onClick={onUseTemplate}
          backgroundColor={template.backgroundColor}
        />
      ))}
    </div>
  );
};

export default TemplateResults;
