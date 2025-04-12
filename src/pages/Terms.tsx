
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last Updated: April 12, 2025
          </p>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container-custom max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <p>
            Welcome to Scout. Please read these Terms of Service (the "Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using the Scout platform, you agree to comply with and be bound by these Terms.
          </p>
          
          <h2>1. Definitions</h2>
          <p>
            <strong>"Scout"</strong> refers to Scout, Inc., our platform, services, and technologies.
          </p>
          <p>
            <strong>"Services"</strong> means all products, services, features, applications, technologies, and software that we provide, including but not limited to our AI workflow tools, knowledge management systems, and development platforms.
          </p>
          <p>
            <strong>"User"</strong> or "you" refers to any individual or entity that accesses or uses our Services.
          </p>
          <p>
            <strong>"Content"</strong> means any text, data, information, images, videos, prompts, or other materials that are uploaded, transmitted, or otherwise provided through the Services.
          </p>
          
          <h2>2. Account Registration and Eligibility</h2>
          <p>
            You must register for an account to access certain features of the Services. When you register, you agree to provide accurate, current, and complete information about yourself and to update such information as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <p>
            You must be at least 18 years old to use the Services. By using the Services, you represent and warrant that you meet all eligibility requirements.
          </p>
          
          <h2>3. User Content</h2>
          <p>
            You retain ownership of any intellectual property rights that you hold in the Content you upload or provide to the Services. By uploading or providing Content, you grant Scout a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and distribute such Content for the purpose of providing and improving the Services.
          </p>
          <p>
            You are solely responsible for your Content and the consequences of uploading or providing it. You represent and warrant that:
          </p>
          <ul>
            <li>You own or have the necessary licenses, rights, consents, and permissions to use and authorize Scout to use your Content</li>
            <li>Your Content does not violate any third party's intellectual property rights, privacy rights, or other legal rights</li>
            <li>Your Content complies with these Terms and all applicable laws and regulations</li>
          </ul>
          
          <h2>4. Usage Restrictions</h2>
          <p>
            When using the Services, you agree not to:
          </p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the intellectual property rights of others</li>
            <li>Upload or transmit viruses, malware, or other harmful code</li>
            <li>Attempt to gain unauthorized access to the Services or related systems</li>
            <li>Use the Services to generate, distribute, or promote harmful, discriminatory, or illegal content</li>
            <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
            <li>Resell, lease, or distribute access to the Services without our prior written consent</li>
            <li>Use automated methods to scrape, harvest, or extract data from the Services</li>
          </ul>
          
          <h2>5. Pricing and Payment</h2>
          <p>
            Certain features of the Services require payment. You agree to pay all fees in accordance with the pricing and payment terms presented to you. All payments are non-refundable unless expressly stated otherwise or required by law.
          </p>
          <p>
            We may change our prices from time to time. If we change our prices, we will provide notice of the change on the Site or by email, at our option, at least 30 days before the change takes effect.
          </p>
          
          <h2>6. Intellectual Property</h2>
          <p>
            The Services and all materials therein, including, without limitation, the Scout name, logo, software, designs, text, graphics, and other files are owned by Scout or our licensors. You may not duplicate, copy, or reuse any portion of the HTML/CSS, JavaScript, visual design elements, or concepts without express written permission from Scout.
          </p>
          
          <h2>7. Privacy</h2>
          <p>
            Our Privacy Policy, available at [privacy policy URL], explains how we collect, use, and protect your personal information. By using the Services, you consent to the collection and use of information as detailed in our Privacy Policy.
          </p>
          
          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
          </p>
          
          <h2>9. Disclaimer of Warranties</h2>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          
          <h2>10. Limitation of Liability</h2>
          <p>
            IN NO EVENT SHALL SCOUT, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
          </p>
          
          <h2>11. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Scout and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
          </p>
          
          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
          </p>
          
          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
          
          <h2>14. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at legal@scout.com.
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terms;
