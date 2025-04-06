import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Advice from "../../src/pages/Advice";
import React from "react";

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
});

const mockSetGoals = jest.fn();

describe("Advice Page Integration Test", () => {
  it("renders the core UI components correctly", () => {
    render(
      <MemoryRouter>
        <Advice goals={[]} setGoals={mockSetGoals} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ask me...')).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(
      <MemoryRouter>
        <Advice goals={[]} setGoals={mockSetGoals} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Ask me...');
    fireEvent.change(input, { target: { value: 'What is AI?' } });

    expect(input.value).toBe('What is AI?');
  });

  it("submits a question and displays chat and resources", async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        json: async () => ({ answer: "AI stands for Artificial Intelligence." }),
      })
      .mockResolvedValueOnce({
        json: async () => ({ answer: "• Title: AI Basics\n  URL: https://example.com\n• Title: Machine Learning\n  URL: https://example.com" }),
      });

    render(
      <MemoryRouter>
        <Advice goals={[]} setGoals={mockSetGoals} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Ask me...');
    const button = screen.getByText('Ask');

    fireEvent.change(input, { target: { value: 'What is AI?' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('AI stands for Artificial Intelligence.')).toBeInTheDocument();
      expect(screen.getByText(/Title: AI Basics/i)).toBeInTheDocument();
    });
  });
});