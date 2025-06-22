import {
  GenerateContentRequest,
  GenerateContentResult,
} from "@google-cloud/vertexai";
import { getCvAnalysisPrompt } from "../prompts";
import { CvAnalysisResult } from "@woolf/types/AiResult";

type ResponseType = GenerateContentResult["response"];

export async function sendToGeminiProxy(params: {
  cvText: string;
  jdText: string;
}): Promise<CvAnalysisResult> {
  const { cvText, jdText } = params;
  if (!process.env.GEMINI_ENDPOINT || !process.env.GEMINI_TOKEN) {
    throw new Error("GEMINI_ENDPOINT environment variable is not defined");
  }

  const prompt = getCvAnalysisPrompt(cvText, jdText);
  let requestPayload: GenerateContentRequest = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  const res = await fetch(process.env.GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.GEMINI_TOKEN,
    },
    body: JSON.stringify(requestPayload),
  });

  if (!res.ok) {
    throw new Error(`Gemini Proxy Request Failed: ${res.statusText}`);
  }
  const result = (await res.json()) as ResponseType;
  const extractedJson = extractJsonString(
    result?.candidates?.[0]?.content?.parts[0]?.text || "{}"
  );
  let parsedResponse = JSON.parse(extractedJson);
  return parsedResponse;
}

function extractJsonString(input: string) {
  const start = input.indexOf("{");
  const end = input.lastIndexOf("}");
  return input.slice(start, end + 1);
}
