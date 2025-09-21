# Expense Tracker CLI

A **Command-Line Expense Tracker** built with Node.js.  
This project helps users track their expenses by adding, listing, summarizing, budgeting, and exporting them directly from the terminal.

Project idea from [roadmap.sh](https://roadmap.sh/projects/expense-tracker).

---

## Features

- Add a new expense with description, amount, and category.
- List all expenses with filtering by category.
- View a summary of total expenses (optionally filter by month).
- Set a monthly budget and get a warning if exceeded.
- Delete or update an expense.
- Export expenses to a CSV file.
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
expense-cli add -d "Lunch" -a 50 -c Food
# Output: Expense added successfully (ID: 1)
```

### Listing all expenses

```bash
expense-cli list
# Output: Table of all expenses with ID, Date, Description, Amount, Category
```

Filter by category:

```bash
expense-cli list -c Food
```

### Viewing summary

```bash
expense-cli summary
# Output: Total expenses: $XXX
```

Filter summary by month:

```bash
expense-cli summary -m 9
# Output: Summary of expenses for September
```

### Setting a budget

```bash
expense-cli budget -m 9 -a 500
# Output: Budget for September set to $500
```

### Updating an expense

```bash
expense-cli update -i 1 -d "Lunch with friends" -a 75
# Output: Expense updated successfully
```

### Deleting an expense

```bash
expense-cli delete -i 1
# Output: Expense deleted successfully
```

### Exporting to CSV

```bash
expense-cli exportToCSV
# Output: Expenses exported successfully to expenses.csv
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
