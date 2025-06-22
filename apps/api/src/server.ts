import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { upload } from "./middlewares/fileUpload";
import dotenv from "dotenv";
dotenv.config({ path: '../../.env'});

import { rateLimiter } from "./middlewares/rateLimiter";
import { appRouter } from "./routers";
import { uploadHandler } from "./services/pdf";

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
app.use(rateLimiter);

// Health check
app.get("/ping", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
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

app.listen(PORT, () => {
  console.info(`🚀 Server running on port ${PORT}`);
});

export type AppRouter = typeof appRouter;
