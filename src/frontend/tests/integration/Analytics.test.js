import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Analytics from '../../src/pages/Analytics';

// Mock child components
jest.mock('../../src/components/MenuPanel', () => (props) => <div data-testid="menu-panel">MenuPanel</div>);
jest.mock('../../src/components/piechart', () => (props) => <div data-testid="my-component">PieChart (MyComponent)</div>);

describe('Analytics Page Integration Test', () => {
  it('renders major sections correctly', () => {
    render(
      <MemoryRouter>
        <Analytics />
      </MemoryRouter>
    );

    // Check important sections
    expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
    expect(screen.getByTestId('my-component')).toBeInTheDocument();
    expect(screen.getByText(/Total:/i)).toBeInTheDocument();

    // get ALL occurrences of "ALL" instead of just one
    const allElements = screen.getAllByText('ALL');
    expect(allElements.length).toBeGreaterThanOrEqual(2);

    // Still check that the error message shows
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });
});