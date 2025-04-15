'use client';

import NavBrand from './navbar/NavBrand';
import NavLinks from './navbar/NavLinks';
import NavAuth from './navbar/NavAuth';

const Navigation = () => {
  return (
    <nav className="flex h-16 items-center justify-between">
      <NavBrand />
      <NavLinks />
      <NavAuth />
    </nav>
  );
};

export default Navigation; 