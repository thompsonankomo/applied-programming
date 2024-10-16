// Class to manage expenses
var ExpenseTracker = /** @class */ (function () {
    function ExpenseTracker() {
        this.expenses = [];
        this.nextId = 1;
        this.editingId = null; // Track the ID of the expense being edited
    }
    // Method to add a new expense
    ExpenseTracker.prototype.addExpense = function (description, amount) {
        var newExpense = {
            id: this.nextId++,
            description: description,
            amount: amount,
        };
        this.expenses.push(newExpense);
        this.renderExpenses();
    };
    // Method to update an existing expense
    ExpenseTracker.prototype.updateExpense = function (id, description, amount) {
        var expenseIndex = this.expenses.findIndex(function (expense) { return expense.id === id; });
        if (expenseIndex !== -1) {
            this.expenses[expenseIndex] = { id: id, description: description, amount: amount }; // Update the expense
            this.editingId = null; // Reset the editing ID
            this.renderExpenses(); // Re-render the expenses
        }
    };
    // Method to get all expenses
    ExpenseTracker.prototype.getExpenses = function () {
        return this.expenses;
    };
    // Method to delete an expense by id
    ExpenseTracker.prototype.deleteExpense = function (id) {
        this.expenses = this.expenses.filter(function (expense) { return expense.id !== id; });
        this.renderExpenses();
    };
    // Render expenses to the UI
    ExpenseTracker.prototype.renderExpenses = function () {
        var _this = this;
        var expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = ''; // Clear existing list
        // Add each expense to the list
        this.expenses.forEach(function (expense) {
            var li = document.createElement('li');
            li.innerText = "".concat(expense.description, ": $").concat(expense.amount.toFixed(2));
            var editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = function () { return _this.editExpense(expense.id); };
            li.appendChild(editButton);
            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function () { return _this.deleteExpense(expense.id); };
            li.appendChild(deleteButton);
            expenseList.appendChild(li);
        });
    };
    // Prepare to edit an expense
    ExpenseTracker.prototype.editExpense = function (id) {
        var expense = this.expenses.find(function (exp) { return exp.id === id; });
        if (expense) {
            var descriptionInput = document.getElementById('description');
            var amountInput = document.getElementById('amount');
            // Fill the input fields with the expense details
            descriptionInput.value = expense.description;
            amountInput.value = expense.amount.toString();
            this.editingId = id; // Set the editing ID
        }
    };
    return ExpenseTracker;
}());
// Initialize the expense tracker
var expenseTracker = new ExpenseTracker();
// Handle the form submission
document.getElementById('expense-form').onsubmit = function (event) {
    event.preventDefault(); // Prevent the default form submission
    var descriptionInput = document.getElementById('description');
    var amountInput = document.getElementById('amount');
    var description = descriptionInput.value;
    var amount = parseFloat(amountInput.value);
    // Check if we are editing an existing expense or adding a new one
    if (expenseTracker.editingId) {
        // Update the existing expense
        expenseTracker.updateExpense(expenseTracker.editingId, description, amount);
    }
    else {
        // Add a new expense
        expenseTracker.addExpense(description, amount);
    }
    // Clear the input fields after submission
    descriptionInput.value = '';
    amountInput.value = '';
};
