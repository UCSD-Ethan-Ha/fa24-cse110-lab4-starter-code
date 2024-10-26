import { render, screen, fireEvent } from "@testing-library/react";
import AddExpenseForm from './AddExpenseForm';
import { AppContext } from '../../context/AppContext';

test("create an expense", () => {
    render(
        <AddExpenseForm />
    );

    const nameInput = screen.getByLabelText(/Name/);
    const costInput = screen.getByLabelText(/Cost/);
    const submitButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(nameInput, { target: { value: "Apples" } });
    fireEvent.change(costInput, { target: { value: "100" } });
    fireEvent.click(submitButton);

    screen.debug();

    const addedExpense = screen.getByText(/Apples/);
    expect(addedExpense).toBeInTheDocument();

    const addedCost = screen.getByText(/100/); 
    expect(addedCost).toBeInTheDocument();



});
