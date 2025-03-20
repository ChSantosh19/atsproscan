
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
    'coordinated', 'delivered', 'generated', 'launched', 'spearheaded',
    'optimized', 'streamlined', 'transformed', 'unified', 'standardized',
    'automated', 'accelerated', 'produced', 'positioned', 'engineered',
    'architected', 'established', 'executed', 'facilitated', 'formulated',
    'initiated', 'mentored', 'organized', 'presented', 'published',
    'resolved', 'restructured', 'revitalized', 'secured', 'supervised'
  ];
  
  let actionVerbCount = 0;
  actionVerbs.forEach(verb => {
    if (resumeText.toLowerCase().includes(verb)) {
      actionVerbCount++;
    }
  });
  
  // Give points based on action verb diversity (0-10 points)
  const actionVerbsScore = Math.min(10, Math.floor(actionVerbCount / 3));
  atsScore += actionVerbsScore;
  
  // Add penalty factors
  
  // Check resume length (text length as proxy)
  let lengthPenalty = 0;
  if (resumeText.length < 1500) {
    lengthPenalty = -10; // Too short
    atsScore += lengthPenalty;
  } else if (resumeText.length > 7000) {
    lengthPenalty = -5; // Too long
    atsScore += lengthPenalty;
  }
  
  // Check for potential over-formatting
  const potentialFormatting = /\||\{|\}|\[|\]|\\|\/\/|http|www|\*\*|__|==|~~/.test(resumeText);
  let formattingPenalty = 0;
  if (potentialFormatting) {
    formattingPenalty = -5; // May have formatting issues
    atsScore += formattingPenalty;
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
    { name: 'technology', terms: ['software', 'development', 'programming', 'application', 'tech', 'code', 'solution', 'api', 'system', 'platform', 'cloud', 'architecture', 'framework', 'agile', 'devops'] },
    { name: 'healthcare', terms: ['patient', 'care', 'medical', 'clinical', 'health', 'treatment', 'doctor', 'nurse', 'hospital', 'diagnostic', 'therapy', 'pharmaceutical', 'wellness', 'provider', 'caregiver'] },
    { name: 'finance', terms: ['financial', 'investment', 'banking', 'budget', 'revenue', 'profit', 'accounting', 'assets', 'portfolio', 'equity', 'capital', 'trading', 'risk', 'compliance', 'audit'] },
    { name: 'marketing', terms: ['campaign', 'brand', 'market', 'advertising', 'customer', 'social media', 'content', 'digital', 'seo', 'analytics', 'audience', 'conversion', 'traffic', 'engagement', 'funnel'] },
    { name: 'education', terms: ['student', 'teaching', 'curriculum', 'learning', 'education', 'academic', 'school', 'course', 'instructor', 'classroom', 'pedagogy', 'assessment', 'training', 'educational', 'faculty'] },
    { name: 'manufacturing', terms: ['production', 'manufacturing', 'assembly', 'factory', 'quality', 'lean', 'process', 'engineering', 'operational', 'machinery', 'inventory', 'supply chain', 'materials', 'fabrication', 'industrial'] },
    { name: 'retail', terms: ['retail', 'store', 'merchandise', 'sales', 'customer', 'inventory', 'e-commerce', 'pos', 'omnichannel', 'consumer', 'shopping', 'checkout', 'pricing', 'promotion', 'assortment'] },
    { name: 'consulting', terms: ['consulting', 'client', 'engagement', 'solution', 'advisory', 'strategy', 'business', 'professional services', 'recommendation', 'stakeholder', 'deliverable', 'methodology', 'framework', 'assessment', 'implementation'] }
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
  let industryRelevanceScore = 0;
  
  if (topJobIndustry) {
    // Check if resume matches the same industry
    const matchingIndustry = industries.find(ind => ind.name === topJobIndustry);
    if (matchingIndustry) {
      const resumeIndustryTerms = matchingIndustry.terms.filter(term => 
        resumeText.toLowerCase().includes(term)
      ).length;
      
      industryRelevanceScore = Math.round((resumeIndustryTerms / matchingIndustry.terms.length) * 15);
      atsScore += industryRelevanceScore;
    }
  }
  
  // Check for contact information relevance
  let contactInfoScore = 0;
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(resumeText);
  const hasLinkedIn = /linkedin\.com\/in\//.test(resumeText);
  const hasPortfolio = /portfolio|github\.com|gitlab\.com|bitbucket\.org/.test(resumeText);
  
  if (hasEmail) contactInfoScore += 2;
  if (hasPhone) contactInfoScore += 2;
  if (hasLinkedIn) contactInfoScore += 1;
  if (hasPortfolio) contactInfoScore += 1;
  
  atsScore += contactInfoScore;
  
  // Check for education relevance
  let educationScore = 0;
  const hasDegree = /bachelor|master|phd|mba|bs|ba|ms|ma|doctorate|degree/.test(resumeText.toLowerCase());
  const hasSchool = /university|college|institute|school/.test(resumeText.toLowerCase());
  
  if (hasDegree) educationScore += 3;
  if (hasSchool) educationScore += 2;
  
  atsScore += educationScore;
  
  // IMPROVED: Calculate interview probability with stronger correlation to keyword matches
  // Make keyword matching a much more significant factor in the interview probability
  let interviewProbability = 0;
  
  // Make keyword match percentage the primary factor (60% of the total score)
  // This ensures that low keyword match = low interview probability
  const keywordWeight = 0.6;
  interviewProbability += keywordMatchPercentage * keywordWeight;
  
  // Add ATS score as a secondary factor (25% of the total score)
  const atsWeight = 0.25;
  interviewProbability += Math.min(100, Math.max(0, atsScore)) * atsWeight;
  
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
  
  // Add specific term match as another factor (15% of the total score)
  const termMatchWeight = 0.15;
  interviewProbability += termMatchPercentage * termMatchWeight;
  
  // Thresholds for getting an interview
  // If the keyword match is below 40%, the candidate is unlikely to get past ATS
  // Apply a significant penalty for low keyword match
  if (keywordMatchPercentage < 40) {
    interviewProbability = Math.max(5, interviewProbability * 0.4);
  } else if (keywordMatchPercentage < 60) {
    interviewProbability = Math.max(15, interviewProbability * 0.7);
  }
  
  // Context matching: Check if your experience matches the job context
  // For example, if the job is for a manager role, check for management experience
  let contextMatchScore = 0;
  
  const contextTerms = {
    'management': ['manager', 'management', 'lead', 'team lead', 'supervisor', 'director'],
    'technical': ['developer', 'engineer', 'programmer', 'architect', 'technical', 'technologist'],
    'creative': ['designer', 'creative', 'artist', 'writer', 'content creator'],
    'analytical': ['analyst', 'analytics', 'analysis', 'research', 'data']
  };
  
  // Determine which context the job belongs to
  const jobContexts = Object.entries(contextTerms).map(([context, terms]) => {
    const matchCount = terms.filter(term => jobDescription.toLowerCase().includes(term)).length;
    return { context, score: matchCount / terms.length };
  }).sort((a, b) => b.score - a.score);
  
  const topJobContext = jobContexts[0]?.context;
  
  if (topJobContext && jobContexts[0]?.score > 0.3) { // Only if there's a clear context
    const matchingContextTerms = contextTerms[topJobContext];
    const resumeContextMatches = matchingContextTerms.filter(term => 
      resumeText.toLowerCase().includes(term)
    ).length;
    
    contextMatchScore = Math.round((resumeContextMatches / matchingContextTerms.length) * 10);
    
    // If the context doesn't match at all, apply another penalty
    if (resumeContextMatches === 0) {
      interviewProbability = Math.max(10, interviewProbability * 0.6);
    } else {
      // Add the context match as a small bonus
      interviewProbability += contextMatchScore * 0.03;
    }
  }
  
  // Cap scores at 100 and ensure they're not negative
  atsScore = Math.min(100, Math.max(0, Math.round(atsScore)));
  interviewProbability = Math.min(100, Math.max(0, Math.round(interviewProbability)));
  
  // Get missing keywords
  const missingKeywords = Object.entries(keywordMatches)
    .filter(([_, found]) => !found)
    .map(([keyword]) => keyword);
  
  // Return comprehensive results with detailed scoring breakdowns
  return {
    atsScore,
    keywordMatchPercentage,
    interviewProbability,
    missingKeywords,
    sectionScore,
    industryRelevanceScore,
    formatting: {
      hasBulletPoints,
      hasQuantifiableAchievements,
      actionVerbsScore
    },
    contactInfo: {
      hasEmail,
      hasPhone,
      hasLinkedIn,
      hasPortfolio,
      score: contactInfoScore
    },
    education: {
      hasDegree,
      hasSchool,
      score: educationScore
    },
    penalties: {
      lengthPenalty,
      formattingPenalty,
      keywordStuffingPenalty
    },
    contextMatch: {
      matchedContext: topJobContext,
      score: contextMatchScore
    }
  };
};
