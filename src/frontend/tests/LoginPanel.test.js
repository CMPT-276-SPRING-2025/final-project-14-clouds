// LoginPanel.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPanel from '../src/components/LoginPanel';  // Default import
import { MemoryRouter } from 'react-router-dom';

test('renders LoginPanel correctly and handles form input', () => {
  render(
    <MemoryRouter>
      <LoginPanel displayStatus="block" setter={() => {}} />
    </MemoryRouter>
  );

  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');
  const submitButton = screen.getByText('Submit');

  // Simulate user typing into the form fields
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  // Simulate clicking the submit button
  fireEvent.click(submitButton);

  // Add your assertions here
  expect(screen.getByText('Login')).toBeInTheDocument(); // Example check
});
