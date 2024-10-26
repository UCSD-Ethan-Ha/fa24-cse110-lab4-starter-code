import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from "./App";
import { AppProvider, AppContext } from './context/AppContext';
import '@testing-library/jest-dom';

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
  const remaining = screen.getByText("Remaining: $900");
  
  expect(totalSpent).toBeInTheDocument(); 
  expect(remaining).toBeInTheDocument(); 

});

test("Delete an expense", () => {
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

  const deleteButton = screen.getAllByText("x")[0];
  //const deleteButton = screen.getByRole("button", { name: /x/i })
  fireEvent.click(deleteButton);

  expect(addedExpense).not.toBeInTheDocument();


  const totalSpent = screen.getByText('Spent so far: $0');
  const remaining = screen.getByText('Remaining: $1000');
  expect(totalSpent).toBeInTheDocument();
  expect(remaining).toBeInTheDocument();

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
  //I think these two lines are causing this test to fail..?
  const totalSpent = parseFloat(screen.getByText('Spent so far:').textContent!.replace('$', ''));
  const remaining = parseFloat(screen.getByText('Remaining').textContent!.replace('$', ''));

  expect(budget).toBeCloseTo(remaining + totalSpent, 2);

});

