// tests/integration/Dashboard.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../src/pages/Dashboard';

// Mock child components
jest.mock('../../src/components/BalancePanel', () => () => <div data-testid="balance-panel">BalancePanel</div>);
jest.mock('../../src/components/MenuPanel', () => (props) => <div data-testid="menu-panel">MenuPanel</div>);
jest.mock('../../src/components/DashboardTransactions', () => () => <div data-testid="dashboard-transactions">DashboardTransactions</div>);
jest.mock('../../src/components/DashboardGoals', () => (props) => <div data-testid="dashboard-goals">DashboardGoals</div>);

describe('Dashboard Page Integration Test', () => {
  const mockGoals = [
    { id: 1, title: 'Save for vacation' },
    { id: 2, title: 'Buy a car' },
  ];
  const mockSetGoals = jest.fn();

  it('renders all major panels and sections correctly', () => {
    render(
      <MemoryRouter>
        <Dashboard goals={mockGoals} setGoals={mockSetGoals} />
      </MemoryRouter>
    );

    // Check if MenuPanel, BalancePanel, DashboardGoals, DashboardTransactions are rendered
    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    expect(screen.getByTestId('balance-panel')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-goals')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-transactions')).toBeInTheDocument();

    // Check for Analytics placeholder
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();

    // Check for Advice section
    expect(screen.getByText('Need some advice?')).toBeInTheDocument();
    expect(screen.getByText("Click here and let's help you out!")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ask for Advice/i })).toBeInTheDocument();
  });
});