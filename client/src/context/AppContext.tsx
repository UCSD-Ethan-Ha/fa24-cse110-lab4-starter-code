import { createContext, useState } from "react";
import { Expense } from "../types/types";
import { isStringLiteral } from "typescript";

// Exercise: Create add budget to the context

interface AppContextType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  //idk if it's supposed to return anything but if it is then replace "void" with w/e
  addBudget: (expenses: Expense) => void;
}

const initialState: AppContextType = {
  expenses: [],
  setExpenses: () => { },
  addBudget: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);


//im pretty confident abt everything for exercise 1 except for the AppProvider fnc with the const addBudget here
export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);
  const addBudget = (newExpense: Expense) => {
    setExpenses((prevExpenses) => prevExpenses.concat(newExpense));
  };



  return (
    <AppContext.Provider
      value={{
        expenses: expenses,
        setExpenses: setExpenses,
        addBudget: addBudget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
