// tests/BalancePanel.test.js
import React from 'react';  // <-- Add this line
import { render, screen, waitFor } from '@testing-library/react';
import BalancePanel from '../src/components/BalancePanel';

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

// Mock `import.meta.env` for Jest (before all tests)
beforeAll(() => {
  global.import = {
    meta: {
      env: {
        VITE_API_URL: 'http://mock-api-url.com', // Mock your Vite API URL here
      },
    },
  };
});

test('renders BalancePanel and displays loading state initially', () => {
  render(<BalancePanel />);

  // Check if "Loading..." text is displayed initially
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('fetches and displays account balance correctly', async () => {
  render(<BalancePanel />);

  // Wait for the component to re-render after data is fetched
  await waitFor(() => screen.getByText('$1500'));  // Check if total balance is updated

  // Check if the total balance is displayed correctly
  expect(screen.getByText('$1500')).toBeInTheDocument();

  // Check if individual balances are displayed correctly
  expect(screen.getByText('$1000')).toBeInTheDocument(); // Checking balance
  expect(screen.getByText('$500')).toBeInTheDocument();  // Savings balance
});

test('displays correct chequing and savings values', async () => {
  render(<BalancePanel />);

  // Wait for data to be fetched and rendered
  await waitFor(() => screen.getByText('$1500'));

  // Check chequing and savings balances
  expect(screen.getByText('$1000')).toBeInTheDocument();  // Checking balance
  expect(screen.getByText('$500')).toBeInTheDocument();   // Savings balance
});
