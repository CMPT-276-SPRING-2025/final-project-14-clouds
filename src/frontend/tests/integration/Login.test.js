

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../src/pages/Login";
import React from "react";

// Mock the LoginPanel component if needed
jest.mock("../../src/components/LoginPanel", () => ({
  __esModule: true,
  default: ({ displayStatus }) => (
    <div data-testid="login-panel">LoginPanel - Status: {displayStatus}</div>
  ),
}));

describe("Login Page Integration Test", () => {
  it("renders the login button, background, image, and welcome text", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("LOGIN")).toBeInTheDocument();
    expect(screen.getByAltText(/log in page pic/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome, We are glad to see you/i)).toBeInTheDocument();
  });

  it("shows LoginPanel with 'block' status when LOGIN button is clicked", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);

    expect(screen.getByTestId("login-panel")).toHaveTextContent("Status: block");
  });
});
