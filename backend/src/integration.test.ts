import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("HTTP API integration", () => {
  it("returns API health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "UP",
      service: "Home Viewing Booking API"
    });
  });

  it("rejects protected booking access without a bearer token", async () => {
    const response = await request(app).get("/api/bookings/customer");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("UNAUTHORIZED");
  });

  it("validates registration requests at the HTTP boundary", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "not-an-email", password: "short" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("VALIDATION_ERROR");
  });
});
