
import React from 'react';
import { Link } from 'react-router-dom';
import { Asterisk, Twitter, Linkedin, Github, Slack } from 'lucide-react';

const FooterBrand = () => {
  const socialLinks = [
    { href: "https://twitter.com", label: "Twitter", icon: <Twitter className="h-5 w-5" /> },
    { href: "https://linkedin.com", label: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
    { href: "https://github.com", label: "GitHub", icon: <Github className="h-5 w-5" /> },
    { href: "https://slack.com", label: "Slack", icon: <Slack className="h-5 w-5" /> },
  ];

  return (
    <div className="mb-6 md:mb-0">
      <Link to="/" className="flex items-center gap-2 mb-4">
        <Asterisk className="h-5 w-5" />
        <span className="font-medium">scout</span>
      </Link>
      <p className="text-sm text-muted-foreground max-w-sm">
        Scout platform enables you and your team to build and deploy AI workflows faster than ever before.
      </p>
      <div className="flex items-center gap-4 mt-6">
        {socialLinks.map((social) => (
          <a 
            key={social.href}
            href={social.href} 
            aria-label={social.label} 
            className="text-muted-foreground hover:text-foreground"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterBrand;
