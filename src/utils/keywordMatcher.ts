// Extract top keywords from job description
export const extractTopKeywords = (jobDescription: string): string[] => {
  // Convert to lowercase and clean text
  const text = jobDescription.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Common words to ignore (stop words) - extended list
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
    'yours', 'yourself', 'yourselves',
    // Extended stop words that are common but not industry-specific
    'able', 'across', 'actually', 'almost', 'also', 'although', 'always', 'among', 'another',
    'anyone', 'anything', 'anywhere', 'around', 'back', 'become', 'becomes', 'becoming', 
    'been', 'behind', 'best', 'better', 'beyond', 'cannot', 'certain', 'could', 'either',
    'else', 'ever', 'every', 'everyone', 'everything', 'find', 'first', 'following', 'four',
    'get', 'getting', 'gives', 'goes', 'going', 'gone', 'good', 'great', 'help', 'high',
    'highly', 'however', 'indeed', 'instead', 'keep', 'know', 'known', 'late', 'later',
    'least', 'less', 'likely', 'long', 'look', 'looking', 'made', 'make', 'making', 'many',
    'may', 'maybe', 'might', 'much', 'must', 'need', 'needs', 'never', 'new', 'next', 'none',
    'often', 'old', 'one', 'part', 'per', 'perhaps', 'please', 'possible', 'put', 'rather',
    'really', 'right', 'said', 'same', 'say', 'says', 'see', 'seem', 'seen', 'self', 'selves',
    'several', 'shall', 'since', 'still', 'take', 'taken', 'tell', 'tends', 'think', 'three',
    'thus', 'truly', 'try', 'twice', 'two', 'under', 'unfortunately', 'unless', 'unlike', 
    'unlikely', 'use', 'used', 'using', 'various', 'want', 'way', 'well', 'went', 'whatever',
    'whether', 'within', 'without', 'yet'
  ];
  
  // Define industry-specific keyword categories
  const industryKeywords = {
    // Tech & Programming
    tech: [
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
      'monorepo', 'lerna', 'yarn workspaces', 'npm', 'package management',
      'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift',
      'database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'oracle',
      'microservices', 'serverless', 'apis', 'rest', 'soap', 'graphql'
    ],
    // Data Science & AI
    dataScience: [
      'machine learning', 'deep learning', 'artificial intelligence', 'neural networks',
      'data mining', 'data analysis', 'data visualization', 'statistics', 'r',
      'python', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras',
      'nlp', 'computer vision', 'big data', 'hadoop', 'spark', 'tableau', 'power bi',
      'etl', 'data warehousing', 'data modeling', 'regression', 'classification',
      'clustering', 'reinforcement learning', 'jupyter', 'anaconda'
    ],
    // Business & Management
    business: [
      'project management', 'team leadership', 'budget management', 'strategic planning',
      'stakeholder management', 'risk assessment', 'resource allocation', 'kpi', 'roi',
      'business intelligence', 'market analysis', 'competitive analysis', 'forecasting',
      'profit and loss', 'operations management', 'supply chain', 'logistics',
      'negotiation', 'client relationship', 'vendor management', 'crm', 'erp',
      'change management', 'process improvement', 'lean', 'six sigma'
    ],
    // Marketing & Sales
    marketing: [
      'digital marketing', 'content marketing', 'social media marketing', 'seo', 'sem',
      'ppc', 'email marketing', 'marketing automation', 'google analytics', 'google ads',
      'facebook ads', 'instagram marketing', 'tiktok marketing', 'influencer marketing',
      'brand management', 'public relations', 'market research', 'customer segmentation',
      'lead generation', 'conversion optimization', 'a/b testing', 'customer journey',
      'sales funnel', 'crm', 'hubspot', 'salesforce', 'customer acquisition'
    ],
    // Finance & Accounting
    finance: [
      'financial analysis', 'financial reporting', 'budgeting', 'forecasting', 'accounting',
      'bookkeeping', 'accounts payable', 'accounts receivable', 'general ledger', 'taxation',
      'audit', 'compliance', 'financial modeling', 'valuation', 'equity research',
      'investment banking', 'portfolio management', 'risk management', 'financial statements',
      'balance sheet', 'income statement', 'cash flow', 'quickbooks', 'sap', 'oracle financials'
    ],
    // Healthcare
    healthcare: [
      'patient care', 'clinical', 'medical', 'healthcare', 'diagnosis', 'treatment',
      'therapy', 'nursing', 'physician', 'surgery', 'pharmacy', 'medication',
      'electronic health records', 'ehr', 'hipaa', 'telehealth', 'medical coding',
      'medical billing', 'healthcare administration', 'public health', 'epidemiology'
    ],
    // HR & People
    hr: [
      'recruitment', 'hiring', 'talent acquisition', 'interviewing', 'onboarding',
      'training', 'development', 'performance management', 'compensation', 'benefits',
      'payroll', 'employee relations', 'workforce planning', 'succession planning',
      'diversity and inclusion', 'hris', 'employee engagement', 'retention'
    ],
    // Other Professional Skills
    professional: [
      'communication', 'leadership', 'problem solving', 'critical thinking', 'decision making',
      'time management', 'organization', 'multitasking', 'adaptability', 'teamwork',
      'collaboration', 'conflict resolution', 'presentation', 'public speaking', 'analytical',
      'research', 'detail oriented', 'creativity', 'innovation', 'mentoring', 'coaching'
    ],
    // Certifications & Qualifications
    certifications: [
      'certified', 'licensed', 'accredited', 'pmp', 'mba', 'cpa', 'cfa', 'aws certified',
      'cisco certified', 'comptia', 'microsoft certified', 'google certified', 'itil',
      'six sigma', 'scrum master', 'product owner', 'safe', 'cissp', 'ceh'
    ]
  };
  
  // Flatten all industry keywords into a single array
  const allIndustryKeywords = Object.values(industryKeywords).flat();
  
  // Find all matching industry keywords in the job description
  const foundIndustryKeywords = allIndustryKeywords.filter(keyword => 
    text.includes(keyword)
  );
  
  // Extract job-specific terms by analyzing word frequency
  const words = text.split(/\s+/);
  const wordFrequency: Record<string, number> = {};
  
  words.forEach(word => {
    // Only consider words with 4+ characters, not in stop words, and not common numbers
    if (word.length >= 4 && !stopWords.includes(word) && !/^\d+$/.test(word)) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });
  
  // Get phrases (2-3 word combinations) that might be important terms
  const phrases: Record<string, number> = {};
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i].toLowerCase();
    const word2 = words[i + 1].toLowerCase();
    
    // Only consider phrases where neither word is a stop word
    if (word1.length >= 3 && word2.length >= 3 && 
        !stopWords.includes(word1) && !stopWords.includes(word2)) {
      const phrase = `${word1} ${word2}`;
      phrases[phrase] = (phrases[phrase] || 0) + 1;
    }
    
    // Also check for 3-word phrases
    if (i < words.length - 2) {
      const word3 = words[i + 2].toLowerCase();
      if (word3.length >= 3 && !stopWords.includes(word3)) {
        const phrase3 = `${word1} ${word2} ${word3}`;
        phrases[phrase3] = (phrases[phrase3] || 0) + 1;
      }
    }
  }
  
  // Sort by frequency and get top words
  const frequentWords = Object.entries(wordFrequency)
    .filter(([word]) => !foundIndustryKeywords.includes(word))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
  
  // Sort by frequency and get top phrases
  const frequentPhrases = Object.entries(phrases)
    .filter(([phrase]) => !foundIndustryKeywords.includes(phrase))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([phrase]) => phrase);
  
  // Combine industry keywords, frequent words, and phrases, prioritizing industry terms
  // Limit to top 20 for better focus
  const priorityKeywords = [...foundIndustryKeywords];
  const remainingSlots = Math.max(0, 20 - priorityKeywords.length);
  
  // Add other high-frequency words and phrases to fill remaining slots
  const additionalKeywords = [...frequentPhrases, ...frequentWords].slice(0, remainingSlots);
  
  const allKeywords = [...priorityKeywords, ...additionalKeywords];
  
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
