import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddGoal from '../src/components/addgoals.jsx';
// Mock data for testing
const mockOnAddGoal = jest.fn();

test('renders AddGoal component correctly', () => {
  render(<AddGoal onAddGoal={mockOnAddGoal} />);
  
  // Check if the form fields are rendered
  expect(screen.getByPlaceholderText('Goal Title')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Target Amount')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Achieve By')).toBeInTheDocument();
  expect(screen.getByText('Add Goal')).toBeInTheDocument();
});

test('adds a new goal when valid data is provided', () => {
  render(<AddGoal onAddGoal={mockOnAddGoal} />);
  
  // Input values
  fireEvent.change(screen.getByPlaceholderText('Goal Title'), {
    target: { value: 'Save for Vacation' },
  });
  fireEvent.change(screen.getByPlaceholderText('Target Amount'), {
    target: { value: '5000' },
  });
  fireEvent.change(screen.getByPlaceholderText('Achieve By'), {
    target: { value: '2025-12-31' },
  });

  // Submit the form
  fireEvent.click(screen.getByText('Add Goal'));

  // Check if the onAddGoal callback was called with the correct data
  expect(mockOnAddGoal).toHaveBeenCalledWith(
    expect.any(Function)  // The previous state should be passed as a function to update the goals
  );
});

test('clears input fields after successful submission', () => {
  render(<AddGoal onAddGoal={mockOnAddGoal} />);

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText('Goal Title'), {
    target: { value: 'Save for Vacation' },
  });
  fireEvent.change(screen.getByPlaceholderText('Target Amount'), {
    target: { value: '5000' },
  });
  fireEvent.change(screen.getByPlaceholderText('Achieve By'), {
    target: { value: '2025-12-31' },
  });

  // Submit the form
  fireEvent.click(screen.getByText('Add Goal'));

  // Check that input fields are cleared
  expect(screen.getByPlaceholderText('Goal Title').value).toBe('');
  expect(screen.getByPlaceholderText('Target Amount').value).toBe('');
  expect(screen.getByPlaceholderText('Achieve By').value).toBe('');
});
