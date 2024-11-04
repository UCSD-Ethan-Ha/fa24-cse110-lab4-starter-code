import React, { useState, useContext } from "react";
import {AppContext} from "../../context/AppContext";
import {useId} from 'react';
import { createExpense } from "../../utils/expense-utils";


const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [description, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense = {
      id : (Math.random()).toString(),
      description : description,
      cost : cost,
    };

    //i think this is what we need to do for part 
    createExpense(newExpense);
    setExpenses((prevExpenses) => prevExpenses.concat(newExpense));

    // Default values for new entry.
    setName("");
    setCost(0);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            // HINT: onChange={}
            onChange = {(event) => setName(event.target.value)}
            value = {description}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            // HINT: onChange={}
            onChange = {(event) => setCost(parseFloat(event.target.value))}
            value = {cost}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
