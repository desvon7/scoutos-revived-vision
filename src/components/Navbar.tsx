
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Asterisk } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Asterisk className="h-5 w-5" />
            <span className="font-medium">scout</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/features" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Features
            </Link>
            <Link to="/solutions" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Solutions
            </Link>
            <Link to="/changelog" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Changelog
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Pricing
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Blog
            </Link>
            <Link to="/docs" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Docs
            </Link>
            <Link to="/templates" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Templates
            </Link>
          </nav>
        </div>
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
      </div>
    </header>
  );
};

export default Navbar;
