
// Extract top keywords from job description
export const extractTopKeywords = (jobDescription: string): string[] => {
  // In a real implementation, this would use NLP techniques
  // For demo, we'll use a simple approach
  
  // Convert to lowercase and clean text
  const text = jobDescription.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Define common tech keywords to look for
  const commonKeywords = [
    'javascript', 'typescript', 'react', 'vue', 'angular', 'node', 'express', 
    'html', 'css', 'sass', 'less', 'tailwind', 'bootstrap', 'material ui',
    'redux', 'context api', 'graphql', 'rest api', 'json', 'ajax',
    'webpack', 'vite', 'rollup', 'babel', 'eslint', 'prettier',
    'jest', 'testing library', 'cypress', 'mocha', 'chai',
    'git', 'github', 'gitlab', 'bitbucket', 'ci/cd', 'docker', 'kubernetes',
    'aws', 'azure', 'gcp', 'firebase', 'netlify', 'vercel',
    'agile', 'scrum', 'kanban', 'jira', 'confluence',
    'responsive design', 'mobile first', 'cross-browser', 'accessibility', 'wcag',
    'performance optimization', 'seo', 'web vitals', 'pwa',
    'typescript', 'oop', 'functional programming', 'design patterns',
    'next.js', 'gatsby', 'svelte', 'web components', 'storybook',
    'monorepo', 'lerna', 'yarn workspaces', 'npm', 'package management'
  ];
  
  // Find all matching keywords
  const foundKeywords = commonKeywords.filter(keyword => 
    text.includes(keyword)
  );
  
  // Add any job-specific terms that appear frequently
  const words = text.split(/\s+/);
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    // Only consider words with 4+ characters
    if (word.length >= 4) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and get top words
  const frequentWords = Object.entries(wordFrequency)
    .filter(([word]) => !foundKeywords.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  // Combine found keywords and frequent words, limit to top 15
  const allKeywords = [...foundKeywords, ...frequentWords].slice(0, 15);
  
  return allKeywords;
};

// Analyze which keywords are present in the resume
export const analyzeKeywords = (resumeText: string, keywords: string[]): Record<string, boolean> => {
  const text = resumeText.toLowerCase();
  const results: Record<string, boolean> = {};
  
  keywords.forEach(keyword => {
    results[keyword] = text.includes(keyword);
  });
  
  return results;
};
