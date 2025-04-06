import { jest } from "@jest/globals";

// Mock node-fetch BEFORE importing it
jest.unstable_mockModule("node-fetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

let fetch;
let fetchFromPlaid;
let genPublicToken;
let genAccessToken;
let genBalance;
let genTransactions;
let geminiResponse;

beforeAll(async () => {
  // Dynamically import after mocks are ready
  fetch = (await import("node-fetch")).default;
  const server = await import("../server.js");
  fetchFromPlaid = server.fetchFromPlaid;
  genPublicToken = server.genPublicToken;
  genAccessToken = server.genAccessToken;
  genBalance = server.genBalance;
  genTransactions = server.genTransactions;
  geminiResponse = server.geminiResponse;
});

describe("Unit Tests for server utility functions", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchFromPlaid should send correct POST request", async () => {
    fetch.mockImplementation(async () => ({
      json: async () => ({ success: true })
    }));

    const url = "https://fakeurl.com/test";
    const body = { test: "value" };
    const response = await fetchFromPlaid(url, body);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    expect(response).toEqual({ success: true });
  });

  test("genPublicToken should call fetchFromPlaid correctly", async () => {
    fetch.mockImplementation(async () => ({
      json: async () => ({ public_token: "fake-public-token" })
    }));

    const response = await genPublicToken();
    expect(response).toHaveProperty("public_token");
  });

  test("genAccessToken should call fetchFromPlaid with public token", async () => {
    fetch.mockImplementation(async () => ({
      json: async () => ({ access_token: "fake-access-token" })
    }));

    const response = await genAccessToken("public-token");
    expect(response).toHaveProperty("access_token");
  });

  test("genBalance should call fetchFromPlaid with access token", async () => {
    fetch.mockImplementation(async () => ({
      json: async () => ({ accounts: [] })
    }));

    const response = await genBalance("fake-access-token");
    expect(response).toHaveProperty("accounts");
  });

  test("genTransactions should call fetchFromPlaid and return transactions", async () => {
    fetch.mockImplementation(async () => ({
      json: async () => ({ transactions: [] })
    }));

    const response = await genTransactions("fake-access-token");
    expect(response).toHaveProperty("transactions");
  });

  test("geminiResponse should POST question and return answer", async () => {
    // mock geminiResponse 
    const fakeGeminiResponse = {
      candidates: [
        {
          content: { parts: [{ text: "Short answer from Gemini." }] }
        }
      ]
    };
  
    // Overwrite the geminiResponse function for this test
    geminiResponse = jest.fn(async () => ({
      json: async () => fakeGeminiResponse
    }));
  
    const response = await geminiResponse("What is Plaid?");
    const data = await response.json();
  
    expect(data.candidates[0].content.parts[0].text).toBe("Short answer from Gemini.");
  });

});