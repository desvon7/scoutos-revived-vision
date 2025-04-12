
import { useState } from 'react';
import { NodeTemplate, nodeTemplates, nodeCategories } from './NodeTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NodePanelProps {
  templates: NodeTemplate[];
  onClose: () => void;
  onSelectNode: (template: NodeTemplate) => void;
}

export function NodePanel({ templates, onClose, onSelectNode }: NodePanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter templates based on search query and selected category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           template.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const getCategoryName = () => {
    const category = nodeCategories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'All Templates';
  };

  return (
    <div className="absolute right-4 top-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[80vh] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Node</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {getCategoryName()}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {nodeCategories.map((category) => (
                <DropdownMenuItem 
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={selectedCategory === category.id ? "bg-accent" : ""}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-7 w-7 text-gray-400 hover:text-gray-600"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="overflow-y-auto p-3 flex-1">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No templates match your search
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTemplates.map((template) => (
              <button
                key={template.type}
                className="w-full text-left rounded-md hover:bg-gray-50 transition-colors duration-200 border border-gray-200 overflow-hidden"
                onClick={() => onSelectNode(template)}
              >
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="p-2 rounded-md text-white flex items-center justify-center"
                      style={{ backgroundColor: template.backgroundColor || '#4f46e5' }}
                    >
                      {template.icon}
                    </div>
                    <div className="font-medium">{template.name}</div>
                  </div>
                  <div className="text-sm text-gray-500">{template.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
