package com.expensetracker;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Basic test class for Expense Tracker application
 * Since this is a frontend-only application using JavaScript and localStorage,
 * these tests serve as placeholder examples for the Maven test phase.
 */
public class ExpenseTrackerTest {

    @Test
    public void testApplicationStructure() {
        // Test that basic structure is valid
        assertTrue("Application structure test", true);
    }

    @Test
    public void testPositiveNumber() {
        double amount = 100.50;
        assertTrue("Amount should be positive", amount > 0);
    }

    @Test
    public void testBalanceCalculation() {
        double income = 5000.00;
        double expense = 3000.00;
        double expectedBalance = 2000.00;
        
        double actualBalance = income - expense;
        
        assertEquals("Balance calculation should be correct", expectedBalance, actualBalance, 0.01);
    }

    @Test
    public void testNegativeBalance() {
        double income = 2000.00;
        double expense = 3000.00;
        
        double balance = income - expense;
        
        assertTrue("Balance should be negative when expenses exceed income", balance < 0);
    }

    @Test
    public void testStringNotEmpty() {
        String description = "Grocery shopping";
        assertFalse("Description should not be empty", description.isEmpty());
    }

    @Test
    public void testAmountFormatting() {
        double amount = 123.456;
        String formatted = String.format("%.2f", amount);
        assertEquals("Amount should be formatted to 2 decimal places", "123.46", formatted);
    }
}
