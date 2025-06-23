import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import dotenv from "dotenv";
dotenv.config({ path: '../../.env'});

import { upload } from "./middlewares/fileUpload";
import { rateLimiter } from "./middlewares/rateLimiter";
import { appRouter } from "./routers";
import { uploadHandler } from "./services/pdf";

const app: Application = express();

app.use(express.json());

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
app.use(rateLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/upload",
  upload.fields([
    { name: "jobDescription", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  uploadHandler,
);

// tRPC middleware
app.use("/api/trpc", createExpressMiddleware({ router: appRouter }));


export default app; 