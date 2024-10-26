import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App";
import { AppProvider, AppContext } from './context/AppContext';

//idk if we need to import these
//import ExpenseList from '../Expense/ExpenseList';
//import AddExpenseForm from '../Expense/AddExpenseForm';



test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("create an expense", () => {
  render(
      <App />
  );

  const createName = screen.getAllByRole("textbox")[0];
  const createCost = screen.getAllByRole("textbox")[1];
  const submitButton = screen.getByText("Save");

  fireEvent.change(createName, { target: { value: "Apples" } });
  fireEvent.change(createCost, { target: { value: "100" } });
  fireEvent.click(submitButton);


  const addedExpense = screen.getByText("Apples");
  expect(addedExpense).toBeInTheDocument();

  const addedCost = screen.getByText("$100");
  expect(addedCost).toBeInTheDocument();

  const totalSpent = screen.getByText("Spent so far: $100");
  const remaining = screen.getByTestId("Remaining: $900");
  
  expect(totalSpent).toBeInTheDocument(); 
  expect(remaining).toBeInTheDocument(); 

});

test("Delete an expense", () => {
  render(
      <App />
  );


  const deleteButton = screen.getAllByText("x")[0];
  fireEvent.click(deleteButton);

  expect(screen.queryByText(/Apples/i)).not.toBeInTheDocument();

  const totalSpent = screen.getByTestId('Spent so far:');
  const remaining = screen.getByTestId('Remaining');
  expect(totalSpent).toHaveTextContent('$0');
  expect(remaining).toHaveTextContent('$1000');

});

test("Check Budget Balance and eqn", () => {
  render(
      <App />
  );

  const createName = screen.getAllByRole("textbox")[0];
  const createCost = screen.getAllByRole("textbox")[1];
  const submitButton = screen.getByText("Save");

  fireEvent.change(createName, { target: { value: 'Ingredients' } });
  fireEvent.change(createCost, { target: { value: '300' } });
  fireEvent.click(submitButton);

  fireEvent.change(createName, { target: { value: 'Utilities' } });
  fireEvent.change(createCost, { target: { value: '100' } });
  fireEvent.click(submitButton);

  // Verify the budget balance equation
  const budget = 1000; 
  //for some reason we need the all the code from textContext on for this to work. Mainly bc we can't add remaining + totalSpent since they're HTML elements I believe
  const totalSpent = parseFloat(screen.getByTestId('Spent so far:').textContent!.replace('$', ''));
  const remaining = parseFloat(screen.getByTestId('Remaining').textContent!.replace('$', ''));

  expect(budget).toBeCloseTo(remaining + totalSpent, 2);

});

