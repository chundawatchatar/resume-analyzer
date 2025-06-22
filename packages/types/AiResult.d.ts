export interface CvAnalysisResult {
  candidateName?: string;
  jobTitle?: string;
  overallSuitabilitySummary?: string;
  matchScorePercentage?: number;
  strengthsForRole?: string[];
  weaknessesOrGaps?: string[];
  hireRecommendation?: string;
  alignmentAnalysis?: {
    matchingSkills?: string[];
    missingSkills?: string[];
    experienceMatch?: string;
    recommendations?: string[];
  };
}
