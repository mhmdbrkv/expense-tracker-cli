#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

const expenses = [
  {
    id: 1,
    date: new Date().toDateString(),
    description: "Groceries",
    amount: 50,
  },
  {
    id: 2,
    date: new Date().toDateString(),
    description: "Entertainment",
    amount: 100,
  },
];

program
  .command("add")
  .description("Add an expense with an amount and description")
  .option("-d, --description <description>", "Expense description")
  .option("-a --amount <amount>", "Expense amount")
  .action((options) => {
    const expense = {
      id: expenses.length + 1,
      date: new Date().toDateString(),
      description: options.description,
      amount: options.amount,
    };
    expenses.push(expense);
    console.log(`Expense added successfully (ID: ${expense.id})`);
  });

program
  .command("list")
  .description("List all expenses")
  .action(() => {
    console.log(`ID\tDate\t\tDescription\tAmount`);
    expenses.forEach((expense) =>
      console.log(
        `${expense.id}\t${expense.date}\t${expense.description}\t$${expense.amount}`
      )
    );
  });

program.parse();
