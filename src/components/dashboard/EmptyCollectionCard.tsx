
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyCollectionCardProps {
  onClick: () => void;
}

const EmptyCollectionCard = ({ onClick }: EmptyCollectionCardProps) => {
  return (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={onClick}>
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-60">
        <FilePlus className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Create a new collection</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add documents, websites, or other data sources
        </p>
        <Button>Create Collection</Button>
      </CardContent>
    </Card>
  );
};

export default EmptyCollectionCard;
