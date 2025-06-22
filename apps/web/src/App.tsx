import "./App.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./components/ui/button";
import { trpcClient } from "@/trpc";
import CvAnalysisDisplay from "./components/CvAnalysisDisplay";
import type { CvAnalysisResult } from "@woolf/types/AiResult";
import { Upload } from "lucide-react";

type PdfParseResponse = {
  jdText: string;
  cvText: string;
};

function App() {
  const [jobDescriptionFile, setJobDescriptionFile] = useState<File | null>(
    null
  );
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<CvAnalysisResult | null>(null);

  const handleJobDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setJobDescriptionFile(file);
      setError(null);
    } else {
      setError("Please select a PDF file for job description");
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
      setError(null);
    } else {
      setError("Please select a PDF file for resume");
    }
  };

  const uploadFiles = async (jobDescriptionFile: File, resumeFile: File) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescriptionFile);
    formData.append("resume", resumeFile);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  };

  const analyze = async (payload: PdfParseResponse) => {
    try {
      const result = await trpcClient.analysis.analyzeCvAndJd.mutate(payload);
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const resetForm = () => {
    // Reset form
    setJobDescriptionFile(null);
    setResumeFile(null);
    // Reset file inputs
    const jobInput = document.getElementById(
      "job-description"
    ) as HTMLInputElement;
    const resumeInput = document.getElementById("resume") as HTMLInputElement;
    if (jobInput) jobInput.value = "";
    if (resumeInput) resumeInput.value = "";
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobDescriptionFile || !resumeFile) {
      setError("Please select both job description and resume files");
      return;
    }
    setAnalysis(null)
    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadFiles(jobDescriptionFile, resumeFile);
      const analyzeResult = await analyze(result);
      if (analyzeResult) {
        setAnalysis(analyzeResult);
      }
      console.log("Upload result:", analyzeResult);
      resetForm();
    } catch (error) {
      console.error("Upload error:", error);
      setError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-96">
        <div className="fixed p-8">
          <div className="pb-16">
            <img className="h-10" src="/logo.svg" alt="woolf logo" />
          </div>

          <div className="flex items-center justify-center flex-col gap-10">
            <form onSubmit={submitHandler} className="flex flex-col gap-6">
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="job-description">Job Description (PDF)</Label>
                <Input
                  id="job-description"
                  className="cursor-pointer"
                  type="file"
                  accept=".pdf"
                  onChange={handleJobDescriptionChange}
                  disabled={isLoading}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="resume">Resume (PDF)</Label>
                <Input
                  id="resume"
                  className="cursor-pointer"
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid w-full max-w-sm items-center gap-3">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isLoading || !jobDescriptionFile || !resumeFile}
                >
                  {isLoading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex-1 p-16">
        {analysis ? (
          <CvAnalysisDisplay analysis={analysis} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-500">
            <div className="text-center">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to analyze
              </h3>
              <p className="text-gray-600 max-w-sm">
                Upload both your resume and job description to get started with
                the analysis.
              </p>
              {(!jobDescriptionFile || !resumeFile) && (
                <div className="mt-4 text-sm text-gray-500">
                  {!jobDescriptionFile && !resumeFile
                    ? "Please upload both files to continue"
                    : !jobDescriptionFile
                      ? "Still need: Job Description"
                      : "Still need: Resume"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
