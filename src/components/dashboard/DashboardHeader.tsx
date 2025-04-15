import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface DashboardHeaderProps {
  title: string;
  description: string;
  showCreateButton?: boolean;
  createButtonText?: string;
  createButtonLink?: string;
}

const DashboardHeader = ({
  title,
  description,
  showCreateButton = true,
  createButtonText = 'Create Workflow',
  createButtonLink = '/workflow/new',
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>

      {showCreateButton && (
        <Link href={createButtonLink}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {createButtonText}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardHeader;
