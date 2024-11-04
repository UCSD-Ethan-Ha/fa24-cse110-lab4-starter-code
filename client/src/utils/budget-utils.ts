import { METHODS } from "http";
import { API_BASE_URL } from "../constants/constants";
import { Expense } from "../types/types";


// Function to get budget from the backend. Method: GET
// Implement for Exercise 2
export const fetchBudget = async (): Promise<number> => {
    try {
        const response = await fetch('/api/budget', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Error fetching budget:", error);
        throw error;
      }
      

};

// Function to update the budget in the backend. Method: PUT
// Implement for Exercise 3
export const updateBudget = async (budget: number): Promise<number> => {
    return 0;
};

