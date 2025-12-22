# 💰 Expense Tracker Web Application

A modern, feature-rich expense tracker web application built with Java Maven, HTML, CSS, and JavaScript. Track your income and expenses with a beautiful, responsive UI - no backend required!

## ✨ Features

- **📊 Real-time Statistics**: View total balance, income, and expenses at a glance
- **➕ CRUD Operations**: Create, Read, Update, and Delete transactions
- **🎨 Modern UI**: Sleek dark theme with gradients, animations, and smooth transitions
- **💾 LocalStorage**: All data persists in your browser (no backend/server needed)
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🔍 Filter Transactions**: View all transactions, income only, or expenses only
- **📅 Date Tracking**: Organize transactions by date
- **🏷️ Categories**: Categorize expenses (Food, Transport, Entertainment, etc.)
- **⚡ Fast & Lightweight**: No database or backend server required

## 🚀 Technologies Used

- **Backend Build Tool**: Maven
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Server**: Jetty (embedded via Maven plugin)
- **Storage**: Browser LocalStorage
- **Icons**: Font Awesome
- **Testing**: JUnit

## 📋 Prerequisites

- Java JDK 11 or higher
- Maven 3.6 or higher

To check if you have them installed:
```bash
java -version
mvn -version
```

## 🛠️ Installation & Setup

1. **Navigate to the project directory**:
   ```bash
   cd "c:\Users\ABC\Documents\Eeswar devops\expense-tracker"
   ```

2. **Build the project**:
   ```bash
   mvn clean install
   ```

3. **Run tests**:
   ```bash
   mvn test
   ```

4. **Run the application**:
   ```bash
   mvn jetty:run
   ```

5. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## 📦 Project Structure

```
expense-tracker/
├── pom.xml                          # Maven configuration
├── src/
│   ├── main/
│   │   └── webapp/
│   │       ├── index.html          # Main HTML file
│   │       ├── css/
│   │       │   └── styles.css      # Stylesheet with modern design
│   │       └── js/
│   │           └── app.js          # JavaScript with CRUD operations
│   └── test/
│       └── java/
│           └── com/
│               └── expensetracker/
│                   └── ExpenseTrackerTest.java
└── README.md
```

## 🎯 Usage

### Adding a Transaction
1. Fill in the transaction details:
   - Description (e.g., "Grocery shopping")
   - Amount (e.g., 50.00)
   - Category (Food, Transport, Entertainment, etc.)
   - Date
   - Type (Income or Expense)
2. Click "Add Transaction"

### Editing a Transaction
1. Click the edit icon (✏️) on any transaction
2. Modify the details in the form
3. Click "Update Transaction"

### Deleting a Transaction
1. Click the delete icon (🗑️) on any transaction
2. Confirm the deletion

### Filtering Transactions
- Use the dropdown menu to filter by:
  - All Transactions
  - Income Only
  - Expenses Only

### Clearing All Data
- Click the "Clear All" button to delete all transactions
- Confirmation required before deletion

## 🎨 Features Showcase

### Dashboard Statistics
- **Total Balance**: Real-time calculation of income minus expenses
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions
- Color-coded indicators (green for positive, red for negative)

### Transaction Categories
- 🍔 Food
- 🚗 Transport
- 🎬 Entertainment
- 🛍️ Shopping
- 💡 Bills
- 🏥 Healthcare
- 📚 Education
- 💼 Salary
- 💰 Business
- 📌 Other

## 🧪 Testing

Run the test suite:
```bash
mvn test
```

Run tests with detailed output:
```bash
mvn test -X
```

## 📝 Maven Commands

| Command | Description |
|---------|-------------|
| `mvn clean` | Clean the project (remove target directory) |
| `mvn compile` | Compile the source code |
| `mvn test` | Run unit tests |
| `mvn package` | Package into WAR file |
| `mvn install` | Install to local Maven repository |
| `mvn jetty:run` | Run the application with Jetty |
| `mvn clean install` | Clean, compile, test, and package |

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 💡 Technical Details

### Data Persistence
All transaction data is stored in the browser's localStorage. This means:
- ✅ No backend server required
- ✅ Data persists between sessions
- ✅ Fast read/write operations
- ⚠️ Data is stored locally in the browser (not synced across devices)
- ⚠️ Clearing browser data will remove all transactions

### LocalStorage Structure
```javascript
{
  id: "timestamp",
  description: "Transaction description",
  amount: 100.00,
  category: "Food",
  date: "2025-12-22",
  type: "expense",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp" // if edited
}
```

## 🎨 Customization

### Changing Colors
Edit `src/main/webapp/css/styles.css`:
```css
:root {
    --primary-color: #6366f1;  /* Main theme color */
    --success-color: #10b981;  /* Income color */
    --danger-color: #ef4444;   /* Expense color */
    /* ... more colors */
}
```

### Adding New Categories
Edit `src/main/webapp/index.html` in the category select:
```html
<option value="YourCategory">🎯 Your Category</option>
```

## 🐛 Troubleshooting

### Port 8080 already in use
Change the port in `pom.xml`:
```xml
<httpConnector>
    <port>9090</port>  <!-- Change to any available port -->
</httpConnector>
```

### Maven not found
Ensure Maven is installed and added to your system PATH.

### Browser shows blank page
1. Check the browser console for errors (F12)
2. Ensure all files are in the correct directories
3. Try clearing browser cache and reload

## 📄 License

This project is open source and available for personal and educational use.

## 👤 Author

Built with ❤️ using Maven, HTML, CSS, and JavaScript

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📞 Support

For issues or questions, please check the browser console for error messages.

---

**Happy Expense Tracking! 💰📊**
