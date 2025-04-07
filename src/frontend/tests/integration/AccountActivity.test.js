import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountActivity from '../../src/pages/AccountActivity';


// Mock all child components to isolate AccountActivity behavior
jest.mock('../../src/components/BalancePanel2', () => () => <div data-testid="balance-panel" />);
jest.mock('../../src/components/MenuPanel', () => ({ setter }) => (
  <div data-testid="menu-panel">Menu Panel</div>
));
jest.mock('../../src/components/TransactionsPanel', () => () => <div data-testid="transactions-panel" />);
jest.mock('../../src/components/OverviewPanel', () => () => <div data-testid="overview-panel" />);
jest.mock('../../src/components/AccActivityGoals', () => ({ goalsArray }) => (
  <div data-testid="your-goals-account">Goals: {goalsArray.length}</div>
));

describe('AccountActivity Page Integration Test', () => {
  const mockSetGoals = jest.fn();
  const mockGoals = [
    { id: 1, title: 'Save for vacation' },
    { id: 2, title: 'Buy a car' },
  ];

  it('renders all major panels correctly', () => {
    render(<AccountActivity goals={mockGoals} setGoals={mockSetGoals} />);

    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    expect(screen.getByTestId('balance-panel')).toBeInTheDocument();
    expect(screen.getByTestId('transactions-panel')).toBeInTheDocument();
    expect(screen.getByTestId('your-goals-account')).toBeInTheDocument();
    expect(screen.getByTestId('overview-panel')).toBeInTheDocument();
  });

  it('passes the goals prop correctly to YourGoalsAccount', () => {
    render(<AccountActivity goals={mockGoals} setGoals={mockSetGoals} />);

    const goalsSection = screen.getByTestId('your-goals-account');
    expect(goalsSection).toHaveTextContent('Goals: 2');
  });
});