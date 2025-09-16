#!/usr/bin/env node
const { Command } = require("commander");
const { writeToFile, readFromFile } = require("./src/expenses");
const program = new Command();

// Add command
program
  .command("add")
  .description("Add an expense with an amount and description")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a --amount <amount>", "Expense amount")
  .action(async (options) => {
    const { description, amount } = options;
    const result = await writeToFile({ description, amount });

    console.log(`Expense added successfully (ID: ${result.id})`);
  });

// List command
program
  .command("list")
  .description("List all expenses")
  .action(async () => {
    const expenses = await readFromFile();
    console.log(`ID\tDate\t\t\tDescription\t\tAmount`);
    expenses.forEach((expense) =>
      console.log(
        `${expense.id}\t${expense.date}\t\t${expense.description}\t\t\t$${expense.amount}`
      )
    );
  });

program.parse();
