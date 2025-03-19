
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from '@/lib/utils';
import Results from './Results';
import { parsePdf } from '@/utils/pdfParser';
import { analyzeKeywords, extractTopKeywords } from '@/utils/keywordMatcher';
import { calculateScores } from '@/utils/scoreCalculator';
import { useToast } from '@/hooks/use-toast';

interface ResumeData {
  text: string;
  fileName: string;
}

const ResumeScan = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const [step, setStep] = useState(1);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Listen for sample report request
  useEffect(() => {
    const handleShowSampleReport = () => {
      const sampleData = localStorage.getItem('sampleReport');
      if (sampleData) {
        try {
          const parsedData = JSON.parse(sampleData);
          setResults(parsedData);
          setStep(3);
          toast({
            title: "Sample Report Loaded",
            description: "This is a sample report to demonstrate functionality.",
          });
        } catch (err) {
          console.error("Error parsing sample data", err);
        }
      }
    };
    
    window.addEventListener('showSampleReport', handleShowSampleReport);
    
    return () => {
      window.removeEventListener('showSampleReport', handleShowSampleReport);
    };
  }, [toast]);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      
      try {
        setIsProcessing(true);
        setError(null);
        const text = await parsePdf(file);
        setResumeData({
          text,
          fileName: file.name
        });
        setStep(2);
        setIsProcessing(false);
        toast({
          title: "Resume Uploaded",
          description: "Your resume has been successfully uploaded.",
        });
      } catch (err) {
        setError('Failed to parse PDF. Please try another file.');
        setIsProcessing(false);
      }
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      
      try {
        setIsProcessing(true);
        setError(null);
        const text = await parsePdf(file);
        setResumeData({
          text,
          fileName: file.name
        });
        setStep(2);
        setIsProcessing(false);
        toast({
          title: "Resume Uploaded",
          description: "Your resume has been successfully uploaded.",
        });
      } catch (err) {
        setError('Failed to parse PDF. Please try another file.');
        setIsProcessing(false);
      }
    }
  };
  
  const handleAnalyze = () => {
    if (!resumeData || !jobDescription) {
      setError('Please upload a resume and provide a job description');
      return;
    }
    
    try {
      setIsProcessing(true);
      // Extract top keywords from job description
      const topKeywords = extractTopKeywords(jobDescription);
      
      // Analyze keyword matches
      const keywordMatches = analyzeKeywords(resumeData.text, topKeywords);
      
      // Calculate scores
      const scores = calculateScores(keywordMatches, resumeData.text, jobDescription);
      
      // Set results
      setResults({
        resumeFileName: resumeData.fileName,
        keywordMatches,
        topKeywords,
        ...scores
      });
      
      setStep(3);
      setIsProcessing(false);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed against the job description.",
      });
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      setIsProcessing(false);
    }
  };
  
  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      setResults(null);
    } else if (step === 2) {
      setStep(1);
      setResumeData(null);
      setJobDescription('');
    }
  };
  
  const reset = () => {
    setStep(1);
    setResumeData(null);
    setJobDescription('');
    setResults(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-background relative" id="scanner">
      <div className="hero-blur-circle w-[400px] h-[400px] bg-blue-100/30 right-[-100px] top-[10%]" />
      <div className="hero-blur-circle w-[300px] h-[300px] bg-purple-100/20 left-[-50px] bottom-[10%]" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-secondary animate-fade-in">
            <FileText className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">ATS Scanner</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter animate-slide-down">
            Scan Your Resume for <span className="text-gradient">ATS Compatibility</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-slide-down delay-100">
            Upload your resume and paste the job description to see how well your resume matches the job requirements.
          </p>
        </div>
        
        <div className="glass-card rounded-2xl border border-white/20 overflow-hidden max-w-4xl mx-auto">
          {step === 3 ? (
            <Results 
              results={results} 
              onReset={reset}
              onBack={handleBack}
            />
          ) : (
            <div className="p-6 md:p-8">
              {/* Step indicators */}
              <div className="flex items-center mb-8 max-w-sm mx-auto">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors", 
                  step >= 1 ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                )}>
                  1
                </div>
                <div className={cn(
                  "flex-1 h-1 mx-2 transition-colors",
                  step >= 2 ? "bg-primary" : "bg-secondary"
                )}></div>
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors", 
                  step >= 2 ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                )}>
                  2
                </div>
                <div className={cn(
                  "flex-1 h-1 mx-2 transition-colors",
                  step >= 3 ? "bg-primary" : "bg-secondary"
                )}></div>
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors", 
                  step >= 3 ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                )}>
                  3
                </div>
              </div>
              
              {step === 1 && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4 text-center">Upload Your Resume</h3>
                  
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors",
                      isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="application/pdf" 
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="text-lg font-medium mb-2">Drag and drop your resume</h4>
                    <p className="text-muted-foreground mb-4">or click to browse (PDF only)</p>
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      Select PDF
                    </Button>
                  </div>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      <p>{error}</p>
                    </div>
                  )}
                </div>
              )}
              
              {step === 2 && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-4 text-center">Paste Job Description</h3>
                  
                  <div className="mb-6 p-3 bg-secondary rounded-lg flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary shrink-0" />
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{resumeData?.fileName}</p>
                      <p className="text-xs text-muted-foreground">Resume uploaded successfully</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-auto shrink-0"
                      onClick={handleBack}
                    >
                      Change
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Paste the full job description here..."
                      className="min-h-[200px] resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    
                    {error && (
                      <div className="p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-3">
                      <Button 
                        variant="outline" 
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleAnalyze}
                        disabled={!jobDescription.trim() || isProcessing}
                        className="gap-2"
                      >
                        {isProcessing ? 'Processing...' : 'Analyze Resume'}
                        {!isProcessing && <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeScan;
