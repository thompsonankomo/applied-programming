// This Class manages the expenses
var ExpenseTracker = /** @class */ (function () {
    function ExpenseTracker() {
        this.expenses = [];
        this.nextId = 1;
        this.editingId = null; // This tracks the expense that is being edited
    }
    // This is the method  adds all expenses
    ExpenseTracker.prototype.addExpense = function (description, amount) {
        var newExpense = {
            id: this.nextId++,
            description: description,
            amount: amount,
        };
        this.expenses.push(newExpense);
        this.renderExpenses();
    };
    // This updates the existing expenses
    ExpenseTracker.prototype.updateExpense = function (id, description, amount) {
        var expenseIndex = this.expenses.findIndex(function (expense) { return expense.id === id; });
        if (expenseIndex !== -1) {
            this.expenses[expenseIndex] = { id: id, description: description, amount: amount }; // Update the expense
            this.editingId = null; // Reset the editing ID
            this.renderExpenses(); // Re-render the expenses
        }
    };
    // This is to get all the expenses in the consoles
    ExpenseTracker.prototype.getExpenses = function () {
        return this.expenses;
    };
    // This deletes expenses by Id
    ExpenseTracker.prototype.deleteExpense = function (id) {
        this.expenses = this.expenses.filter(function (expense) { return expense.id !== id; });
        this.renderExpenses();
    };
    // This method Renders expenses to the console
    ExpenseTracker.prototype.renderExpenses = function () {
        var _this = this;
        var expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = ''; // Clear existing list of expenses
        // each expense is added to the lists to the list of expenses
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
    // This  edits the expenses to the console
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
// Initializes the whole expense tracker
var expenseTracker = new ExpenseTracker();
// This Handles the form submission in the console
document.getElementById('expense-form').onsubmit = function (event) {
    event.preventDefault(); 
    var descriptionInput = document.getElementById('description');
    var amountInput = document.getElementById('amount');
    var description = descriptionInput.value;
    var amount = parseFloat(amountInput.value);
    // Checks if  we are updating an expense or editing an expense
    if (expenseTracker.editingId) {
        // This updates the expense to the console
        expenseTracker.updateExpense(expenseTracker.editingId, description, amount);
    }
    else {
        // This add a new expese to the console
        expenseTracker.addExpense(description, amount);
    }
    // all inputs are cleared after submission
    descriptionInput.value = '';
    amountInput.value = '';
};
