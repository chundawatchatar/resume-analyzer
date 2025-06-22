export const getCvAnalysisPrompt = (cvText: string, jdText: string) => {
  return `You are an expert recruitment analyst. Your task is to evaluate a candidate's suitability for a specific job role based on their CV and the provided job description.

Job Description:
${jdText}

Candidate CV:
${cvText}

Instructions:
1.  Analyze the Job Description: Identify the core responsibilities, required skills (technical and soft), qualifications, experience level, and any specific preferences or technologies mentioned.
2.  Analyze the Candidate CV: Extract the candidate's professional experience, skills, education, achievements, and qualifications.
3.  Compare and Evaluate: Directly compare the candidate's CV against the job description, focusing on skills, experience, and overall fit.
4.  Generate Output in JSON format: Provide a structured analysis as a JSON object with the following keys. Use camelCase for all key names. Ensure values for list-type fields are plain text strings within a JSON array, not markdown formatted.
    - candidateName: Candidate name
    - jobTitle: Jon title
    - overallSuitabilitySummary: A concise paragraph (2-3 sentences) summarizing the candidate's overall fit.
    - matchScorePercentage: An integer from 0 to 100 representing the percentage match.
    - strengthsForRole: An array of 3-5 key strengths (each a plain text string) the candidate possesses that directly align with the job description. Be specific and reference points from their CV.
    - weaknessesOrGaps: An array of 2-4 areas (each a plain text string) where the candidate's CV shows a clear weakness or a noticeable gap compared to the job description's requirements. Be specific.
    - hireRecommendation: A direct recommendation on whether to hire this candidate for this specific role, based on the analysis. Choose one of the following exact phrases:
         "Strongly Recommend Hire"
         "Recommend Hire"
         "Neutral / Needs More Info"
         "Do Not Recommend Hire"
         "Strongly Do Not Recommend Hire"
    - alignmentAnalysis: A nested JSON object containing detailed alignment breakdown:
        - matchingSkills: An array of specific skills (plain text strings) found in the CV that directly match skills required by the job description. Provide 3-5 key matches.
        - missingSkills: An array of key skills (plain text strings) required by the job description that are missing or not clearly evident in the CV. Provide 2-4 key missing skills.
        - experienceMatch: A concise string (1-2 sentences) summarizing how well the candidate's professional experience aligns with the job requirements.
        - recommendations: An array of 1-3 actionable suggestions (plain text strings) for the candidate to improve their profile or better highlight their relevant experience specifically based on the skills and experience alignment gaps.

IMPORTANT: Output ONLY the JSON object. Do NOT include ANY other text, conversational elements, explanations, or markdown code block delimiters (e.g., \`\`\`json\`\`\`). The response must start immediately with '{' and end immediately with '}'.`;
};
