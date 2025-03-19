
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2>Our Commitment to Privacy</h2>
          <p>
            ATS ProScan is committed to protecting your privacy. This Privacy Policy explains how we handle your data.
          </p>
          
          <h2>No Data Collection</h2>
          <p>
            ATS ProScan processes all resume scanning locally in your browser. We do not collect, store, or transmit:
          </p>
          <ul>
            <li>Your resume content</li>
            <li>Job descriptions you enter</li>
            <li>Scan results or reports</li>
            <li>Personal information of any kind</li>
          </ul>
          
          <h2>Client-Side Processing</h2>
          <p>
            All processing happens directly on your device. Your resume never leaves your computer, and no information is sent to our servers or any third parties.
          </p>
          
          <h2>Cookies and Local Storage</h2>
          <p>
            We use minimal browser storage (localStorage) only to remember your preference settings (like dark/light mode). No tracking or analytics cookies are used.
          </p>
          
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy occasionally. We will notify you of any changes by posting the new policy on this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@atsproscan.example.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
