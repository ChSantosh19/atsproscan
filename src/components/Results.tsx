
import React, { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Download, 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  BarChart4, 
  FileText,
  RotateCcw,
  TrendingUp,
  Award
} from "lucide-react";
import { cn } from '@/lib/utils';
import { generateReport } from '@/utils/reportGenerator';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from 'recharts';

interface ResultsProps {
  results: any;
  onReset: () => void;
  onBack: () => void;
}

const Results = ({ results, onReset, onBack }: ResultsProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Trigger animation for charts when component mounts
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1
    });
    
    const elements = document.querySelectorAll('.chart-container');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
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
    if (score >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  // Prepare data for bar chart
  const barChartData = [
    { name: 'ATS Score', value: atsScore },
    { name: 'Keyword Match', value: keywordMatchPercentage },
    { name: 'Interview Probability', value: interviewProbability }
  ];

  // Prepare data for pie chart
  const totalKeywords = Object.keys(keywordMatches).length;
  const matchedKeywords = Object.values(keywordMatches).filter(Boolean).length;
  const pieChartData = [
    { name: 'Matched', value: matchedKeywords },
    { name: 'Missing', value: totalKeywords - matchedKeywords }
  ];

  // Prepare data for radar chart
  const radarData = [
    { subject: 'Keyword Match', A: keywordMatchPercentage, fullMark: 100 },
    { subject: 'Format', A: atsScore > 70 ? 90 : 70, fullMark: 100 },
    { subject: 'Content', A: (atsScore + keywordMatchPercentage) / 2, fullMark: 100 },
    { subject: 'Structure', A: atsScore > 60 ? 85 : 65, fullMark: 100 },
    { subject: 'Relevance', A: interviewProbability, fullMark: 100 },
  ];

  // Prepare data for area chart - historical trend simulation
  const areaChartData = [
    { name: 'Initial', score: Math.max(30, atsScore - 40) },
    { name: 'Draft 1', score: Math.max(45, atsScore - 30) },
    { name: 'Draft 2', score: Math.max(60, atsScore - 15) },
    { name: 'Current', score: atsScore },
    { name: 'Target', score: Math.min(100, atsScore + 10) }
  ];
  
  const COLORS = ['#4ade80', '#fb923c'];

  return (
    <div className="animate-fade-in">
      <div className="bg-primary/10 backdrop-blur-sm border-b border-primary/20 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 animate-slide-down">
              <BarChart4 className="w-5 h-5 text-primary" />
              ATS Scan Results
            </h3>
            <p className="text-sm text-muted-foreground animate-slide-down delay-100">
              Resume: {resumeFileName}
            </p>
          </div>
          
          <div className="flex gap-2 animate-fade-in delay-200">
            <Button variant="outline" size="sm" className="gap-1 transition-all hover:scale-105" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button variant="outline" size="sm" className="gap-1 transition-all hover:scale-105" onClick={handleDownload}>
              <Download className="w-4 h-4" /> Download Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center animate-fade-in delay-100 transition-all hover:bg-white/30 dark:hover:bg-white/15">
            <div className="text-4xl font-bold mb-1 text-primary">{atsScore}%</div>
            <div className="text-sm font-medium mb-2">ATS Compatibility</div>
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              getStatusColor(atsScore)
            )}>
              {getStatus(atsScore)}
            </div>
          </div>
          
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center animate-fade-in delay-200 transition-all hover:bg-white/30 dark:hover:bg-white/15">
            <div className="text-4xl font-bold mb-1 text-primary">{keywordMatchPercentage}%</div>
            <div className="text-sm font-medium mb-2">Keyword Match</div>
            <div className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              getStatusColor(keywordMatchPercentage)
            )}>
              {getStatus(keywordMatchPercentage)}
            </div>
          </div>
          
          <div className="bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center animate-fade-in delay-300 transition-all hover:bg-white/30 dark:hover:bg-white/15">
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
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 animate-slide-down">
              <FileText className="w-5 h-5 text-primary" /> Keyword Analysis
            </h4>
            
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 space-y-4 animate-fade-in delay-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={chartRef}>
                {Object.entries(keywordMatches).map(([keyword, found], index) => (
                  <div key={index} className="flex items-center gap-3 transition-all hover:translate-x-1">
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
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 animate-slide-down delay-100">
              <AlertCircle className="w-5 h-5 text-primary" /> Critical Missing Keywords
            </h4>
            
            {missingKeywords.length > 0 ? (
              <div className="bg-red-50 dark:bg-red-900/30 backdrop-blur-sm rounded-lg p-4 animate-fade-in delay-200">
                <p className="text-sm text-muted-foreground mb-3">
                  These keywords were found in the job description but are missing from your resume:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(missingKeywords)).map((keyword: string, index: number) => (
                    <div key={index} className="bg-white/80 dark:bg-red-800/50 px-3 py-1 rounded-full text-sm border border-red-200 dark:border-red-700 flex items-center text-red-800 dark:text-red-200 transition-all hover:scale-105">
                      <XCircle className="w-4 h-4 text-red-500 mr-1" />
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/30 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 animate-fade-in delay-200">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm">Great job! Your resume contains all the critical keywords.</p>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 animate-slide-down delay-200">
              <TrendingUp className="w-5 h-5 text-primary" /> Interview Potential
            </h4>
            
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 animate-fade-in delay-300">
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
          
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 animate-slide-down delay-300">
              <Award className="w-5 h-5 text-primary" /> Competency Radar
            </h4>
            
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 chart-container opacity-0">
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid stroke="#666" />
                  <PolarAngleAxis dataKey="subject" stroke="#888" />
                  <PolarRadiusAxis stroke="#888" />
                  <Radar
                    name="Resume"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 animate-slide-down delay-400">
              <TrendingUp className="w-5 h-5 text-primary" /> Improvement Trend
            </h4>
            
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 chart-container opacity-0">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={areaChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 animate-slide-down">Score Analysis</h4>
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 chart-container opacity-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#3b82f6" 
                    radius={[5, 5, 0, 0]} 
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 animate-slide-down delay-100">Keyword Coverage</h4>
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 chart-container opacity-0">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none' }} 
                    itemStyle={{ color: '#fff' }}
                    formatter={(value, name) => [`${value} keywords`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-3 animate-slide-down delay-200">Improvement Tips</h4>
            
            <div className="bg-secondary/50 dark:bg-secondary/30 backdrop-blur-sm rounded-lg p-4 space-y-4 animate-fade-in delay-300">
              <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Add Missing Keywords</p>
                  <p className="text-xs text-muted-foreground">Incorporate the missing keywords naturally into your resume</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use Simple Formatting</p>
                  <p className="text-xs text-muted-foreground">Avoid complex layouts, tables, and headers/footers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Use Standard Section Headings</p>
                  <p className="text-xs text-muted-foreground">Experience, Education, Skills, Projects, etc.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 transition-all hover:translate-x-1">
                <div className="mt-1 bg-primary/10 rounded-full p-1">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quantify Achievements</p>
                  <p className="text-xs text-muted-foreground">Use numbers and percentages to highlight your impact</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 transition-all hover:translate-x-1">
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
          
          <Button variant="default" className="w-full gap-2 animate-slide-up transition-all hover:scale-105" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
            Scan Another Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
