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
        let budget = response.json().then((jsonResponse) => {
          console.log("data in fetchBudget", jsonResponse);
          return jsonResponse.data;
      });
      console.log("response in fetchBudget", budget);
      return budget;
};

// Function to update the budget in the backend. Method: PUT
// Implement for Exercise 3
export const updateBudget = async (budget: number): Promise<number> => {
  console.log("budget in updateBudget", budget);
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({"amount": budget})
    });
    if (!response.ok) {
      throw new Error("Failed to update budget");
    }
    
    return response.json();
};

