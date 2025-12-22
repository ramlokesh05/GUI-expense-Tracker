// ===== Expense Tracker Application =====
// This application uses localStorage for data persistence (no backend required)

class ExpenseTracker {
    constructor() {
        this.transactions = this.loadFromStorage();
        this.editingId = null;
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setDefaultDate();
        this.renderTransactions();
        this.updateStats();
    }

    // Setup all event listeners
    setupEventListeners() {
        const form = document.getElementById('transactionForm');
        const filterType = document.getElementById('filterType');
        const clearAllBtn = document.getElementById('clearAllBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        filterType.addEventListener('change', () => this.renderTransactions());
        clearAllBtn.addEventListener('click', () => this.clearAllTransactions());
        cancelBtn.addEventListener('click', () => this.cancelEdit());
    }

    // Set default date to today
    setDefaultDate() {
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // Load transactions from localStorage
    loadFromStorage() {
        const data = localStorage.getItem('expenseTrackerData');
        return data ? JSON.parse(data) : [];
    }

    // Save transactions to localStorage
    saveToStorage() {
        localStorage.setItem('expenseTrackerData', JSON.stringify(this.transactions));
    }

    // Handle form submission (Create/Update)
    handleSubmit(e) {
        e.preventDefault();

        const description = document.getElementById('description').value.trim();
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;
        const type = document.querySelector('input[name="type"]:checked').value;
        const editId = document.getElementById('editId').value;

        if (!description || !amount || !category || !date || !type) {
            alert('Please fill in all fields!');
            return;
        }

        if (amount <= 0) {
            alert('Amount must be greater than 0!');
            return;
        }

        if (editId) {
            // Update existing transaction
            this.updateTransaction(editId, { description, amount, category, date, type });
        } else {
            // Create new transaction
            this.createTransaction({ description, amount, category, date, type });
        }

        this.resetForm();
        this.renderTransactions();
        this.updateStats();
    }

    // Create a new transaction
    createTransaction(data) {
        const transaction = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
        };

        this.transactions.unshift(transaction);
        this.saveToStorage();
        this.showNotification('Transaction added successfully!', 'success');
    }

    // Read/Get a transaction by ID
    getTransaction(id) {
        return this.transactions.find(t => t.id === id);
    }

    // Update an existing transaction
    updateTransaction(id, data) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            this.transactions[index] = {
                ...this.transactions[index],
                ...data,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage();
            this.showNotification('Transaction updated successfully!', 'success');
        }
    }

    // Delete a transaction
    deleteTransaction(id) {
        const transaction = this.getTransaction(id);
        if (confirm(`Delete "${transaction.description}"?`)) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveToStorage();
            this.renderTransactions();
            this.updateStats();
            this.showNotification('Transaction deleted successfully!', 'danger');
        }
    }

    // Clear all transactions
    clearAllTransactions() {
        if (this.transactions.length === 0) {
            alert('No transactions to clear!');
            return;
        }

        if (confirm('Are you sure you want to delete ALL transactions? This action cannot be undone!')) {
            this.transactions = [];
            this.saveToStorage();
            this.renderTransactions();
            this.updateStats();
            this.showNotification('All transactions cleared!', 'danger');
        }
    }

    // Render transactions list
    renderTransactions() {
        const filterType = document.getElementById('filterType').value;
        const transactionsList = document.getElementById('transactionsList');

        // Filter transactions based on selected filter
        let filteredTransactions = this.transactions;
        if (filterType !== 'all') {
            filteredTransactions = this.transactions.filter(t => t.type === filterType);
        }

        // Sort by date (newest first)
        filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredTransactions.length === 0) {
            transactionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No transactions found</p>
                    <small>${filterType === 'all' ? 'Add your first transaction to get started!' : `No ${filterType} transactions found.`}</small>
                </div>
            `;
            return;
        }

        transactionsList.innerHTML = filteredTransactions.map(transaction => this.createTransactionHTML(transaction)).join('');

        // Add event listeners to action buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.editTransaction(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteTransaction(btn.dataset.id));
        });
    }

    // Create HTML for a single transaction
    createTransactionHTML(transaction) {
        const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const amountPrefix = transaction.type === 'income' ? '+' : '-';
        const formattedAmount = `${amountPrefix}$${Math.abs(transaction.amount).toFixed(2)}`;

        const categoryIcons = {
            'Food': '🍔',
            'Transport': '🚗',
            'Entertainment': '🎬',
            'Shopping': '🛍️',
            'Bills': '💡',
            'Healthcare': '🏥',
            'Education': '📚',
            'Salary': '💼',
            'Business': '💰',
            'Other': '📌'
        };

        return `
            <div class="transaction-item ${transaction.type}">
                <div class="transaction-info">
                    <div class="transaction-icon">
                        <i class="fas fa-${transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}"></i>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-description">${this.escapeHtml(transaction.description)}</div>
                        <div class="transaction-meta">
                            <span class="transaction-category">
                                <span>${categoryIcons[transaction.category] || '📌'}</span>
                                ${transaction.category}
                            </span>
                            <span class="transaction-date">
                                <i class="fas fa-calendar"></i>
                                ${formattedDate}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="transaction-amount">${formattedAmount}</div>
                <div class="transaction-actions">
                    <button class="action-btn edit-btn" data-id="${transaction.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${transaction.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Edit transaction - populate form with transaction data
    editTransaction(id) {
        const transaction = this.getTransaction(id);
        if (!transaction) return;

        document.getElementById('editId').value = transaction.id;
        document.getElementById('description').value = transaction.description;
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('category').value = transaction.category;
        document.getElementById('date').value = transaction.date;
        document.querySelector(`input[name="type"][value="${transaction.type}"]`).checked = true;

        // Update form UI
        document.getElementById('formTitle').textContent = 'Edit Transaction';
        document.getElementById('submitBtnText').textContent = 'Update Transaction';
        document.getElementById('cancelBtn').style.display = 'block';

        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Cancel edit mode
    cancelEdit() {
        this.resetForm();
    }

    // Reset form to default state
    resetForm() {
        document.getElementById('transactionForm').reset();
        document.getElementById('editId').value = '';
        document.getElementById('formTitle').textContent = 'Add New Transaction';
        document.getElementById('submitBtnText').textContent = 'Add Transaction';
        document.getElementById('cancelBtn').style.display = 'none';
        this.setDefaultDate();
    }

    // Update statistics (balance, income, expense)
    updateStats() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expense;

        document.getElementById('totalBalance').textContent = `$${balance.toFixed(2)}`;
        document.getElementById('totalIncome').textContent = `$${income.toFixed(2)}`;
        document.getElementById('totalExpense').textContent = `$${expense.toFixed(2)}`;

        // Update balance color based on positive/negative
        const balanceElement = document.getElementById('totalBalance');
        if (balance > 0) {
            balanceElement.style.color = 'var(--success-color)';
        } else if (balance < 0) {
            balanceElement.style.color = 'var(--danger-color)';
        } else {
            balanceElement.style.color = 'var(--text-primary)';
        }
    }

    // Show notification
    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
            color: white;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ExpenseTracker();
});
