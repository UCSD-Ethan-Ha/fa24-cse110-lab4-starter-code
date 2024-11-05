import { AppContext, AppProvider } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext)
  const [tempBudget, setTemp] = useState<number>(budget);

  useEffect(() => {
    loadBudget();
    }, []);
  
    // Function to load expenses and handle errors
    const loadBudget = async () => {
      try {
        const budget = await fetchBudget();
        console.log("Fetched budget:", budget); // Debugging log
        setBudget(budget);
      } catch (err: any) {
        console.log("Error fetching budget:", err.message);
      }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      updateBudget(tempBudget);
      setBudget(tempBudget);
    };
  
  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
        <div className="col-sm">
          <label htmlFor="budget">Budget:</label>
          <input
            required
            type="text"
            className="form-control"
            id="budget"
            // HINT: onChange={}
            onChange = {(event) => setTemp(parseFloat(event.target.value))}
            value = {tempBudget}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Edit
          </button>
        </div>
      </div>
    </form>

  );
};
export default Budget;
