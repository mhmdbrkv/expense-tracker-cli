const fs = require("node:fs/promises");
const path = require("node:path");
const filePath = path.join(__dirname, "..", "expenses.json");

const checkFileExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

const writeToFile = async (data) => {
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
    await fs.writeFile(filePath, JSON.stringify(expenses, null, 2));
    return expense;
  } catch (error) {
    console.log("error in writing file", error);
  }
};
const readFromFile = async () => {
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

const deleteFromFile = async (id) => {
  try {
    const expenses = await readFromFile();
    const updatedExpenses = expenses.filter(
      (expense) => expense.id.toString() !== id.toString()
    );
    await fs.writeFile(filePath, JSON.stringify(updatedExpenses, null, 2));
  } catch (error) {
    console.log("error in deleting from file", error);
  }
};

const updateFile = async (id, data) => {
  try {
    const expenses = await readFromFile();
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id.toString() === id.toString()) {
        return { ...expense, ...data };
      }
      return expense;
    });
    await fs.writeFile(filePath, JSON.stringify(updatedExpenses, null, 2));
  } catch (error) {
    console.log("error in updating from file", error);
  }
};

module.exports = { readFromFile, writeToFile, deleteFromFile, updateFile };
