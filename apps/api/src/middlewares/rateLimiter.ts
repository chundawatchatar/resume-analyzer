import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

const rateLimiterHandler = new RateLimiterMemory({
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
});

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await rateLimiterHandler.consume(req.ip ?? "unknown");
    next();
  } catch (rejRes) {
    res.status(429).json({
      error: "Too Many Requests",
      message: "Rate limit exceeded",
    });
  }
};
