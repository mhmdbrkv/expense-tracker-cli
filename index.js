#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

const expenses = [];

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
  });

program.parse();

console.log(expenses);
