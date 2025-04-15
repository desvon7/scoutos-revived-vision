import React from 'react';

const FooterCopyright = () => {
  return (
    <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-xs text-muted-foreground">* All systems operational</p>
      <p className="text-xs text-muted-foreground">
        Copyright © {new Date().getFullYear()} Scout. All rights reserved.
      </p>
    </div>
  );
};

export default FooterCopyright;
