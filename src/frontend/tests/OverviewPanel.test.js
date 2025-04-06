import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import OverviewPanel from '../src/components/OverviewPanel';  // Adjust path if needed

// Mock fetch for testing
global.fetch = jest.fn();

test('renders loading state initially', () => {
  // Mock fetch to simulate an in-progress request
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ transactions: [] })
  });

  render(<OverviewPanel />);

  // Check if the "loading overview..." message is shown initially
  expect(screen.getByText(/Loading overview.../i)).toBeInTheDocument();
});

test('handles fetch success and displays data', async () => {
    // Mock the fetch call to return mock data
    const mockTransactions = [
      { amount: 100 },
      { amount: -50 },
      { amount: 200 },
      { amount: -30 },
    ];
  
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ transactions: mockTransactions })
    });
  
    render(<OverviewPanel />);
  
    // Wait for the data to load and the correct values to be rendered
    await waitFor(() => screen.getByText('Cash In:'));
  
    // Check if the earnings, expenses, and net values are displayed correctly
    // Using class names to target the elements more specifically
    expect(screen.getByText('$300.00')).toBeInTheDocument();  // Cash In
    expect(screen.getByText('-$80.00')).toBeInTheDocument();  // Cash Out
    expect(screen.getByText('$220.00')).toBeInTheDocument();  // Earnings
  });
  

test('handles fetch failure and displays error', async () => {
  // Mock the fetch call to simulate a failure
  fetch.mockRejectedValueOnce(new Error('Failed to fetch transactions'));

  render(<OverviewPanel />);

  // Wait for the error message to be displayed
  await waitFor(() => screen.getByText(/Error: Failed to fetch transactions/i));

  // Check if the error message is displayed correctly
  expect(screen.getByText(/Error: Failed to fetch transactions/i)).toBeInTheDocument();
});
