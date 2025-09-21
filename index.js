#!/usr/bin/env node
const { Command } = require("commander");
const {
  writeToFile,
  readFromFile,
  deleteFromFile,
  updateFile,
} = require("./src/expenses");
const { setbudget } = require("./src/budgets");
const exportToCSV = require("./src/utils/exportCSV");

const program = new Command();

// Add command
program
  .command("add")
  .description("Add an expense with an amount and description")
  .requiredOption("-d, --description <description>", "Expense description")
  .requiredOption("-a, --amount <amount>", "Expense amount")
  .requiredOption("-c, --category <category>", "Category name")
  .action(async (options) => {
    const { description, amount, category } = options;
    const result = await writeToFile({ description, amount, category });

    console.log(`Expense added successfully (ID: ${result.id})`);
  });

// List command
program
  .command("list")
  .description("List all expenses")
  .option("-c, --category <category>", "Filter by category")
  .action(async (options) => {
    const { category } = options;
    let expenses = await readFromFile();
    if (category) {
      expenses = expenses.filter((expense) => expense.category === category);
    }
    console.log(`ID\tDate\t\t\tDescription\t\tAmount\t\tCategory`);
    expenses.forEach((expense) =>
      console.log(
        `${expense.id}\t${expense.date}\t\t${expense.description}\t\t\t$${
          expense.amount
        }\t\t${expense.category ? expense.category : ""}`
      )
    );
  });

// Delete command
program
  .command("delete")
  .description("Delete an expense by ID")
  .requiredOption("-i, --id <id>", "Expense ID")
  .action(async (options) => {
    const { id } = options;
    await deleteFromFile(id);
    console.log(`Expense deleted successfully`);
  });

// Update command
program
  .command("update")
  .description("Update an expense by ID")
  .requiredOption("-i, --id <id>", "Expense ID")
  .option("-d, --description <description>", "Expense description")
  .option("-a --amount <amount>", "Expense amount")
  .action(async (options) => {
    const { id, description, amount } = options;

    if (!description && !amount) {
      console.log("Please provide either description or amount to update");
      return;
    }

    const data = {};
    if (description) data.description = description;
    if (amount) data.amount = amount;

    await updateFile(id, data);
    console.log(`Expense updated successfully`);
  });

// Summary command
program
  .command("summary")
  .description("Display a summary of expenses")
  .option("-m, --month <month>", "Filter by month")
  .action(async (options) => {
    const expenses = await readFromFile();
    let totalAmount = 0;
    let monthMap = new Map([
      [1, "Jan"],
      [2, "Feb"],
      [3, "Mar"],
      [4, "Apr"],
      [5, "May"],
      [6, "Jun"],
      [7, "Jul"],
      [8, "Aug"],
      [9, "Sep"],
      [10, "Oct"],
      [11, "Nov"],
      [12, "Dec"],
    ]);
    if (options.month) {
      let commandMonth = monthMap.get(+options.month);
      const filteredExpenses = expenses.filter((expense) => {
        if (
          expense.date.split(" ")[3] === new Date().getFullYear().toString()
        ) {
          const expenseMonth = expense.date.split(" ")[1];
          return expenseMonth === commandMonth;
        }
        return false;
      });
      totalAmount = filteredExpenses.reduce(
        (acc, expense) => acc + +expense.amount,
        0
      );
      console.log(`Total Expenses for ${commandMonth}: $${totalAmount}`);
    } else {
      totalAmount = expenses.reduce((acc, expense) => acc + +expense.amount, 0);
      console.log(`Total Expenses: $${totalAmount}`);
    }
  });

// Set budget command
program
  .command("budget")
  .description("Set a budget for a month")
  .requiredOption("-m, --month <month>", "Budget month")
  .requiredOption("-a, --amount <amount>", "Budget amount")
  .action(async (options) => {
    const { month, amount } = options;
    await setbudget(month, amount);
  });

// export command
program
  .command("exportToCSV")
  .description("Export expenses to a CSV file")
  .action(async () => {
    const expenses = await readFromFile();
    await exportToCSV(expenses);
  });

program.parse();
