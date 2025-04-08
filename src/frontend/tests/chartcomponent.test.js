
import React from 'react';
import { render } from '@testing-library/react';
import PieChart from '../src/components/chartcomponent'; // adjust the import path if needed

describe('PieChart Component', () => {
  
  test('renders the base circle always', () => {
    const { container } = render(<PieChart incomePercentage={0} expensePercentage={0} />);
    const baseCircle = container.querySelector('.base-circle');
    expect(baseCircle).toBeInTheDocument();
  });

  test('renders only the income circle when only incomePercentage > 0', () => {
    const { container } = render(<PieChart incomePercentage={70} expensePercentage={0} />);
    
    const incomeCircle = container.querySelector('.income-circle');
    const expenseCircle = container.querySelector('.expense-circle');

    expect(incomeCircle).toBeInTheDocument();
    expect(expenseCircle).toBeNull(); // expense should not render
  });

  test('renders only the expense circle when only expensePercentage > 0', () => {
    const { container } = render(<PieChart incomePercentage={0} expensePercentage={30} />);

    const incomeCircle = container.querySelector('.income-circle');
    const expenseCircle = container.querySelector('.expense-circle');

    expect(incomeCircle).toBeNull(); // income should not render
    expect(expenseCircle).toBeInTheDocument();
  });

  test('renders both income and expense circles when both percentages > 0', () => {
    const { container } = render(<PieChart incomePercentage={50} expensePercentage={50} />);
    
    const incomeCircle = container.querySelector('.income-circle');
    const expenseCircle = container.querySelector('.expense-circle');

    expect(incomeCircle).toBeInTheDocument();
    expect(expenseCircle).toBeInTheDocument();
  });

  test('does not render income and expense circles when both are zero', () => {
    const { container } = render(<PieChart incomePercentage={0} expensePercentage={0} />);

    const incomeCircle = container.querySelector('.income-circle');
    const expenseCircle = container.querySelector('.expense-circle');

    expect(incomeCircle).toBeNull();
    expect(expenseCircle).toBeNull();
  });
  
});