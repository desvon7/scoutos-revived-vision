'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-primary/10 border-b border-primary/20">
      <div className="container flex items-center justify-center gap-2 py-2 text-sm">
        <span className="text-primary">🎉 New: Scout OS Studio is now in beta!</span>
        <Link
          href="/sign-up"
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
        >
          Try it now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;
