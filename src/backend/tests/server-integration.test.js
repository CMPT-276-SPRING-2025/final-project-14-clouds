import { jest } from "@jest/globals";

// Mock node-fetch BEFORE importing app
jest.unstable_mockModule("node-fetch", () => ({
  default: async () => ({
    json: async () => ({
      public_token: "fake-public-token",
      access_token: "fake-access-token",
      accounts: [
        { subtype: "checking", balances: { current: 1000 } },
        { subtype: "savings", balances: { current: 5000 } }
      ],
      transactions: [
        { name: "Test Transaction", amount: 20.0 }
      ]
    })
  })
}));

import request from "supertest";
import app, { setAccessToken } from "../server.js"; // Import accessToken

describe("Integration Tests for API routes", () => {
  beforeAll(() => {
    // Manually set accessToken before tests
    setAccessToken("fake-access-token");
  });

  test("GET /getBalance", async () => {
    const res = await request(app).get("/getBalance");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("checkingAmount");
    expect(res.body).toHaveProperty("savingAmount");
  });

  test("GET /getTransactions", async () => {
    const res = await request(app).get("/getTransactions");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.transactions)).toBe(true);
  });

  test("POST /getAnswer", async () => {
    const res = await request(app).post("/getAnswer").send({ question: "What is Plaid?" });
    expect(res.statusCode).toBe(200);

    // Check if the answer is in the response
    if (res.body.answer) {
      expect(res.body).toHaveProperty("answer");
    } else {
      // Handle the case where the answer is not found
      expect(res.body.error).toBe("Error failed to fetch answer from Gemini");
    }
  });
});
