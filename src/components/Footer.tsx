
import React from 'react';
import { Link } from 'react-router-dom';
import { Asterisk, Twitter, Linkedin, Github, Slack } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 py-12 md:py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Asterisk className="h-5 w-5" />
              <span className="font-medium">scout</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Scout platform enables you and your team to build and deploy AI workflows faster than ever before.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://twitter.com" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://slack.com" aria-label="Slack" className="text-muted-foreground hover:text-foreground">
                <Slack className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/changelog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/brand" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Brand
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">* All systems operational</p>
          <p className="text-xs text-muted-foreground">Copyright © {new Date().getFullYear()} Scout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
