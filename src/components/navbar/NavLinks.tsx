
import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  const links = [
    { to: "/features", label: "Features" },
    { to: "/solutions", label: "Solutions" },
    { to: "/changelog", label: "Changelog" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Blog" },
    { to: "/docs", label: "Docs" },
    { to: "/templates", label: "Templates" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <Link 
          key={link.to}
          to={link.to} 
          className="text-sm font-medium hover:text-primary/80 transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
