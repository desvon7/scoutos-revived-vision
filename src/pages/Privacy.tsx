import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: April 12, 2025</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <p>
            At Scout, we take your privacy very seriously. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use our services. By using
            Scout, you agree to the collection and use of information in accordance with this
            policy.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li>
              Account information: When you register for an account, we collect your name, email
              address, password, and other information you provide during registration.
            </li>
            <li>
              Profile information: Information you add to your profile, such as your job title,
              company, and profile picture.
            </li>
            <li>
              Content: Information and content you provide when using our services, including
              prompts, documents, and other materials you upload, share, or create.
            </li>
            <li>
              Communications: Information you provide when contacting us, responding to surveys, or
              communicating with our support team.
            </li>
            <li>
              Payment information: When you subscribe to our paid services, we collect payment
              information, which is processed by our third-party payment processors.
            </li>
          </ul>

          <h3>1.2 Information We Collect Automatically</h3>
          <p>When you use our services, we automatically collect certain information, including:</p>
          <ul>
            <li>
              Usage information: Information about your interactions with our services, including
              features used, content accessed, and actions taken.
            </li>
            <li>
              Log data: Server logs and information about your device, IP address, browser type,
              operating system, referring/exit pages, and timestamps.
            </li>
            <li>
              Device information: Information about the device you use to access our services,
              including device model, operating system, unique device identifiers, and mobile
              network information.
            </li>
            <li>
              Cookies and similar technologies: We use cookies and similar technologies to collect
              information about your browsing activities and preferences.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Improving and personalizing our services</li>
            <li>Processing your transactions and managing your account</li>
            <li>Communicating with you about our services, updates, and promotions</li>
            <li>Responding to your requests and providing customer support</li>
            <li>Analyzing usage patterns and optimizing our services</li>
            <li>Protecting our services, users, and the public</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>We may share your information in the following circumstances:</p>
          <ul>
            <li>
              <strong>With your consent:</strong> We may share your information when you direct us
              to do so.
            </li>
            <li>
              <strong>With service providers:</strong> We may share information with third-party
              vendors, consultants, and other service providers who require access to perform work
              on our behalf.
            </li>
            <li>
              <strong>For legal reasons:</strong> We may share information if we believe it is
              necessary to comply with applicable laws, regulations, legal processes, or
              governmental requests.
            </li>
            <li>
              <strong>In connection with a merger, sale, or acquisition:</strong> If Scout is
              involved in a merger, acquisition, or sale of all or a portion of its assets, your
              information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>To protect rights and safety:</strong> We may disclose information if we
              believe it is necessary to protect the rights, property, and safety of Scout, our
              users, or the public.
            </li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain your information for as long as your account is active or as needed to provide
            you with our services. We will also retain and use your information as necessary to
            comply with our legal obligations, resolve disputes, and enforce our agreements.
          </p>

          <h2>5. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your
            information against unauthorized access, disclosure, alteration, or destruction.
            However, no method of transmission over the Internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>

          <h2>6. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal
            information, including:
          </p>
          <ul>
            <li>Accessing, correcting, or deleting your information</li>
            <li>Withdrawing your consent</li>
            <li>Objecting to or restricting certain processing activities</li>
            <li>Requesting portability of your information</li>
            <li>Lodging a complaint with a data protection authority</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the
            "Contact Us" section below.
          </p>

          <h2>7. International Data Transfers</h2>
          <p>
            Your information may be transferred to, stored, and processed in countries other than
            the one in which you reside. By using our services, you consent to the transfer of your
            information to countries outside your country of residence, which may have different
            data protection rules.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly
            collect personal information from children. If you become aware that a child has
            provided us with personal information, please contact us, and we will take steps to
            delete such information.
          </p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last Updated" date. You
            are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please
            contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@scout.com
            <br />
            <strong>Address:</strong> 123 AI Street, San Francisco, CA 94105, USA
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
