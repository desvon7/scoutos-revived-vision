import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TemplateData {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  backgroundColor: string;
}

interface TemplateListProps {
  templates: TemplateData[];
  filteredTemplates: TemplateData[];
  searchQuery: string;
  handleUseTemplate: () => void;
}

const TemplateList = ({
  templates,
  filteredTemplates,
  searchQuery,
  handleUseTemplate,
}: TemplateListProps) => {
  if (filteredTemplates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
        <div className="mb-3">
          <div className="h-12 w-12 mx-auto text-gray-400">🔍</div>
        </div>
        <h3 className="text-lg font-medium mb-1">No templates found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.map((template) => (
        <Card
          key={template.id}
          className="border border-border hover:shadow-md transition-all cursor-pointer hover:translate-y-[-2px] h-full flex flex-col"
          onClick={handleUseTemplate}
        >
          <CardContent className="p-5 flex-1 flex flex-col">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-md text-white mb-4 text-xl"
              style={{ backgroundColor: template.backgroundColor }}
            >
              {template.icon}
            </div>
            <h3 className="font-medium mb-2">{template.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{template.description}</p>
            <Button variant="outline" size="sm">
              Use template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TemplateList;
