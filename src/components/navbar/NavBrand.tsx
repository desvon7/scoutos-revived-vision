
import React from 'react';
import { Link } from 'react-router-dom';
import { Asterisk } from 'lucide-react';

const NavBrand = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Asterisk className="h-5 w-5" />
      <span className="font-medium">scout</span>
    </Link>
  );
};

export default NavBrand;
