const fs = require("node:fs/promises");
const path = require("node:path");
const checkFileExists = require("./utils/checkFileExists");
const filePath = path.join(__dirname, "..", "budgets.json");

const setBudget = async (month, amount) => {
  try {
    let budgets = [];

    // check if file exists
    if (await checkFileExists(filePath)) {
      const file = await fs.readFile(filePath, "utf-8");
      budgets = JSON.parse(file);
    } else {
      console.log("budget file does not exist");
      return;
    }

    budgets = budgets.map((budget) => {
      if (+budget.id === +month) {
        return { ...budget, amount };
      }
      return budget;
    });

    await fs.writeFile(filePath, JSON.stringify(budgets, null, 2));
    console.log(`Budget set successfully for ${month}`);
  } catch (error) {
    console.log("error in setting budget", error);
  }
};

const getBudgets = async () => {
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

const checkBudgetExceeds = async (expenses) => {
  try {
    // get current month
    const currentMonth = new Date().toDateString().split(" ")[1];

    // get total expenses amount for current month
    let totalAmount = 0;
    const filteredExpenses = expenses.filter((expense) => {
      const expenseMonth = expense.date.split(" ")[1];
      return expenseMonth === currentMonth;
    });
    totalAmount = filteredExpenses.reduce(
      (acc, expense) => acc + +expense.amount,
      0
    );

    // get budget amount for current month
    const budgets = await getBudgets();
    const budgetAmount = budgets.find(
      (budget) => budget.month === currentMonth
    ).amount;

    // show a warning when the user exceeds the budget
    if (totalAmount > budgetAmount) {
      console.log(
        `Warning: You have exceeded your budget for ${currentMonth} by ${
          totalAmount - budgetAmount
        }`
      );
    }
  } catch (error) {
    console.log("error in checking budget", error);
  }
};

module.exports = { setBudget, checkBudgetExceeds };
