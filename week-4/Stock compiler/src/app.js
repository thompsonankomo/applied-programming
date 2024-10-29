// Initialize stock data as an object
let stock = {};

// Function to toggle form fields based on selected action
function toggleFields() {
    const actionType = document.getElementById('actionType').value;
    const quantityField = document.getElementById('quantityField');
    const priceField = document.getElementById('priceField');
    const currencyField = document.getElementById('currencyField');

    // this displays the action type
    if (actionType === "add") {
        quantityField.style.display = "block";
        priceField.style.display = "block";
        currencyField.style.display = "none";
    } else if (actionType === "update") {
        quantityField.style.display = "block";
        priceField.style.display = "none";
        currencyField.style.display = "none";
    } else if (actionType === "delete") {
        quantityField.style.display = "none";
        priceField.style.display = "none";
        currencyField.style.display = "none";
    } else if (actionType === "sale") {
        quantityField.style.display = "block";
        priceField.style.display = "none";
        currencyField.style.display = "block";
    }
}

//  This is the Function to handle the selected action
function handleAction() {
    const actionType = document.getElementById('actionType').value;
    const itemName = document.getElementById('itemName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const currency = document.getElementById('currency').value;

    if (!itemName) {
        alert("Please enter the item name.");
        return;
    }

    switch (actionType) {
        case "add":
            if (quantity <= 0 || price <= 0) {
                alert("Please enter valid quantity and price.");
                return;
            }
            addStock(itemName, quantity, price);
            break;

        case "update":
            if (quantity < 0) {
                alert("Please enter a valid quantity.");
                return;
            }
            updateStock(itemName, quantity);
            break;

        case "delete":
            deleteStock(itemName);
            break;

        case "sale":
            if (quantity <= 0) {
                alert("Please enter a valid quantity.");
                return;
            }
            processSale(itemName, quantity, currency);
            break;
    }

    // Reset form
    document.getElementById('stockForm').reset();
    toggleFields();
}

// Function to add stock to the main stock
function addStock(itemName, quantity, price) {
    stock[itemName] = { quantity: (stock[itemName]?.quantity || 0) + quantity, price: price };
    alert("Stock added successfully.");
}

// Function to update stock quantity to the Main Stock
function updateStock(itemName, quantity) {
    if (stock[itemName]) {
        stock[itemName].quantity = quantity;
        alert("Stock updated successfully.");
    } else {
        alert("Item not found in stock.");
    }
}

// Function to delete stock item from the Main
function deleteStock(itemName) {
    if (stock[itemName]) {
        delete stock[itemName];
        alert("Stock item deleted successfully.");
    } else {
        alert("Item not found in stock.");
    }
}

// Function to process a sale to the POS machine
function processSale(itemName, quantity, currency) {
    if (stock[itemName] && stock[itemName].quantity >= quantity) {
        const totalCost = (stock[itemName].price * quantity).toFixed(2);
        stock[itemName].quantity -= quantity;
        alert(`Sale successful for ${quantity} of ${itemName}.\nTotal: ${currency} ${totalCost}`);
    } else {
        alert("Sale failed: Not enough stock or item not found.");
    }
}

// This Function is to display current stock in the Store
function displayStock() {
    const stockDisplay = document.getElementById('stockDisplay');
    stockDisplay.innerHTML = '';

    for (const [itemName, { quantity, price }] of Object.entries(stock)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${itemName}: ${quantity} units available at $${price.toFixed(2)} per unit`;
        stockDisplay.appendChild(listItem);
    }

    if (Object.keys(stock).length === 0) {
        stockDisplay.innerHTML = '<li>No stock available.</li>';
    }
}
