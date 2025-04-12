
import React from 'react';
import TemplateCard from './TemplateCard';

interface TemplatesTabProps {
  onUseTemplate: () => void;
}

const TemplatesTab = ({ onUseTemplate }: TemplatesTabProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemplateCard 
          emoji="📝"
          title="AI-Powered SEO Blog Generator"
          description="Automate the creation of SEO-optimized blog posts using AI and NLP"
          onClick={onUseTemplate}
        />
        
        <TemplateCard 
          emoji="🌐"
          title="Perplexity Clone"
          description="This workflow searches the web and uses an LLM to format a response"
          onClick={onUseTemplate}
        />
        
        <TemplateCard 
          emoji="🚀"
          title="Basic LLM Workflow"
          description="Enhance your productivity with the Basic LLM Workflow"
          onClick={onUseTemplate}
        />
      </div>
    </div>
  );
};

export default TemplatesTab;
