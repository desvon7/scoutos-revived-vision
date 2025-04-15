import React from 'react';
import FooterLinkGroup from './FooterLinkGroup';

const FooterLinks = () => {
  const linkGroups = [
    {
      title: 'Links',
      links: [
        { to: '/features', label: 'Features' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/changelog', label: 'Changelog' },
        { to: '/docs', label: 'Docs' },
        { to: '/blog', label: 'Blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { to: '/terms', label: 'Terms of Use' },
        { to: '/privacy', label: 'Privacy Policy' },
        { to: '/security', label: 'Security' },
      ],
    },
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About' },
        { to: '/careers', label: 'Careers' },
        { to: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { to: '/templates', label: 'Templates' },
        { to: '/community', label: 'Community' },
        { to: '/brand', label: 'Brand' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {linkGroups.map((group) => (
        <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
      ))}
    </div>
  );
};

export default FooterLinks;
