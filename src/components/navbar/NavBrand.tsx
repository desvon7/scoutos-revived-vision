'use client';

import Link from 'next/link';
import { ScoutLogo } from '@/components/icons/ScoutLogo';

const NavBrand = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <ScoutLogo />
      <span className="font-semibold">Scout OS</span>
    </Link>
  );
};

export default NavBrand;
