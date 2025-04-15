import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
  return (
    <div className="w-full bg-black text-white py-1.5 text-center text-sm">
      <div className="container-custom flex justify-center items-center">
        <span>Announcing: The Scout CLI and AI Workflows as Code</span>
        <Link
          to="/learn-more"
          className="ml-3 inline-flex items-center font-medium underline-offset-4 hover:underline"
        >
          Learn More <ChevronRight className="h-3 w-3 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;
