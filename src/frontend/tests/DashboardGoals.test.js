import React from 'react';  // Ensure React is imported
import { render, screen } from '@testing-library/react';
import DashboardGoals from '../src/components/DashboardGoals';

// Mock data for testing
const mockGoalsArray = [
  { amount: 1000, progress: 200 },
  { amount: 1500, progress: 1200 },
  { amount: 2000, progress: 1000 }
];

test('renders DashboardGoals component', () => {
  render(<DashboardGoals goalsArray={mockGoalsArray} />);
  
  // Check if "Your Goals" text is displayed correctly
  expect(screen.getByText(/Your Goals/i)).toBeInTheDocument();
});


