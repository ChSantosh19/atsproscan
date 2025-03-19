
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2>Cookie Usage</h2>
          <p>
            ATS ProScan does not use cookies for tracking, analytics, or advertising purposes.
          </p>
          
          <h2>Local Storage</h2>
          <p>
            We use browser localStorage only to store your preferences, such as theme settings (light/dark mode). This information stays on your device and is not sent to our servers.
          </p>
          
          <h2>Third-Party Cookies</h2>
          <p>
            We do not include any third-party services that set cookies on your device.
          </p>
          
          <h2>Managing Browser Settings</h2>
          <p>
            You can control and manage cookies in your browser settings. Please note that removing or blocking cookies or local storage may affect your user experience.
          </p>
          
          <h2>Changes to This Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at cookies@atsproscan.example.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
