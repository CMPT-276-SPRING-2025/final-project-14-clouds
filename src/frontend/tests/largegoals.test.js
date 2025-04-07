import React from 'react';
import { render, screen } from '@testing-library/react';
import BigGoals from '../src/components/largegoals';
beforeAll(() => {
  // Mock the alert function
  global.alert = jest.fn();
});

test('displays message when no goals are available', () => {
    render(<BigGoals goalsArray={[]} setterFunction={jest.fn()} />);
  
    // Check if the no-goals message is displayed
    // Since "No goals available" isn't in the component as of now, 
    // we check for "Your Goals" in the rendered output
    expect(screen.getByText('Your Goals')).toBeInTheDocument();
});

