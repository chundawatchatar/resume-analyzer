import request from "supertest";
import { describe, expect, it, vi } from "vitest";

vi.mock("pdf-parse", () => ({
  default: vi.fn().mockResolvedValue({ text: "mocked PDF content" }),
}));

import app from "../app";
import { appRouter } from "../routers";

describe("🧪 Express API Routes", () => {
  it("✅ should return 200 for health check", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "ok");
  });

  it("❌ should return 404 for unknown routes", async () => {
    const response = await request(app).get("/api/v1/non-existent");
    expect(response.status).toBe(404);
  });
});

describe("🧠 tRPC analysis.analyzeCvAndJd", () => {
  const caller = appRouter.createCaller({});

  it("✅ returns a result for valid input", async () => {
    const cvText = "my cv";
    const jdText = "my job description";

    const result = await caller.analysis.analyzeCvAndJd({ cvText, jdText });

    expect(result).toBeDefined();
  });

  it("❌ fails validation when input is incomplete", async () => {
    const cvText = "my cv";
    const jdText = "";

    await expect(
      caller.analysis.analyzeCvAndJd({ cvText, jdText })
    ).rejects.toThrow();
  });
});
