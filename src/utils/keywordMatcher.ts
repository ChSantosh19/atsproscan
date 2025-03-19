
// Extract top keywords from job description
export const extractTopKeywords = (jobDescription: string): string[] => {
  // Convert to lowercase and clean text
  const text = jobDescription.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Common words to ignore (stop words)
  const stopWords = [
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any',
    'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between',
    'both', 'but', 'by', 'can', 'did', 'do', 'does', 'doing', 'down', 'during', 'each',
    'few', 'for', 'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here',
    'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it',
    'its', 'itself', 'just', 'like', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor',
    'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves',
    'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the',
    'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
    'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
    'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'you', 'your',
    'yours', 'yourself', 'yourselves'
  ];
  
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
    // Only consider words with 4+ characters and not in stop words
    if (word.length >= 4 && !stopWords.includes(word)) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  // Sort by frequency and get top words
  const frequentWords = Object.entries(wordFrequency)
    .filter(([word]) => !foundKeywords.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
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
