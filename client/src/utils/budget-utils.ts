import { METHODS } from "http";
import { API_BASE_URL } from "../constants/constants";
import { Expense } from "../types/types";


// Function to get budget from the backend. Method: GET
// Implement for Exercise 2
export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch budget");
        }
    return response.json();
};

// Function to update the budget in the backend. Method: PUT
// Implement for Exercise 3
export const updateBudget = async (budget: number): Promise<number> => {
    return 0;
};

