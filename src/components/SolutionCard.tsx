
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SolutionCardProps {
  title: string;
  description: string;
  link: string;
}

const SolutionCard = ({ title, description, link }: SolutionCardProps) => {
  return (
    <div className="p-6 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Link to={link} className="text-sm font-medium inline-flex items-center hover:underline">
        Learn more <ChevronRight className="h-3 w-3 ml-1" />
      </Link>
    </div>
  );
};

export default SolutionCard;
