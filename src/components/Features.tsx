
import React, { useEffect, useRef } from 'react';
import { CheckCircle, FileText, LineChart, LockKeyhole, BarChart, Zap, FileSearch, ShieldCheck } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  return (
    <div className={`glass-card rounded-xl p-6 h-full flex flex-col animate-slide-up ${delay}`}>
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = sectionRef.current?.querySelectorAll('.feature-card') || [];
    childElements.forEach((el) => observer.observe(el));
    
    return () => {
      childElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-background/90 to-background relative overflow-hidden py-24">
      <div className="section-container relative z-10" ref={sectionRef}>
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary animate-fade-in">
            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Key Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter animate-slide-down">
            Why Choose <span className="text-gradient">ATS ProScan</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-down delay-100">
            Our cutting-edge technology helps you maximize your chances of landing that dream job by optimizing your resume for applicant tracking systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="ATS Score Analysis"
            description="Get an instant score showing how well your resume will perform with applicant tracking systems."
            icon={<BarChart className="w-10 h-10" />}
            delay="delay-0"
          />
          
          <FeatureCard
            title="Skill Gap Detection"
            description="Identify missing keywords and skills that could be preventing you from getting interviews."
            icon={<FileSearch className="w-10 h-10" />}
            delay="delay-100"
          />
          
          <FeatureCard
            title="Instant Reports"
            description="Receive a comprehensive analysis report with actionable recommendations in seconds."
            icon={<Zap className="w-10 h-10" />}
            delay="delay-200"
          />
          
          <FeatureCard
            title="Privacy Guaranteed"
            description="Your data never leaves your device. We process everything locally in your browser."
            icon={<ShieldCheck className="w-10 h-10" />}
            delay="delay-300"
          />
        </div>
        
        <div className="mt-24 bg-gradient-to-r from-secondary/50 to-secondary/90 rounded-2xl p-8 lg:p-12 relative overflow-hidden backdrop-blur-sm border border-white/10">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/40 bg-white/10 backdrop-blur-sm">
                <LockKeyhole className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium">Privacy First Approach</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Your Data Never Leaves Your Device
              </h3>
              
              <p className="text-muted-foreground">
                Unlike other resume scanners, ATS ProScan processes everything locally in your browser. 
                Your resume and job descriptions are never uploaded to any server.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">No server uploads</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">No data storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm">No account required</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card rounded-xl p-6 backdrop-blur-md animate-float">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-primary w-10 h-10" />
                  <div>
                    <h4 className="font-semibold">Privacy Badge</h4>
                    <p className="text-sm text-muted-foreground">Certified Privacy-First Tool</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Client-side Processing</p>
                      <p className="text-xs text-muted-foreground">All analysis runs directly in your browser</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">No Network Requests</p>
                      <p className="text-xs text-muted-foreground">Your resume never leaves your device</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">No Cookies or Trackers</p>
                      <p className="text-xs text-muted-foreground">We don't track your behavior or preferences</p>
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

export default Features;
