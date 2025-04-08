

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../src/pages/Home"; 

describe("Home Page Integration Test", () => {
  it("renders the main elements correctly", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Check if the 'Get started now' button is rendered
    const startButton = screen.getByText(/Get started now/i);
    expect(startButton).toBeInTheDocument();

    // Check if the profile image is rendered
    const profileImage = screen.getByAltText(/profile pic/i);
    expect(profileImage).toBeInTheDocument();

    // Check if the main heading is rendered
    const heading = screen.getByRole('heading', {
      name: /Your Secure Gateway to Simple, Smart Finances/i
    });
    expect(heading).toBeInTheDocument();
  });

  it("has a link to the login page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /Get started now/i });
    expect(link).toHaveAttribute('href', '/Login');
  });
});