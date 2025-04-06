import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MenuPanel from '../src/components/MenuPanel';
test('renders MenuPanel correctly and handles logout', () => {
  // Mock setter function
  const mockSetter = jest.fn();

  // Render MenuPanel wrapped with MemoryRouter
  render(
    <MemoryRouter>
      <MenuPanel setter={mockSetter} />
    </MemoryRouter>
  );

  // Check if the menu links and logout button are rendered
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Account Activity/i)).toBeInTheDocument();
  expect(screen.getByText(/My Goals/i)).toBeInTheDocument();
  expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
  expect(screen.getByText(/Advice/i)).toBeInTheDocument();

  // Check if the logo is rendered
  const logoImage = screen.getByAltText('profile logo');
  expect(logoImage).toBeInTheDocument();

  // Check the logout button
  const logoutButton = screen.getByRole('button', { name: /Log Out/i });
  expect(logoutButton).toBeInTheDocument();

  // Simulate a click on the logout button and check if the setter function is called
  fireEvent.click(logoutButton);
  expect(mockSetter).toHaveBeenCalledWith([]); // Ensure the setter is called with an empty array
});
