import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

describe("App", () => {
  it("should return 200 for health check endpoint", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "ok");
  });

  it("should return 404 for non-existent routes", async () => {
    const response = await request(app).get("/api/v1/non-existent");
    expect(response.status).toBe(404);
  });
});
