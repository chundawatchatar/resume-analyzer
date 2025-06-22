import fs from "fs";
import pdfParse from "pdf-parse";
import { Request, Response, NextFunction } from "express";

export const uploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const files = req.files as {
    jobDescription?: Express.Multer.File[];
    resume?: Express.Multer.File[];
  };

  if (!files?.jobDescription || !files?.resume) {
    res.status(400).json({ error: "Missing required files" });
    return;
  }

  const resumeFile = files.resume[0];
  const jdFile = files.jobDescription[0];

  try {
    // Read and parse resume PDF
    const resumeBuffer = fs.readFileSync(resumeFile.path);
    const resumeData = await pdfParse(resumeBuffer);

    // Read and parse job description PDF
    const jdBuffer = fs.readFileSync(jdFile.path);
    const jdData = await pdfParse(jdBuffer);

    // Clean up files
    fs.unlinkSync(resumeFile.path);
    fs.unlinkSync(jdFile.path);

    // Return parsed text
    res.json({
      cvText: resumeData.text,
      jdText: jdData.text,
    });
  } catch (error) {
    next(error);
  }
};
