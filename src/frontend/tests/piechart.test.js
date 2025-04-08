
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from '../src/components/piechart'; 
import PieChart from '../src/components/chartcomponent';

// Mock PieChart separately (we don't care about SVG details here)
jest.mock('../src/components/chartcomponent', () => (props) => (
  <div data-testid="pie-chart">
    Income: {props.incomePercentage.toFixed(1)}%, 
    Expense: {props.expensePercentage.toFixed(1)}%
  </div>
));

describe('MyComponent', () => {
  test('calculates correct percentages and passes them to PieChart', () => {
    render(<MyComponent totalIncome={600} totalExpense={-400} Net={200} />);

    // totalActivity = 600 + 400 = 1000
    // incomePercentage = 600/1000 = 60%
    // expensePercentage = 400/1000 = 40%

    expect(screen.getByText(/Income: 60.0%/i)).toBeInTheDocument();
    expect(screen.getByText(/Expense: 40.0%/i)).toBeInTheDocument();
  });

  test('handles zero total activity gracefully', () => {
    render(<MyComponent totalIncome={0} totalExpense={0} Net={0} />);

    expect(screen.getByText(/Income: 0.0%/i)).toBeInTheDocument();
    expect(screen.getByText(/Expense: 0.0%/i)).toBeInTheDocument();
  });

  test('handles only income and no expense', () => {
    render(<MyComponent totalIncome={500} totalExpense={0} Net={500} />);

    expect(screen.getByText(/Income: 100.0%/i)).toBeInTheDocument();
    expect(screen.getByText(/Expense: 0.0%/i)).toBeInTheDocument();
  });

  test('handles only expense and no income', () => {
    render(<MyComponent totalIncome={0} totalExpense={-300} Net={-300} />);

    expect(screen.getByText(/Income: 0.0%/i)).toBeInTheDocument();
    expect(screen.getByText(/Expense: 100.0%/i)).toBeInTheDocument();
  });
});