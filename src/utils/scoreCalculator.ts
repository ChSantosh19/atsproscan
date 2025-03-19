
// Calculate scores based on keyword matches and other factors
export const calculateScores = (
  keywordMatches: Record<string, boolean>,
  resumeText: string,
  jobDescription: string
) => {
  // Calculate keyword match percentage
  const totalKeywords = Object.keys(keywordMatches).length;
  const matchedKeywords = Object.values(keywordMatches).filter(match => match).length;
  const keywordMatchPercentage = Math.round((matchedKeywords / totalKeywords) * 100);
  
  // Calculate ATS compatibility score with more complex factors
  // Base score starts with keyword match percentage
  let atsScore = keywordMatchPercentage;
  
  // Check for common resume sections and headers
  const importantSections = [
    'experience', 'employment', 'work history', 'professional experience',
    'education', 'academic', 'qualification', 'degree', 
    'skills', 'technical skills', 'competencies', 'expertise',
    'projects', 'accomplishments', 'achievements',
    'summary', 'professional summary', 'profile', 'objective', 
    'certification', 'license', 'professional development'
  ];
  
  // Count how many important sections are present
  const sectionMatches = importantSections.filter(section => 
    resumeText.toLowerCase().includes(section)
  ).length;
  
  // Add bonus for section structure (0-15 points)
  const sectionScore = Math.min(15, Math.round((sectionMatches / 6) * 15));
  atsScore += sectionScore;
  
  // Analyze format/structure factors
  
  // Check for bullet points (indicated by • or - followed by space)
  const hasBulletPoints = /[•\-]\s/.test(resumeText);
  if (hasBulletPoints) atsScore += 5;
  
  // Check for measurable achievements (numbers, percentages)
  const hasQuantifiableAchievements = /\d+%|\d+\s*\w+\s*increase|decreased by\s*\d+|improved\s*\d+|reduced\s*\d+/i.test(resumeText);
  if (hasQuantifiableAchievements) atsScore += 5;
  
  // Check for action verbs
  const actionVerbs = [
    'achieved', 'improved', 'developed', 'managed', 'created', 'implemented', 
    'designed', 'led', 'increased', 'decreased', 'reduced', 'negotiated', 
    'coordinated', 'delivered', 'generated', 'launched', 'spearheaded'
  ];
  
  const hasActionVerbs = actionVerbs.some(verb => resumeText.toLowerCase().includes(verb));
  if (hasActionVerbs) atsScore += 5;
  
  // Add penalty factors
  
  // Check resume length (text length as proxy)
  if (resumeText.length < 1500) {
    atsScore -= 10; // Too short
  }
  
  // Check for potential over-formatting
  const potentialFormatting = /\||\{|\}|\[|\]|\\|\/\/|http|www|\*\*|__|==|~~/.test(resumeText);
  if (potentialFormatting) {
    atsScore -= 5; // May have formatting issues
  }
  
  // Check for keyword stuffing (same keyword repeating too many times)
  let keywordStuffingPenalty = 0;
  
  const words = resumeText.toLowerCase().split(/\s+/);
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    if (word.length > 3) { // Only count meaningful words
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  // Check if any word appears too frequently (more than 5% of total words)
  const wordThreshold = words.length * 0.05;
  const stuffedWords = Object.values(wordFrequency).filter(count => count > wordThreshold).length;
  
  keywordStuffingPenalty = Math.min(10, stuffedWords * 2);
  atsScore -= keywordStuffingPenalty;
  
  // Calculate industry relevance
  // Check if the resume contains industry-specific terminology
  const industries = [
    { name: 'technology', terms: ['software', 'development', 'programming', 'application', 'tech', 'code', 'solution'] },
    { name: 'healthcare', terms: ['patient', 'care', 'medical', 'clinical', 'health', 'treatment', 'doctor'] },
    { name: 'finance', terms: ['financial', 'investment', 'banking', 'budget', 'revenue', 'profit', 'accounting'] },
    { name: 'marketing', terms: ['campaign', 'brand', 'market', 'advertising', 'customer', 'social media', 'content'] },
    { name: 'education', terms: ['student', 'teaching', 'curriculum', 'learning', 'education', 'academic', 'school'] }
  ];
  
  // Check which industry the job description matches with
  const jobIndustries = industries.map(industry => {
    const matchCount = industry.terms.filter(term => 
      jobDescription.toLowerCase().includes(term)
    ).length;
    return { name: industry.name, score: matchCount / industry.terms.length };
  }).sort((a, b) => b.score - a.score);
  
  // Get the top matching industry for the job
  const topJobIndustry = jobIndustries[0]?.name;
  
  if (topJobIndustry) {
    // Check if resume matches the same industry
    const matchingIndustry = industries.find(ind => ind.name === topJobIndustry);
    if (matchingIndustry) {
      const resumeIndustryTerms = matchingIndustry.terms.filter(term => 
        resumeText.toLowerCase().includes(term)
      ).length;
      
      const industryRelevanceScore = Math.round((resumeIndustryTerms / matchingIndustry.terms.length) * 10);
      atsScore += industryRelevanceScore;
    }
  }
  
  // Calculate interview probability based on more factors
  // Base on ATS score but with additional weighting for key factors
  let interviewProbability = atsScore;
  
  // Job-specific terms that often appear in descriptions
  const jobSpecificTerms = [
    'senior', 'lead', 'architect', 'manager', 'principal', 
    'years of experience', 'bachelor', 'master', 'phd', 
    'degree', 'certified', 'expert', 'proficient', 'advanced'
  ];
  
  // Count how many job-specific terms are required
  const requiredTerms = jobSpecificTerms.filter(term => 
    jobDescription.toLowerCase().includes(term)
  ).length;
  
  // Count how many of those terms are in the resume
  const matchedTerms = jobSpecificTerms.filter(term => 
    jobDescription.toLowerCase().includes(term) && 
    resumeText.toLowerCase().includes(term)
  ).length;
  
  // Calculate a match percentage for these specific terms
  const termMatchPercentage = requiredTerms > 0 ? Math.round((matchedTerms / requiredTerms) * 100) : 100;
  
  // Weight this more heavily in the interview probability (±15 points)
  if (termMatchPercentage >= 75) {
    interviewProbability += 15;
  } else if (termMatchPercentage >= 50) {
    interviewProbability += 5;
  } else if (termMatchPercentage < 25) {
    interviewProbability -= 15;
  }
  
  // Check for contact information as ATS systems need this
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(resumeText);
  
  if (hasEmail && hasPhone) {
    interviewProbability += 5;
  } else {
    interviewProbability -= 10; // Big penalty for missing contact info
  }
  
  // Cap scores at 100 and ensure they're not negative
  atsScore = Math.min(100, Math.max(0, atsScore));
  interviewProbability = Math.min(100, Math.max(0, interviewProbability));
  
  // Get missing keywords
  const missingKeywords = Object.entries(keywordMatches)
    .filter(([_, found]) => !found)
    .map(([keyword]) => keyword);
  
  return {
    atsScore,
    keywordMatchPercentage,
    interviewProbability,
    missingKeywords,
    sectionScore,
    formatting: {
      hasBulletPoints,
      hasQuantifiableAchievements,
      hasActionVerbs
    },
    penalties: {
      lengthPenalty: resumeText.length < 1500 ? -10 : 0,
      formattingPenalty: potentialFormatting ? -5 : 0,
      keywordStuffingPenalty
    }
  };
};
