// Define an interface for the Expense type
interface Expense {
    id: number;
    description: string;
    amount: number;
}

// Class to manage expenses
class ExpenseTracker {
    private expenses: Expense[] = [];
    private nextId: number = 1;
    private editingId: number | null = null; // Track the ID of the expense being edited

    // Method to add a new expense
    addExpense(description: string, amount: number): void {
        const newExpense: Expense = {
            id: this.nextId++,
            description,
            amount,
        };
        this.expenses.push(newExpense);
        this.renderExpenses();
    }

    // Method to update an existing expense
    updateExpense(id: number, description: string, amount: number): void {
        const expenseIndex = this.expenses.findIndex(expense => expense.id === id);
        if (expenseIndex !== -1) {
            this.expenses[expenseIndex] = { id, description, amount }; // Update the expense
            this.editingId = null; // Reset the editing ID
            this.renderExpenses(); // Re-render the expenses
        }
    }

    // Method to get all expenses
    getExpenses(): Expense[] {
        return this.expenses;
    }

    // Method to delete an expense by id
    deleteExpense(id: number): void {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.renderExpenses();
    }

    // Render expenses to the UI
    private renderExpenses(): void {
        const expenseList = document.getElementById('expense-list')!;
        expenseList.innerHTML = ''; // Clear existing list

        // Add each expense to the list
        this.expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerText = `${expense.description}: $${expense.amount.toFixed(2)}`;

            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = () => this.editExpense(expense.id);
            li.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => this.deleteExpense(expense.id);
            li.appendChild(deleteButton);

            expenseList.appendChild(li);
        });
    }

    // Prepare to edit an expense
    private editExpense(id: number): void {
        const expense = this.expenses.find(exp => exp.id === id);
        if (expense) {
            const descriptionInput = document.getElementById('description') as HTMLInputElement;
            const amountInput = document.getElementById('amount') as HTMLInputElement;

            // Fill the input fields with the expense details
            descriptionInput.value = expense.description;
            amountInput.value = expense.amount.toString();
            this.editingId = id; // Set the editing ID
        }
    }
}

// Initialize the expense tracker
const expenseTracker = new ExpenseTracker();

// Handle the form submission
document.getElementById('expense-form')!.onsubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const descriptionInput = document.getElementById('description') as HTMLInputElement;
    const amountInput = document.getElementById('amount') as HTMLInputElement;

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    // Check if we are editing an existing expense or adding a new one
    if (expenseTracker.editingId) {
        // Update the existing expense
        expenseTracker.updateExpense(expenseTracker.editingId, description, amount);
    } else {
        // Add a new expense
        expenseTracker.addExpense(description, amount);
    }

    // Clear the input fields after submission
    descriptionInput.value = '';
    amountInput.value = '';
};
