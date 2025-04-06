import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionsPanel from "../src/components/TransactionsPanel" // Adjust the import path if needed

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        transactions: [
          { merchant_name: "Amazon", amount: 200, date: "2023-04-01" },
          { merchant_name: "Netflix", amount: -15, date: "2023-04-02" },
          { merchant_name: "Starbucks", amount: 5, date: "2023-04-03" },
        ],
      }),
  })
);

test('displays no transactions message when no data is available', async () => {
  // Mock fetch to return an empty array of transactions
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ transactions: [] }),
    })
  );

  render(<TransactionsPanel />);

  // Wait for the no transactions message to appear
  await waitFor(() => screen.getByText(/No transactions available./i));

  // Check if the "No transactions available" message is shown
  expect(screen.getByText(/No transactions available./i)).toBeInTheDocument();
});

test('filters transactions correctly for earnings', async () => {
  render(<TransactionsPanel />);

  // Wait for the transactions to be rendered
  await waitFor(() => screen.getByText("Amazon"));

  // Check that the default filter (All Transactions) is applied
  expect(screen.getByText(/Amazon/i)).toBeInTheDocument();
  expect(screen.getByText(/Starbucks/i)).toBeInTheDocument();
  expect(screen.getByText(/Netflix/i)).toBeInTheDocument();

  // Change filter to "Earnings"
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Earnings" } });

  // Wait for the filtered transactions to be displayed
  await waitFor(() => screen.queryByText("Netflix"));

  // Check that only earnings (positive amounts) are shown
  expect(screen.getByText(/Amazon/i)).toBeInTheDocument();
  expect(screen.getByText(/Starbucks/i)).toBeInTheDocument();
  expect(screen.queryByText(/Netflix/i)).toBeNull();  // Expenditure should be removed
});

test('filters transactions correctly for expenditure', async () => {
  render(<TransactionsPanel />);

  // Wait for the transactions to be rendered
  await waitFor(() => screen.getByText("Amazon"));

  // Change filter to "Expenditure"
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "Expenditure" } });

  // Wait for the filtered transactions to be displayed
  await waitFor(() => screen.queryByText("Amazon"));

  // Check that only expenditure (negative amounts) are shown
  expect(screen.queryByText(/Amazon/i)).toBeNull();  // Earnings should be removed
  expect(screen.getByText(/Netflix/i)).toBeInTheDocument(); // Expenditure
});


