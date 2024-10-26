import { render, screen, fireEvent } from "@testing-library/react";
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from "./ExpenseList";
import { AppContext } from '../../context/AppContext';

test("create an expense", () => {
    render(
        <ExpenseList />
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const costInput = screen.getByLabelText(/Cost/i);
    const submitButton = screen.getByText("Save");

    fireEvent.change(nameInput, { target: { value: "Apples" } });
    fireEvent.change(costInput, { target: { value: "100" } });
    fireEvent.click(submitButton);


    const addedExpense = screen.getByText("Apples");
    expect(addedExpense).toBeInTheDocument();

    const addedCost = screen.getByText("100");
    expect(addedCost).toBeInTheDocument();

    const totalSpent = screen.getByTestId('Spent so far:');
    const remaining = screen.getByTestId('Remaining');
    
    expect(totalSpent).toBe(100); 
    expect(remaining).toBe(900); 

});

test("Delete an expense", () => {
    render(
        <ExpenseList />
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
        <ExpenseList />
    );

    const nameInput = screen.getByLabelText(/name/i);
    const costInput = screen.getByLabelText(/cost/i);
    const submitButton = screen.getByText("Save");
  
    fireEvent.change(nameInput, { target: { value: 'Ingredients' } });
    fireEvent.change(costInput, { target: { value: '300' } });
    fireEvent.click(submitButton);
  
    fireEvent.change(nameInput, { target: { value: 'Utilities' } });
    fireEvent.change(costInput, { target: { value: '100' } });
    fireEvent.click(submitButton);
  
    // Verify the budget balance equation
    const budget = 1000; 
    //for some reason we need the all the code from textContext on for this to work. Mainly bc we can't add remaining + totalSpent since they're HTML elements I believe
    const totalSpent = parseFloat(screen.getByTestId('Spent so far:').textContent!.replace('$', ''));
    const remaining = parseFloat(screen.getByTestId('Remaining').textContent!.replace('$', ''));
  
    expect(budget).toBeCloseTo(remaining + totalSpent, 2);

});

