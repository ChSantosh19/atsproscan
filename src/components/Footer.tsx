
import React from 'react';
import { Shield, Globe, FileText, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };

  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold">ATS ProScan</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              ATS ProScan is a free tool that helps job seekers optimize their resumes for applicant tracking systems. 
              All processing happens client-side, ensuring your data never leaves your device.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary mr-1" />
              <span>Privacy First</span>
              <span className="mx-2">•</span>
              <span>No Data Storage</span>
              <span className="mx-2">•</span>
              <span>Client-Side Only</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="https://www.indeed.com/career-advice/resume-samples" 
                  onClick={() => openExternalLink("https://www.indeed.com/career-advice/resume-samples")}
                  className="text-muted-foreground hover:text-foreground transition-colors">Resume Templates</a></li>
              <li><a href="https://www.jobscan.co/blog/ats-friendly-resume/"
                  onClick={() => openExternalLink("https://www.jobscan.co/blog/ats-friendly-resume/")}
                  className="text-muted-foreground hover:text-foreground transition-colors">ATS Guide</a></li>
              <li><a href="https://www.thebalancemoney.com/how-to-include-keywords-on-resume-4151353"
                  onClick={() => openExternalLink("https://www.thebalancemoney.com/how-to-include-keywords-on-resume-4151353")}
                  className="text-muted-foreground hover:text-foreground transition-colors">Keyword Optimization</a></li>
              <li><a href="https://www.themuse.com/advice/interview-questions-and-answers"
                  onClick={() => openExternalLink("https://www.themuse.com/advice/interview-questions-and-answers")}
                  className="text-muted-foreground hover:text-foreground transition-colors">Interview Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Use</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link to="/data-protection" className="text-muted-foreground hover:text-foreground transition-colors">Data Protection</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} ATS ProScan. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="#" 
               onClick={() => openExternalLink("https://www.example.com")} 
               className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" 
               onClick={() => openExternalLink("https://github.com/example/ats-proscan")} 
               className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" 
               onClick={() => openExternalLink("https://www.example.com/docs")} 
               className="text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
