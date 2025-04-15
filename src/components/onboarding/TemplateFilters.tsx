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

interface TemplateFiltersProps {
  categories: CategoryData[];
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (categoryId: string) => void;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
}

const TemplateFilters = ({
  categories,
  selectedCategory,
  searchQuery,
  setSelectedCategory,
  setSearchQuery,
  handleClearSearch,
}: TemplateFiltersProps) => {
  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : 'All Templates';
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <h2 className="text-2xl font-semibold">Choose a Template</h2>

      <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
        {/* Category dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-between">
              {getCategoryName()}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {categories.map((category) => (
              <DropdownMenuItem key={category.id} onClick={() => setSelectedCategory(category.id)}>
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search input */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 w-full sm:w-[200px]"
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
  );
};

export default TemplateFilters;
