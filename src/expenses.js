const fs = require("node:fs/promises");
const path = require("node:path");
const checkFileExists = require("./utils/checkFileExists");
const { checkBudgetExceeds } = require("./budgets");
const filePath = path.join(__dirname, "..", "expenses.json");

const writeToExpenseFile = async (data) => {
  try {
    let expenses = [];

    // check if file exists
    if (await checkFileExists(filePath)) {
      const file = await fs.readFile(filePath, "utf-8");
      // if file exists with array of expenses
      if (file.trim()) expenses = JSON.parse(file);
    }

    const expense = {
      id: expenses.length + 1,
      date: new Date().toDateString(),
      ...data,
    };
    expenses.push(expense);
    await checkBudgetExceeds(expenses);
    await fs.writeFile(filePath, JSON.stringify(expenses, null, 2));
    console.log(`Expense added successfully (ID: ${expense.id})`);
  } catch (error) {
    console.log("error in writing file", error);
  }
};

const readFromExpensesFile = async () => {
  try {
    if (await checkFileExists(filePath)) {
      const file = await fs.readFile(filePath, "utf-8");
      return JSON.parse(file);
    } else {
      return [];
    }
  } catch (error) {
    console.log("error in reading file", error);
  }
};

const deleteFromExpensesFile = async (id) => {
  try {
    const expenses = await readFromExpensesFile();
    const updatedExpenses = expenses.filter(
      (expense) => expense.id.toString() !== id.toString()
    );
    await fs.writeFile(filePath, JSON.stringify(updatedExpenses, null, 2));
    console.log(`Expense deleted successfully`);
  } catch (error) {
    console.log("error in deleting from file", error);
  }
};

const updateExpensesFile = async (id, data) => {
  try {
    const expenses = await readFromExpensesFile();
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id.toString() === id.toString()) {
        return { ...expense, ...data };
      }
      return expense;
    });
    await fs.writeFile(filePath, JSON.stringify(updatedExpenses, null, 2));
    console.log(`Expense updated successfully`);
  } catch (error) {
    console.log("error in updating from file", error);
  }
};

const getExpensesSummary = async (expenses, month) => {
  try {
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
    if (month) {
      let commandMonth = monthMap.get(+month);
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
  } catch (error) {
    console.log("error in getting summary", error);
  }
};

module.exports = {
  readFromExpensesFile,
  writeToExpenseFile,
  deleteFromExpensesFile,
  updateExpensesFile,
  getExpensesSummary,
};
