
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Download, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  BarChart4, 
  FileText,
  Mail,
  RotateCcw
} from "lucide-react";
import { cn } from '@/lib/utils';
import { generateReport } from '@/utils/reportGenerator';

interface ResultsProps {
  results: any;
  onReset: () => void;
  onBack: () => void;
}

const Results = ({ results, onReset, onBack }: ResultsProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  if (!results) return null;
  
  const { 
    resumeFileName, 
    keywordMatches, 
    atsScore, 
    keywordMatchPercentage, 
    interviewProbability, 
    missingKeywords 
  } = results;
  
  const handleDownload = () => {
    generateReport(results);
  };
  
  // Helper function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Helper function to determine status
  const getStatus = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };
  
  // Helper function to get status color
  const getStatusColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-primary/10 border-b border-primary/20 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BarChart4 className="w-5 h-5 text-primary" />
              ATS Scan Results
            </h3>
            <p className="text-sm text-muted-foreground">
              Resume: {resumeFileName}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Download Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
            <div className="text-4xl font-bold mb-1 text-primary">{atsScore}%</div>
            <div className="text-sm font-medium mb-2">ATS Compatibility</div>
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              getStatusColor(atsScore)
            )}>
              {getStatus(atsScore)}
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
            <div className="text-4xl font-bold mb-1 text-primary">{keywordMatchPercentage}%</div>
            <div className="text-sm font-medium mb-2">Keyword Match</div>
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              getStatusColor(keywordMatchPercentage)
            )}>
              {getStatus(keywordMatchPercentage)}
            </div>
          </div>
          
          <div className="bg-white/40 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
            <div className="text-4xl font-bold mb-1 text-primary">{interviewProbability}%</div>
            <div className="text-sm font-medium mb-2">Interview Probability</div>
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              getStatusColor(interviewProbability)
            )}>
              {getStatus(interviewProbability)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Keyword Analysis
            </h4>
            
            <div className="bg-secondary/50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={chartRef}>
                {Object.entries(keywordMatches).map(([keyword, found], index) => (
                  <div key={index} className="flex items-center gap-3">
                    {found ? (
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium truncate">{keyword}</div>
                      <div className="text-xs text-muted-foreground">
                        {found ? 'Found in your resume' : 'Missing from your resume'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" /> Critical Missing Keywords
            </h4>
            
            {missingKeywords.length > 0 ? (
              <div className="bg-red-50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-3">
                  These keywords were found in the job description but are missing from your resume:
                </p>
                <div className="flex flex-wrap gap-2">
                  {missingKeywords.map((keyword: string, index: number) => (
                    <div key={index} className="bg-white px-3 py-1 rounded-full text-sm border border-red-200 flex items-center">
                      <XCircle className="w-4 h-4 text-red-500 mr-1" />
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm">Great job! Your resume contains all the critical keywords.</p>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" /> Interview Potential
            </h4>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Based on your ATS score and keyword matches, we estimate your probability of getting an interview call:
              </p>
              
              <div className="w-full h-3 bg-secondary rounded-full mb-1 overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${interviewProbability}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              
              <div className="mt-4 text-sm">
                <p className="font-medium">
                  Interview Probability: <span className={getScoreColor(interviewProbability)}>{interviewProbability}%</span>
                </p>
                
                <p className="mt-2">
                  {interviewProbability >= 80 
                    ? "Excellent! You have a high probability of getting an interview call."
                    : interviewProbability >= 60
                      ? "Good! You have a moderate chance of getting an interview. Consider adding the missing keywords to improve your chances."
                      : "Your resume needs improvement to increase your interview chances. Add the missing keywords and follow our optimization tips."}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Improvement Tips</h4>
            
            <div className="bg-secondary/50 rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Add Missing Keywords</p>
                  <p className="text-xs text-muted-foreground">Incorporate the missing keywords naturally into your resume</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use Simple Formatting</p>
                  <p className="text-xs text-muted-foreground">Avoid complex layouts, tables, and headers/footers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use Standard Section Headings</p>
                  <p className="text-xs text-muted-foreground">Experience, Education, Skills, Projects, etc.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quantify Achievements</p>
                  <p className="text-xs text-muted-foreground">Use numbers and percentages to highlight your impact</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Check File Format</p>
                  <p className="text-xs text-muted-foreground">Save as a standard PDF with selectable text</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
            <h4 className="text-sm font-medium mb-2">Need More Help?</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Check out our free resources to help you optimize your resume and increase your chances of landing interviews.
            </p>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Free Resume Templates
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Mail className="w-4 h-4" />
                Email Format Guide
              </Button>
            </div>
          </div>
          
          <Button variant="default" className="w-full gap-2" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            Scan Another Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
