
import React from 'react';
import { cn } from '@/lib/utils';
import { Category } from './template-data';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="font-medium mb-3">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors",
              selectedCategory === category.id ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
            )}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.icon && (
              <span className="mr-2">{category.icon}</span>
            )}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
