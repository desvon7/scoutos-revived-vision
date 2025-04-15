'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NavAuth = () => {
  return (
    <div className="flex items-center gap-4">
      <Link href="/sign-in" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
        Sign In
      </Link>
      <Button variant="default" asChild>
        <Link href="/sign-up">
          Get Started
        </Link>
      </Button>
    </div>
  );
};

export default NavAuth;
