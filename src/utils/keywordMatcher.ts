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
    'whether', 'within', 'without', 'yet',
    // Additional common words in job descriptions but not relevant as skills
    'position', 'job', 'role', 'work', 'company', 'candidate', 'candidates', 'required',
    'requires', 'responsibilities', 'responsibility', 'qualifications', 'qualification',
    'opportunity', 'opportunities', 'years', 'year', 'experience', 'time', 'day', 'days',
    'week', 'weeks', 'month', 'months', 'apply', 'application', 'submit', 'resume',
    'location', 'salary', 'benefits', 'full', 'details', 'description', 'title',
    'join', 'team', 'based', 'understand', 'understanding', 'working', 'works',
    'date', 'employer', 'employers', 'employee', 'employees', 'respond', 'response'
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
      'microservices', 'serverless', 'apis', 'rest', 'soap', 'graphql',
      'frontend', 'backend', 'fullstack', 'full-stack', 'devops', 'devsecops',
      'cloud', 'infrastructure', 'security', 'cybersecurity', 'encryption'
    ],
    // Data Science & AI
    dataScience: [
      'machine learning', 'deep learning', 'artificial intelligence', 'neural networks',
      'data mining', 'data analysis', 'data visualization', 'statistics', 'r',
      'python', 'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras',
      'nlp', 'computer vision', 'big data', 'hadoop', 'spark', 'tableau', 'power bi',
      'etl', 'data warehousing', 'data modeling', 'regression', 'classification',
      'clustering', 'reinforcement learning', 'jupyter', 'anaconda', 'data science',
      'predictive modeling', 'analytics', 'business intelligence', 'data engineering',
      'data pipeline', 'data lake', 'data transformation', 'snowflake', 'databricks'
    ],
    // Business & Management
    business: [
      'project management', 'team leadership', 'budget management', 'strategic planning',
      'stakeholder management', 'risk assessment', 'resource allocation', 'kpi', 'roi',
      'business intelligence', 'market analysis', 'competitive analysis', 'forecasting',
      'profit and loss', 'operations management', 'supply chain', 'logistics',
      'negotiation', 'client relationship', 'vendor management', 'crm', 'erp',
      'change management', 'process improvement', 'lean', 'six sigma', 'business strategy',
      'business development', 'executive leadership', 'p&l', 'product management',
      'program management', 'portfolio management'
    ],
    // Marketing & Sales
    marketing: [
      'digital marketing', 'content marketing', 'social media marketing', 'seo', 'sem',
      'ppc', 'email marketing', 'marketing automation', 'google analytics', 'google ads',
      'facebook ads', 'instagram marketing', 'tiktok marketing', 'influencer marketing',
      'brand management', 'public relations', 'market research', 'customer segmentation',
      'lead generation', 'conversion optimization', 'a/b testing', 'customer journey',
      'sales funnel', 'crm', 'hubspot', 'salesforce', 'customer acquisition',
      'marketing strategy', 'campaign management', 'growth marketing', 'demand generation',
      'content strategy', 'copywriting', 'seo/sem', 'market positioning'
    ],
    // Finance & Accounting
    finance: [
      'financial analysis', 'financial reporting', 'budgeting', 'forecasting', 'accounting',
      'bookkeeping', 'accounts payable', 'accounts receivable', 'general ledger', 'taxation',
      'audit', 'compliance', 'financial modeling', 'valuation', 'equity research',
      'investment banking', 'portfolio management', 'risk management', 'financial statements',
      'balance sheet', 'income statement', 'cash flow', 'quickbooks', 'sap', 'oracle financials',
      'cpa', 'cfa', 'financial planning', 'wealth management', 'asset management', 'hedge fund',
      'private equity', 'venture capital', 'mergers and acquisitions', 'm&a'
    ],
    // Healthcare
    healthcare: [
      'patient care', 'clinical', 'medical', 'healthcare', 'diagnosis', 'treatment',
      'therapy', 'nursing', 'physician', 'surgery', 'pharmacy', 'medication',
      'electronic health records', 'ehr', 'hipaa', 'telehealth', 'medical coding',
      'medical billing', 'healthcare administration', 'public health', 'epidemiology',
      'mental health', 'telemedicine', 'health insurance', 'clinical trials', 'regulatory affairs',
      'pharmaceuticals', 'medical device', 'biotech', 'life sciences', 'patient experience'
    ],
    // HR & People
    hr: [
      'recruitment', 'hiring', 'talent acquisition', 'interviewing', 'onboarding',
      'training', 'development', 'performance management', 'compensation', 'benefits',
      'payroll', 'employee relations', 'workforce planning', 'succession planning',
      'diversity and inclusion', 'hris', 'employee engagement', 'retention',
      'hr business partner', 'hr operations', 'talent management', 'dei', 'labor relations',
      'organizational development', 'total rewards', 'people analytics', 'hrbp'
    ],
    // Other Professional Skills
    professional: [
      'communication', 'leadership', 'problem solving', 'critical thinking', 'decision making',
      'time management', 'organization', 'multitasking', 'adaptability', 'teamwork',
      'collaboration', 'conflict resolution', 'presentation', 'public speaking', 'analytical',
      'research', 'detail oriented', 'creativity', 'innovation', 'mentoring', 'coaching',
      'cross-functional', 'interpersonal', 'emotional intelligence', 'strategic thinking',
      'relationship building', 'negotiation', 'influencing', 'customer-centric', 'client-facing'
    ],
    // Certifications & Qualifications
    certifications: [
      'certified', 'licensed', 'accredited', 'pmp', 'mba', 'cpa', 'cfa', 'aws certified',
      'cisco certified', 'comptia', 'microsoft certified', 'google certified', 'itil',
      'six sigma', 'scrum master', 'product owner', 'safe', 'cissp', 'ceh', 'csm',
      'ccna', 'ccnp', 'ccie', 'capm', 'prince2', 'aws solutions architect', 'azure administrator',
      'certified scrum master', 'certified product owner', 'certified ethical hacker',
      'certified information systems security professional', 'chartered financial analyst'
    ],
    // Industry-specific specialized areas
    specialized: [
      'blockchain', 'cryptocurrency', 'nft', 'smart contracts', 'web3',
      'sustainability', 'esg', 'renewable energy', 'carbon footprint',
      'iot', 'internet of things', 'embedded systems', 'robotics', 'automation',
      'vr', 'ar', 'virtual reality', 'augmented reality', 'metaverse',
      'cybersecurity', 'information security', 'compliance', 'gdpr', 'ccpa',
      'saas', 'paas', 'iaas', 'cloud computing', 'hybrid cloud', 'multi-cloud'
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
  
  // For phrase detection and overlap prevention
  const isSubPhraseOf = (shortPhrase: string, longPhrase: string): boolean => {
    return longPhrase.includes(shortPhrase);
  };
  
  // Check if a phrase is a constituent part of any existing phrase
  const isPartOfExistingPhrase = (newPhrase: string, existingPhrases: string[]): boolean => {
    for (const existing of existingPhrases) {
      if (isSubPhraseOf(newPhrase, existing) || isSubPhraseOf(existing, newPhrase)) {
        return true;
      }
    }
    return false;
  };
  
  // Extract phrases more carefully to avoid overlaps
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
    .filter(([word]) => !foundIndustryKeywords.includes(word) && 
      !stopWords.includes(word) && 
      word.length > 4) // Ensure words are substantial
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
  
  // Sort by frequency and get top phrases
  const frequentPhrases = Object.entries(phrases)
    .filter(([phrase]) => !foundIndustryKeywords.includes(phrase) &&
      // Ensure neither word in phrase is a stop word
      !phrase.split(' ').some(word => stopWords.includes(word)))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([phrase]) => phrase);
  
  // Combine industry keywords, frequent words, and phrases, prioritizing industry terms
  // Limit to top 25 for better focus
  const priorityKeywords = [...foundIndustryKeywords];
  const remainingSlots = Math.max(0, 25 - priorityKeywords.length);
  
  // Add other high-frequency words and phrases to fill remaining slots
  const additionalKeywords = [...frequentPhrases, ...frequentWords].slice(0, remainingSlots);
  
  // Combine all keywords
  let combinedKeywords = [...priorityKeywords, ...additionalKeywords];
  
  // Advanced duplicate and overlap filtering
  const filteredKeywords: string[] = [];
  
  // First pass: add longer phrases
  combinedKeywords.sort((a, b) => b.split(' ').length - a.split(' ').length);
  
  for (const keyword of combinedKeywords) {
    // Only add if it's not a sub-phrase of an already added keyword
    if (!filteredKeywords.some(existing => 
      isSubPhraseOf(keyword, existing) && keyword !== existing
    )) {
      filteredKeywords.push(keyword);
    }
  }
  
  // Second pass: filter out shorter phrases that are just parts of longer ones
  const finalKeywords = filteredKeywords.filter((keyword, idx) => {
    // Keep the keyword if it's not a sub-phrase of ANY other keyword (except itself)
    return !filteredKeywords.some((other, otherIdx) => 
      idx !== otherIdx && 
      isSubPhraseOf(keyword, other)
    );
  });
  
  return finalKeywords;
};

// Analyze which keywords are present in the resume with improved matching
export const analyzeKeywords = (resumeText: string, keywords: string[]): Record<string, boolean> => {
  const text = resumeText.toLowerCase();
  const results: Record<string, boolean> = {};
  
  keywords.forEach(keyword => {
    // Try different variations of the keyword
    const variations = [
      keyword,                                 // Exact match
      keyword.replace(/-/g, ' '),             // Replace hyphens with spaces
      keyword.replace(/ /g, '-'),             // Replace spaces with hyphens
      keyword.replace(/ing\b/g, ''),          // Remove -ing suffix
      keyword.replace(/s\b/g, ''),            // Remove plural s
      keyword.replace(/ed\b/g, ''),           // Remove -ed suffix
      keyword.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(), // Split camelCase
      // Add stemming for common word endings
      keyword.replace(/tion\b/g, 't'),        // Transform -tion ending
      keyword.replace(/ly\b/g, '')            // Remove -ly suffix
    ];
    
    // Enhanced pattern matching for partial word matching and context awareness
    results[keyword] = variations.some(variant => 
      text.includes(variant) || 
      // Also check for word boundary matches with more context
      new RegExp(`\\b${variant}\\b`, 'i').test(text) ||
      // Check for compound variations (hyphenated vs separate words)
      new RegExp(`\\b${variant.replace(/ /g, '[- ]')}\\b`, 'i').test(text)
    );
  });
  
  return results;
};
