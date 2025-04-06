import React from 'react';  // Ensure React is imported
import { render, screen } from '@testing-library/react';
import SmallGoals from "../src/components/smallgoals"

// Mock data for testing
const mockGoalsArray = [
  { amount: 1000, progress: 200 },
  { amount: 1500, progress: 1200 },
  { amount: 2000, progress: 1000 }
];

test('renders YourGoalsAccount component', () => {
  render(<SmallGoals goalsArray={mockGoalsArray} />);
  
  // Check if "Your Goals" text is displayed correctly
  expect(screen.getByText(/Your Goals/i)).toBeInTheDocument();
});
test('handles empty goals array correctly', () => {
  render(<SmallGoals goalsArray={[]} />);
  
  // Check if the total progress and total amount show $0 when the array is empty
  expect(screen.getByText('$0')).toBeInTheDocument();
  expect(screen.getByText('$0')).toBeInTheDocument();
});
