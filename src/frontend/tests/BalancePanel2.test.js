
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BalancePanel2 from '../src/components/BalancePanel2';

// Mock the fetch to return mock data for the balance
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        checkingAmount: 1000,
        savingAmount: 500,
      }),
  })
);

test('renders loading state initially', () => {
  render(<BalancePanel2 />);

  // Check if the loading text is displayed initially
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('fetches and displays account balances correctly', async () => {
    render(<BalancePanel2 />);
  
    // Wait for the component to re-render after data is fetched
    await waitFor(() => screen.getByText(/\$1500\.00/));  // Use regex to match "$1500.00"
  
    // Check if the total balance is displayed correctly
    expect(screen.getByText(/\$1500\.00/)).toBeInTheDocument();
  
    // Check if individual balances are displayed correctly
    expect(screen.getByText(/\$1000\.00/)).toBeInTheDocument(); // Checking balance
    expect(screen.getByText(/\$500\.00/)).toBeInTheDocument();  // Savings balance
  });
