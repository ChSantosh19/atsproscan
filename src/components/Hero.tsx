
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 500, 0.5);
      const translateY = scrollY * 0.3;
      
      if (heroRef.current) {
        heroRef.current.style.opacity = String(opacity);
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToScanner = () => {
    const scannerSection = document.getElementById('scanner');
    if (scannerSection) {
      scannerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const showSampleReport = () => {
    // Sample report data
    const sampleResults = {
      resumeFileName: "Sample_Resume.pdf",
      keywordMatches: {
        "javascript": true,
        "react": true,
        "typescript": true,
        "node.js": false,
        "express": false,
        "rest api": true,
        "frontend": true,
        "user interface": true,
        "responsive design": true,
        "agile": false,
        "project management": false,
        "testing": true,
        "git": true,
        "team player": true,
        "communication skills": true
      },
      atsScore: 82,
      keywordMatchPercentage: 73,
      interviewProbability: 75,
      missingKeywords: ["node.js", "express", "agile", "project management"],
      sectionScore: 10,
      formatting: {
        hasBulletPoints: true,
        hasQuantifiableAchievements: true,
        hasActionVerbs: true
      },
      penalties: {
        lengthPenalty: 0,
        formattingPenalty: 0,
        keywordStuffingPenalty: 3
      }
    };

    // Save sample data to localStorage to retrieve in scanner component
    localStorage.setItem('sampleReport', JSON.stringify(sampleResults));
    
    // Navigate to scanner section
    const scannerSection = document.getElementById('scanner');
    if (scannerSection) {
      scannerSection.scrollIntoView({ behavior: 'smooth' });
      
      // Delay the event dispatch to ensure the section is visible
      setTimeout(() => {
        // Dispatch a custom event that the ResumeScan component will listen for
        window.dispatchEvent(new CustomEvent('showSampleReport'));
      }, 300);
    }
  };

  return (
    <div id="home" className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-b from-background to-background/90">
      {/* Decorative elements */}
      <div className="hero-blur-circle w-[500px] h-[500px] bg-blue-200/30 left-[-100px] top-[-100px]" />
      <div className="hero-blur-circle w-[300px] h-[300px] bg-purple-200/20 right-[-50px] bottom-[20%]" />
      
      <div className="section-container relative z-10" ref={heroRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary animate-fade-in">
                <Shield className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium">Privacy First. No Data Stored.</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter animate-slide-down">
                Boost Your <span className="text-gradient">Interview Chances</span> Instantly
              </h1>
              
              <p className="text-lg text-muted-foreground animate-slide-down delay-100">
                Get your resume ATS-ready with our cutting-edge scanner. Optimize keywords, 
                discover skill gaps, and increase your interview callback rate.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 animate-slide-down delay-200">
                <Button className="gap-2 button-hover" size="lg" onClick={scrollToScanner}>
                  Try It Now <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="gap-2 button-hover" size="lg" onClick={showSampleReport}>
                  <FileText className="w-4 h-4" /> View Sample Report
                </Button>
              </div>
              
              <div className="animate-slide-down delay-300">
                <p className="text-sm text-muted-foreground mt-4">
                  100% client-side processing • No data sent to servers • Instant results
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="glass-card rounded-3xl p-5 relative backdrop-blur-md">
                <div className="bg-secondary/80 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 text-xs text-muted-foreground">ATS ProScan Result</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ATS Compatibility</span>
                        <span className="text-sm font-bold">92%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Keyword Match</span>
                        <span className="text-sm font-bold">85%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Interview Probability</span>
                        <span className="text-sm font-bold">78%</span>
                      </div>
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="text-xs text-muted-foreground mb-2">Missing keywords</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-background rounded-full text-xs">Docker</span>
                        <span className="px-2 py-1 bg-background rounded-full text-xs">AWS</span>
                        <span className="px-2 py-1 bg-background rounded-full text-xs">Kubernetes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
