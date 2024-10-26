import { Expense } from "../../types/types";
import {useContext} from "react";
import {AppContext} from  "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses, setBudget} = useContext(AppContext);


  const handleDeleteExpense = (currentExpense: Expense) => {
      // Exercise: Remove expense from expenses context array
      for(const entry of expenses){
        if(entry.id === currentExpense.id){
          setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== entry.id));
      }
  }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
