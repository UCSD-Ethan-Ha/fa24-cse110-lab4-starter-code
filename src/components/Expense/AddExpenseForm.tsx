import React, { useState, useContext } from "react";
import {AppContext} from "../../context/AppContext";

const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
  const {expenses, setExpenses, addBudget} = useContext(AppContext);

  // Exercise: Create name and cost to state variables
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Exercise: Add add new expense to expenses context array
    const newExpense = {
      name : name,
      cost : cost,
    };

    //can't figure out how to add the expense might be missing smth
    //addBudget(newExpense);

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
            value={""}
            // HINT: onChange={}
            onChange = {(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={0}
            // HINT: onChange={}
            onChange = {(event) => setCost(parseFloat(event.target.value))}
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
