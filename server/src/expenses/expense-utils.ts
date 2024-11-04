import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, description } = req.body;
    console.log("reachable?");

    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    const newExpense: Expense = {
        id: id,
        description,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    for(const expense  of expenses) {
        if(expense.id === id) {
            expenses.splice(expenses.indexOf(expense), 1);
        }
    }
    return res.status(204).send({ message: "Expense deleted" })
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}