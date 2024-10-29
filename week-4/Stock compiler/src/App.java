import java.io.*; 
import java.util.HashMap; 
import java.util.Map; 
import java.util.Scanner;

public class App {
    // HashMap to store stock items and their quantities in Thomprim Investments
    private static HashMap<String, StockItem> stock = new HashMap<>();

    public static void main(String[] args) {
        System.out.println("Welcome to the Thomprim Boards Stock Controller!");

        // Load existing stock data from a file when the program starts
        loadStockFromFile("stock.txt");

        Scanner scanner = new Scanner(System.in);
        int choice;

        // Main menu loop
        do {
            System.out.println("\nMenu for Thomprim Boards Stock Controller:");
            System.out.println("1. Add Stock");
            System.out.println("2. Update Stock Quantity");
            System.out.println("3. Delete Stock");
            System.out.println("4. Display Stock");
            System.out.println("5. Process Sale");
            System.out.println("6. Save Stock to File");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    addStock(scanner);
                    break;
                case 2:
                    updateStock(scanner);
                    break;
                case 3:
                    deleteStock(scanner);
                    break;
                case 4:
                    displayStock();
                    break;
                case 5:
                    processSale(scanner);
                    break;
                case 6:
                    saveStockToFile("stock.txt");
                    break;
                case 7:
                    System.out.println("Exiting the program. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 7);

        scanner.close();
    }

    // Method to add a new stock item with quantity and price
    private static void addStock(Scanner scanner) {
        System.out.print("Enter stock item name: ");
        String itemName = scanner.nextLine();
        System.out.print("Enter quantity: ");
        int quantity = scanner.nextInt();
        System.out.print("Enter price per unit in USD: ");
        double price = scanner.nextDouble();
        scanner.nextLine();

        stock.put(itemName, new StockItem(itemName, quantity, price));
        System.out.println("Stock added successfully.");
    }

    // Method to update the quantity of an existing stock item
    private static void updateStock(Scanner scanner) {
        System.out.print("Enter stock item name to update: ");
        String itemName = scanner.nextLine();

        if (stock.containsKey(itemName)) {
            System.out.print("Enter new quantity: ");
            int quantity = scanner.nextInt();
            scanner.nextLine();
            stock.get(itemName).setQuantity(quantity);
            System.out.println("Stock quantity updated successfully.");
        } else {
            System.out.println("Item not found in stock.");
        }
    }

    // Method to delete a stock item
    private static void deleteStock(Scanner scanner) {
        System.out.print("Enter stock item name to delete: ");
        String itemName = scanner.nextLine();

        if (stock.containsKey(itemName)) {
            stock.remove(itemName);
            System.out.println("Stock item deleted successfully.");
        } else {
            System.out.println("Item not found in stock.");
        }
    }

    // Method to display all stock items
    private static void displayStock() {
        System.out.println("\nCurrent Stock:");
        for (Map.Entry<String, StockItem> entry : stock.entrySet()) {
            System.out.println(entry.getValue());
        }
    }

    // This  is the Method to process a sale in USD
    private static void processSale(Scanner scanner) {
        System.out.print("Enter stock item name to sell: ");
        String itemName = scanner.nextLine();
        System.out.print("Enter quantity to sell: ");
        int quantity = scanner.nextInt();
        scanner.nextLine();

        if (stock.containsKey(itemName) && stock.get(itemName).getQuantity() >= quantity) {
            StockItem item = stock.get(itemName);
            double totalCost = quantity * item.getPrice();
            item.setQuantity(item.getQuantity() - quantity);
            System.out.println("Sale successful for " + quantity + " of " + itemName + ".");
            System.out.printf("Total cost: $%.2f\n", totalCost);
            System.out.println("Remaining stock of " + itemName + ": " + item.getQuantity());
        } else {
            System.out.println("Sale failed: Not enough stock or item not found.");
        }
    }

    // This is the Method to save stock data to the main stock
    private static void saveStockToFile(String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (Map.Entry<String, StockItem> entry : stock.entrySet()) {
                StockItem item = entry.getValue();
                writer.write(item.getName() + "," + item.getQuantity() + "," + item.getPrice());
                writer.newLine();
            }
            System.out.println("Stock saved to file successfully.");
        } catch (IOException e) {
            System.out.println("Error saving to file: " + e.getMessage());
        }
    }

    // This is the   cLass Method to load stock data from a file
    private static void loadStockFromFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    String itemName = parts[0];
                    int quantity = Integer.parseInt(parts[1]);
                    double price = Double.parseDouble(parts[2]);
                    stock.put(itemName, new StockItem(itemName, quantity, price));
                }
            }
            System.out.println("Stock loaded from file successfully.");
        } catch (IOException e) {
            System.out.println("Error loading from file: " + e.getMessage());
        }
    }
}

// YThis is the StockItem class to represent  the available data in the stock
class StockItem {
    private String name;
    private int quantity;
    private double price;

    public StockItem(String name, int quantity, double price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return name + ": " + quantity + " units available at $" + price + " per unit";
    }
}

