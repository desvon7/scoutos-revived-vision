'use client';

import FooterBrand from './FooterBrand';
import FooterLinkGroup from './FooterLinkGroup';
import { Twitter, Linkedin, Github, Slack } from 'lucide-react';

export default function Footer() {
  const productLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/docs', label: 'Documentation' },
    { href: '/changelog', label: 'Changelog' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/security', label: 'Security' },
  ];

  const socialLinks = [
    { href: 'https://twitter.com', label: 'Twitter', icon: <Twitter className="h-5 w-5" /> },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: <Linkedin className="h-5 w-5" /> },
    { href: 'https://github.com', label: 'GitHub', icon: <Github className="h-5 w-5" /> },
    { href: 'https://slack.com', label: 'Slack', icon: <Slack className="h-5 w-5" /> },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <FooterBrand />
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterLinkGroup title="Product" links={productLinks} />
              <FooterLinkGroup title="Company" links={companyLinks} />
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterLinkGroup title="Legal" links={legalLinks} />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Scout OS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 