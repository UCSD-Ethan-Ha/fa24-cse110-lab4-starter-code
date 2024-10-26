import { createContext, useState } from "react";
import Budget from "../components/Budget/Budget";
import { Expense } from "../types/types";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  //idk if it's supposed to return anything but if it is then replace "void" with w/e
  budget: number;
  setBudget: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => { },
  budget: 1000,
  setBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);


//im pretty confident abt everything for exercise 1 except for the AppProvider fnc with the const addBudget here
export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const [budget, setBudget] = useState<number>(initialState.budget);

  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        budget: budget,
        setExpenses: setExpenses,
        setBudget: setBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
