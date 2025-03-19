
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2>Agreement to Terms</h2>
          <p>
            By using ATS ProScan, you agree to these Terms of Use. If you disagree with any part of the terms, you may not access the service.
          </p>
          
          <h2>Use License</h2>
          <p>
            ATS ProScan grants you a personal, non-transferable, non-exclusive license to use the web application for personal job search purposes.
          </p>
          
          <h2>Disclaimer</h2>
          <p>
            ATS ProScan is provided "as is" without warranties of any kind. We do not guarantee that:
          </p>
          <ul>
            <li>The service will meet your specific requirements</li>
            <li>The service will be uninterrupted, timely, secure, or error-free</li>
            <li>The results from using the service will be accurate or reliable</li>
            <li>The quality of the analysis will meet your expectations</li>
          </ul>
          
          <h2>Limitations</h2>
          <p>
            In no event shall ATS ProScan be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use or inability to use the service.
          </p>
          
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at terms@atsproscan.example.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
