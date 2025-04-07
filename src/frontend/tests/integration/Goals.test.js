// tests/integration/Goals.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Goals from '../../src/pages/Goals';

// Mock child components
jest.mock('../../src/components/MenuPanel', () => (props) => <div data-testid="menu-panel">MenuPanel</div>);
jest.mock('../../src/components/smallgoals', () => (props) => <div data-testid="small-goals">SmallGoals</div>);
jest.mock('../../src/components/largegoals', () => (props) => <div data-testid="large-goals">BigGoals</div>);
jest.mock('../../src/components/addgoals', () => (props) => <div data-testid="add-goal">AddGoal</div>);

describe('Goals Page Integration Test', () => {
  const mockGoals = [
    { id: 1, title: 'Save for vacation', amount: 2000 },
    { id: 2, title: 'Buy a new laptop', amount: 1500 },
  ];
  const mockSetGoals = jest.fn();

  it('renders all major goal components correctly', () => {
    render(
      <MemoryRouter>
        <Goals goals={mockGoals} setGoals={mockSetGoals} />
      </MemoryRouter>
    );

    // Check that all the major components are in the document
    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    expect(screen.getByTestId('small-goals')).toBeInTheDocument();
    expect(screen.getByTestId('large-goals')).toBeInTheDocument();
    expect(screen.getByTestId('add-goal')).toBeInTheDocument();
  });
});