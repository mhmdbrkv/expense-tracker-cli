# Expense Tracker CLI

A simple **Command-Line Expense Tracker** built with Node.js.  
This project helps users track their expenses by adding, listing, summarizing, and managing them directly from the terminal.

Project idea from [roadmap.sh](https://roadmap.sh/projects/expense-tracker).  
Repository: [mhmdbrkv/expense-tracker-cli](https://github.com/mhmdbrkv/expense-tracker-cli.git)

---

## Features

- Add a new expense with description, amount, and category.
- List all expenses in a structured format.
- View a summary of total expenses.
- Filter expenses by category or date.
- Delete or update an expense.
- Data stored in a local JSON file for persistence.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/mhmdbrkv/expense-tracker-cli.git
cd expense-tracker-cli
```

Install dependencies:

```bash
npm install
```

Make the CLI executable:

```bash
chmod +x index.js
```

---

## Usage

Run the CLI with the following commands:

### Adding a new expense

```bash
expense-cli add "Lunch" 50 Food
# Output: Expense added successfully (ID: 1)
```

### Listing all expenses

```bash
expense-cli list
# Output: Table of all expenses with ID, Description, Amount, Category, Date
```

### Viewing summary

```bash
expense-cli summary
# Output: Total expenses: $XXX
```

### Filtering expenses

```bash
expense-cli list --category Food
expense-cli list --date 2025-09-21
```

### Updating an expense

```bash
expense-cli update 1 "Lunch with friends" 75 Food
# Output: Expense updated successfully
```

### Deleting an expense

```bash
expense-cli delete 1
# Output: Expense deleted successfully
```

---

## Project Reference

This project idea comes from:  
🔗 [roadmap.sh - Expense Tracker](https://roadmap.sh/projects/expense-tracker)

---

## License

This project is open-source and available under the [MIT License](LICENSE).
