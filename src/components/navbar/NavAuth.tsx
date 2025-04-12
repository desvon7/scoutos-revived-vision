
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NavAuth = () => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/signin" className="text-sm font-medium hover:text-primary/80 transition-colors hidden sm:inline-flex">
        Log In
      </Link>
      <Link to="/signup">
        <Button variant="default" size="sm" className="rounded-full">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default NavAuth;
