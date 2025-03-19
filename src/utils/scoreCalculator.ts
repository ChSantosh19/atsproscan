
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
  
  // Calculate ATS compatibility score
  // This would be more complex in a real implementation
  // Here we factor in keyword matches plus some basic resume structure checks
  let atsScore = keywordMatchPercentage;
  
  // Add bonus for having common resume section headers
  const sections = ['experience', 'education', 'skills', 'summary', 'projects', 'certifications'];
  const sectionMatches = sections.filter(section => 
    resumeText.toLowerCase().includes(section)
  ).length;
  
  const sectionScore = Math.round((sectionMatches / sections.length) * 10);
  atsScore += sectionScore;
  
  // Penalize for potential issues
  if (resumeText.length < 1000) {
    atsScore -= 10; // Too short
  }
  
  // Calculate interview probability
  // This is a simplistic model
  let interviewProbability = atsScore;
  
  // Adjust based on job-specific factors
  const jobSpecificTerms = [
    'senior', 'lead', 'architect', 'manager', 'principal', 
    'years of experience', 'bachelor', 'master', 'phd', 
    'degree', 'certified', 'expert'
  ];
  
  const jobRequiresSpecialTerms = jobSpecificTerms.some(term => 
    jobDescription.toLowerCase().includes(term)
  );
  
  const resumeHasSpecialTerms = jobSpecificTerms.some(term => 
    resumeText.toLowerCase().includes(term)
  );
  
  if (jobRequiresSpecialTerms && resumeHasSpecialTerms) {
    interviewProbability += 5;
  } else if (jobRequiresSpecialTerms && !resumeHasSpecialTerms) {
    interviewProbability -= 10;
  }
  
  // Cap scores at 100
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
    missingKeywords
  };
};
