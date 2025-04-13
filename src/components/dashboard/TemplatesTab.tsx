
import React, { useState } from 'react';
import TemplateFilterBar from './TemplateFilterBar';
import TemplateResults from './TemplateResults';
import { templateCategories, templatesData } from './template-data';

interface TemplatesTabProps {
  onUseTemplate: () => void;
}

const TemplatesTab = ({ onUseTemplate }: TemplatesTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter templates based on search and category
  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <TemplateFilterBar 
        categories={templateCategories}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
        handleClearSearch={handleClearSearch}
      />

      <TemplateResults 
        filteredTemplates={filteredTemplates}
        onUseTemplate={onUseTemplate}
      />
    </div>
  );
};

export default TemplatesTab;
