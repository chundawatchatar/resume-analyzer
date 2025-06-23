import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { CvAnalysisResult } from "@woolf/types/AiResult";
import { H2, H3, H4 } from "./Typography";

interface CvAnalysisDisplayProps {
  analysis: CvAnalysisResult;
}

const CvAnalysisDisplay: React.FC<CvAnalysisDisplayProps> = ({ analysis }) => {
  if (!analysis) {
    return (
      <p className="text-center text-gray-500">No analysis data available.</p>
    );
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 hover:text-green-600";
    if (score >= 60) return "text-yellow-500 hover:text-yellow-600";
    if (score >= 40) return "text-orange-500 hover:text-orange-600";
    return "text-red-500 hover:text-red-600";
  };

  const getHireRecommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case "Strongly Recommend Hire":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Recommend Hire":
        return "bg-green-100 text-green-800 border border-green-300";
      case "Neutral / Needs More Info":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "Do Not Recommend Hire":
        return "bg-red-100 text-red-800 border border-red-300";
      case "Strongly Do Not Recommend Hire":
        return "bg-red-100 text-red-800 border border-red-300";
      default:
        return "bg-grey-100 text-grey-800 border border-grey-300";
    }
  };

  const {
    candidateName,
    jobTitle,
    overallSuitabilitySummary,
    matchScorePercentage,
    strengthsForRole,
    weaknessesOrGaps,
    hireRecommendation,
    alignmentAnalysis,
  } = analysis;

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 space-y-4 rounded-2xl shadow-md">
      <CardContent className="space-y-6">
        <div>
          <H2>{candidateName ?? "Candidate"}</H2>
          <p className="text-muted-foreground">
            Applying for: {jobTitle ?? "N/A"}
          </p>
        </div>
        <Separator className="my-4" />

        {matchScorePercentage !== undefined && (
          <div>
            <H3>Match Score</H3>
            <p
              className={`text-sm text-muted-foreground mt-1 ${getMatchScoreColor(matchScorePercentage)}`}
            >
              {matchScorePercentage}% match
            </p>
          </div>
        )}

        {hireRecommendation && (
          <div>
            <H3>Recommendation</H3>
            <Badge
              className={`text-sm ${getHireRecommendationStyle(hireRecommendation)}`}
            >
              {hireRecommendation}
            </Badge>
          </div>
        )}

        {overallSuitabilitySummary && (
          <div>
            <H3>Overall Summary</H3>
            <p className="text-sm">{overallSuitabilitySummary}</p>
          </div>
        )}

        {Array.isArray(strengthsForRole) && strengthsForRole?.length > 0 && (
          <div>
            <H3>Strengths</H3>
            <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
              {strengthsForRole.map((strength, idx) => (
                <li key={idx}>{strength}</li>
              ))}
            </ul>
          </div>
        )}

        {Array.isArray(weaknessesOrGaps) && weaknessesOrGaps?.length > 0 && (
          <div>
            <H3>Weaknesses / Gaps</H3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {weaknessesOrGaps.map((gap, idx) => (
                <li key={idx}>{gap}</li>
              ))}
            </ul>
          </div>
        )}

        {alignmentAnalysis && (
          <div className="space-y-4">
            <H3>Alignment Analysis</H3>

            {Array.isArray(alignmentAnalysis.matchingSkills) &&
              alignmentAnalysis.matchingSkills?.length > 0 && (
                <div>
                  <H4>Matching Skills</H4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {alignmentAnalysis.matchingSkills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        className="bg-green-100 text-green-800 border border-green-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {Array.isArray(alignmentAnalysis.missingSkills) &&
              alignmentAnalysis.missingSkills?.length > 0 && (
                <div>
                  <H4>Missing Skills</H4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {alignmentAnalysis.missingSkills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        className="bg-red-100 text-red-800 border border-red-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {alignmentAnalysis.experienceMatch && (
              <div>
                <H4 className="text-sm font-medium">Experience Match</H4>
                <p className="text-sm">{alignmentAnalysis.experienceMatch}</p>
              </div>
            )}

            {Array.isArray(alignmentAnalysis.recommendations) &&
              alignmentAnalysis.recommendations?.length > 0 && (
                <div>
                  <H4 className="text-sm font-medium">Recommendations for candidate</H4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {alignmentAnalysis.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CvAnalysisDisplay;
