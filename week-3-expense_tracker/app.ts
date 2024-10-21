// Define an interface for the Expense type
interface Expense {
    id: number;
    description: string;
    amount: number;
}

//This is the class to manage all eexpense
class ExpenseTracker {
    private expenses: Expense[] = [];
    private nextId: number = 1;
    private editingId: number | null = null; // Track the ID of the expense being edited

    // This is the method to add all expenses
    addExpense(description: string, amount: number): void {
        const newExpense: Expense = {
            id: this.nextId++,
            description,
            amount,
        };
        this.expenses.push(newExpense);
        this.renderExpenses();
    }

    //  Updates an existing expenses
    updateExpense(id: number, description: string, amount: number): void {
        const expenseIndex = this.expenses.findIndex(expense => expense.id === id);
        if (expenseIndex !== -1) {
            this.expenses[expenseIndex] = { id, description, amount }; // Update the expense
            this.editingId = null; // Reset the editing ID
            this.renderExpenses(); // Re-render the expenses
        }
    }

    // Get all expenses
    getExpenses(): Expense[] {
        return this.expenses;
    }

    // Delete expense by ID
    deleteExpense(id: number): void {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.renderExpenses();
    }

    // This is the render expenses method
    private renderExpenses(): void {
        const expenseList = document.getElementById('expense-list')!;
        expenseList.innerHTML = ''; // Clear existing list

        // This expenses to the List
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

    // This edits expenses to the console
    private editExpense(id: number): void {
        const expense = this.expenses.find(exp => exp.id === id);
        if (expense) {
            const descriptionInput = document.getElementById('description') as HTMLInputElement;
            const amountInput = document.getElementById('amount') as HTMLInputElement;

            // This fills the expense details
            descriptionInput.value = expense.description;
            amountInput.value = expense.amount.toString();
            this.editingId = id; // Set the editing ID
        }
    }
}

// This initializes the expenses 
const expenseTracker = new ExpenseTracker();

// The form submission is handled here
document.getElementById('expense-form')!.onsubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const descriptionInput = document.getElementById('description') as HTMLInputElement;
    const amountInput = document.getElementById('amount') as HTMLInputElement;

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    // This edits and  add, and deletes the expenses
    if (expenseTracker.editingId) {
        // This updates the expenses
        expenseTracker.updateExpense(expenseTracker.editingId, description, amount);
    } else {
        // This add the new expenses
        expenseTracker.addExpense(description, amount);
    }

    // this clears the inputs after submission
    descriptionInput.value = '';
    amountInput.value = '';
};
