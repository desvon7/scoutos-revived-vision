import React from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CategoryData {
  id: string;
  name: string;
}

interface TemplateFilterBarProps {
  categories: CategoryData[];
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
}

const TemplateFilterBar = ({
  categories,
  selectedCategory,
  searchQuery,
  setSelectedCategory,
  setSearchQuery,
  handleClearSearch,
}: TemplateFilterBarProps) => {
  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : 'All Templates';
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <h2 className="text-2xl font-semibold">Templates</h2>
      
      <div className="flex gap-3 flex-col sm:flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-between">
              {getCategoryName()}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {categories.map((category) => (
              <DropdownMenuItem 
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-8"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateFilterBar;
