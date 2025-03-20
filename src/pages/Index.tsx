
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ResumeScan from '@/components/ResumeScan';
import Footer from '@/components/Footer';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for stored theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    return 'light';
  });

  // Apply theme when it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Add smooth scrolling to anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      });
    });
    
    // Add scroll reveal animation to elements
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
    
    return () => {
      revealElements.forEach(element => {
        revealObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme toggle in the top right */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full bg-background/60 backdrop-blur-md shadow-sm"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Reordered - Resume Scan comes before Features */}
      <div id="scanner">
        <ResumeScan />
      </div>
      <div id="features">
        <Features />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
