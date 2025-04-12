
import React from 'react';
import FooterBrand from './footer/FooterBrand';
import FooterLinks from './footer/FooterLinks';
import FooterCopyright from './footer/FooterCopyright';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 py-12 md:py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <FooterBrand />
          <FooterLinks />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
