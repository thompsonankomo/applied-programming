using System;
using System.IO;

class Program
{
    static void Main(string[] args)
    {
        // Write to the Console
        Console.WriteLine("Hello World");
        Console.WriteLine("This is my first Console App");

        // Call the method to read the file SampleQuotes.txt
        var lines = ReadFrom("sampleQuotes.txt");

        // Print each line from the SampleQuotes.txt to the console
        foreach (var line in lines)
        {
            Console.WriteLine(line);
        }

        // Using the Equality operator to write decision logic
        Console.WriteLine("a" == "a");  // true
        Console.WriteLine("a" == "A");  // false
        Console.WriteLine(1 == 2);      // false

        string myValue = "a";
        Console.WriteLine(myValue == "a");  // true

        // Using the inequality operator
        Console.WriteLine("a" != "a");  // false
        Console.WriteLine("a" != "A");  // true
        Console.WriteLine(1 != 2);      // true

        // Use comparison operators
        Console.WriteLine(1 > 2);       // false
        Console.WriteLine(1 < 2);       // true
        Console.WriteLine(1 >= 1);      // true
        Console.WriteLine(1 <= 1);      // true

        // Call method to display random numbers
        Console.WriteLine("Generating random numbers:");
        DisplayRandomNumbers();

        // Call method to check if a string contains a word
        string pangram = "The quick brown fox jumps over the lazy dog.";
        Console.WriteLine(pangram.Contains("fox"));  // true
        Console.WriteLine(pangram.Contains("cow"));  // false

        // Call method to display adjusted times based on GMT difference
        int[] schedule = { 800, 1200, 1600, 2000 }; // example times
        DisplayAdjustedTimes(schedule, -5, 1);  // Adjust time from GMT-5 to GMT+1
    }

    // Method to read all lines from the file SampleQuotes.txt
    static string[] ReadFrom(string filePath)
    {
        // Check if the file exists before reading
        if (File.Exists(filePath))
        {
            // Return all lines from the file as an array of strings
            return File.ReadAllLines(filePath);
        }
        else
        {
            Console.WriteLine($"The file '{filePath}' does not exist.");
            return new string[] { };
        }
    }

    // Method to display 5 random numbers between 1 and 100
    static void DisplayRandomNumbers()
    {
        Random random = new Random();
        for (int i = 0; i < 5; i++)
        {
            Console.Write($"{random.Next(1, 100)} ");
        }
        Console.WriteLine();  // Move to the next line after displaying numbers
    }

    // Method to display adjusted times based on GMT difference
    static void DisplayAdjustedTimes(int[] times, int currentGMT, int newGMT)
    {
        int diff = 0;
        
        // Check for invalid GMT values
        if (Math.Abs(newGMT) > 12 || Math.Abs(currentGMT) > 12)
        {
            Console.WriteLine("Invalid GMT");
            return;
        }

        // Calculate time difference based on GMT values
        if ((newGMT <= 0 && currentGMT <= 0) || (newGMT >= 0 && currentGMT >= 0))
        {
            diff = 100 * (Math.Abs(newGMT) - Math.Abs(currentGMT));
        }
        else
        {
            diff = 100 * (Math.Abs(newGMT) + Math.Abs(currentGMT));
        }

        // Adjust and display the times based on the GMT difference
        Console.WriteLine("Adjusted times:");
        foreach (var time in times)
        {
            Console.WriteLine(time + diff);
        }
    }
}
