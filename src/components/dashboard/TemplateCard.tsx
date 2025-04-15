import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  emoji: string;
  title: string;
  description: string;
  onClick: () => void;
  backgroundColor?: string;
  className?: string;
}

const TemplateCard = ({
  emoji,
  title,
  description,
  onClick,
  backgroundColor = '#4f46e5',
  className,
}: TemplateCardProps) => {
  return (
    <Card 
      className={cn(
        "border hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5 h-full flex flex-col",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-5 flex-1 flex flex-col">
        <div 
          className="w-10 h-10 flex items-center justify-center rounded-md text-white mb-4 text-xl"
          style={{ backgroundColor }}
        >
          {emoji}
        </div>
        
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1">{description}</p>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-fit"
        >
          Use template
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
