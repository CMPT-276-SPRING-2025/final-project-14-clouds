import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardTransactions from '../src/components/DashboardTransactions';
import '@testing-library/jest-dom';
// Mock the fetch function globally for this test
global.fetch = jest.fn();

test('displays loading spinner initially', () => {
  render(<DashboardTransactions />);

  // Check if the loading spinner is present
  expect(screen.getByText(/Loading transactions.../i)).toBeInTheDocument();
});

test('displays error message if fetch fails', async () => {
  // Simulate a fetch failure
  fetch.mockRejectedValueOnce(new Error('Failed to fetch transactions'));

  render(<DashboardTransactions />);

  // Wait for the loading to finish and check for the error message
  await waitFor(() => screen.getByText(/Error: Failed to fetch transactions/i));
  expect(screen.getByText(/Error: Failed to fetch transactions/i)).toBeInTheDocument();
});

test('displays "No transactions available" if no transactions are fetched', async () => {
  // Simulate a successful fetch but no transactions
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ transactions: [] }),
  });

  render(<DashboardTransactions />);

  // Wait for the loading to finish
  await waitFor(() => screen.getByText('No transactions available.'));
  expect(screen.getByText('No transactions available.')).toBeInTheDocument();
});

test('displays "No transactions available" when transactions are empty', async () => {
  // Simulate no transactions returned
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ transactions: [] }),
  });

  render(<DashboardTransactions />);

  // Wait for the loading to finish
  await waitFor(() => screen.getByText('No transactions available.'));
  expect(screen.getByText('No transactions available.')).toBeInTheDocument();
});
