'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NavLinks = () => {
  const pathname = usePathname();
  
  const links = [
    { href: '/features', label: 'Features' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Docs' },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-white",
            pathname === link.href ? "text-white" : "text-neutral-400"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
