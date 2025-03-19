
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const DataProtection = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Data Protection</h1>
        
        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2>Client-Side Processing</h2>
          <p>
            ATS ProScan processes all data (resume content and job descriptions) entirely in your browser. No information is transmitted to our servers or any third parties.
          </p>
          
          <h2>No Data Collection</h2>
          <p>
            We do not:
          </p>
          <ul>
            <li>Store your resume on any server</li>
            <li>Process your personal information in any way</li>
            <li>Share or sell any user data</li>
            <li>Track user behavior or create user profiles</li>
          </ul>
          
          <h2>Security</h2>
          <p>
            Since all processing happens on your device, the security of your information depends on your browser's security features. We recommend keeping your browser updated to the latest version.
          </p>
          
          <h2>Browser Storage</h2>
          <p>
            We use localStorage solely for storing your theme preference. This data never leaves your device.
          </p>
          
          <h2>Your Rights</h2>
          <p>
            Since we don't collect any personal data, there's nothing we need to provide access to, rectify, or delete. However, you can clear your browser's localStorage at any time to remove any preferences saved by ATS ProScan.
          </p>
          
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Data Protection Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Data Protection Policy, please contact us at data@atsproscan.example.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataProtection;
