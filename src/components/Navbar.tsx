import React from 'react';
import NavBrand from './navbar/NavBrand';
import NavLinks from './navbar/NavLinks';
import NavAuth from './navbar/NavAuth';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <NavBrand />
          <NavLinks />
        </div>
        <NavAuth />
      </div>
    </header>
  );
};

export default Navbar;
