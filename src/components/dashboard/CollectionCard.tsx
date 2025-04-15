import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Box, Bookmark } from 'lucide-react';

interface CollectionCardProps {
  title: string;
  description: string;
  icon: 'box' | 'bookmark';
  count: { value: number; type: string };
  createdDate: string;
  chunks: number;
}

const CollectionCard = ({
  title,
  description,
  icon,
  count,
  createdDate,
  chunks,
}: CollectionCardProps) => {
  const Icon = icon === 'box' ? Box : Bookmark;

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="px-2 py-1 bg-secondary/20 text-xs rounded-full text-muted-foreground">
            {count.value} {count.type}
          </div>
        </div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="mr-4">Created {createdDate}</span>
          <span>{chunks} chunks</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollectionCard;
