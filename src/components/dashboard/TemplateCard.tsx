
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TemplateCardProps {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
}

const TemplateCard = ({ emoji, title, description, onClick }: TemplateCardProps) => {
  return (
    <Card className="border hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <div className="text-3xl mb-2">{emoji}</div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" size="sm">Use template</Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
