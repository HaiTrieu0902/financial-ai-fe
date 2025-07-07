import { Transaction, Budget, FinancialGoal, User, FinancialSummary } from '@/interface/types';
import { generateId } from '@/utils';

// Mock data storage (in a real app, this would be a database)
let users: User[] = [
  // Default test user for easy login
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    createdAt: new Date('2024-01-01'),
  },
];
let transactions: Transaction[] = [];
let budgets: Budget[] = [];
let goals: FinancialGoal[] = [];

// Current user (persisted in localStorage)
let currentUser: User | null = null;

// Initialize current user from localStorage
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
    } catch (error) {
      console.error('Error parsing saved user:', error);
      localStorage.removeItem('currentUser');
    }
  }
}

class MockDataService {
  // User Authentication
  async login(email: string, password: string): Promise<User | null> {
    console.log('MockDataService login attempt:', { email, password });
    console.log('Available users:', users);

    // For demo purposes, accept any non-empty password
    if (!password || password.trim() === '') {
      console.log('Login failed: empty password');
      return null;
    }

    const user = users.find((u) => u.email === email);
    console.log('Found user:', user);

    if (user) {
      currentUser = user;
      // Persist user in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('User saved to localStorage');
      }
      return user;
    }
    console.log('Login failed: user not found');
    return null;
  }

  async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date(),
    };
    users.push(newUser);
    currentUser = newUser;
    // Persist user in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    return newUser;
  }

  getCurrentUser(): User | null {
    return currentUser;
  }

  logout(): void {
    currentUser = null;
    // Remove user from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  // Transactions
  async getTransactions(userId: string): Promise<Transaction[]> {
    return transactions.filter((t) => t.userId === userId);
  }

  async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
    };
    transactions.push(newTransaction);
    return newTransaction;
  }

  async deleteTransaction(id: string): Promise<void> {
    transactions = transactions.filter((t) => t.id !== id);
  }

  // Budgets
  async getBudgets(userId: string): Promise<Budget[]> {
    return budgets.filter((b) => b.userId === userId);
  }

  async addBudget(budget: Omit<Budget, 'id'>): Promise<Budget> {
    const newBudget: Budget = {
      ...budget,
      id: generateId(),
    };
    budgets.push(newBudget);
    return newBudget;
  }

  // Goals
  async getGoals(userId: string): Promise<FinancialGoal[]> {
    return goals.filter((g) => g.userId === userId);
  }

  async addGoal(goal: Omit<FinancialGoal, 'id'>): Promise<FinancialGoal> {
    const newGoal: FinancialGoal = {
      ...goal,
      id: generateId(),
    };
    goals.push(newGoal);
    return newGoal;
  }

  // Financial Summary
  async getFinancialSummary(userId: string): Promise<FinancialSummary> {
    const userTransactions = await this.getTransactions(userId);

    const income = userTransactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

    const expenses = userTransactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = income - expenses;
    const savings = totalBalance * 0.2; // Assume 20% savings rate
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    return {
      totalBalance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      savings,
      savingsRate,
    };
  }

  // Initialize with some sample data
  initializeSampleData(): void {
    if (users.length === 0) {
      // Create sample user
      const sampleUser: User = {
        id: 'user-1',
        email: 'demo@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: new Date(),
      };
      users.push(sampleUser);

      // Create sample transactions
      const sampleTransactions: Transaction[] = [
        {
          id: 'trans-1',
          amount: 5000,
          type: 'income',
          category: 'Salary',
          description: 'Monthly salary',
          date: new Date(),
          userId: 'user-1',
        },
        {
          id: 'trans-2',
          amount: 1200,
          type: 'expense',
          category: 'Food & Dining',
          description: 'Groceries and restaurants',
          date: new Date(),
          userId: 'user-1',
        },
        {
          id: 'trans-3',
          amount: 800,
          type: 'expense',
          category: 'Transportation',
          description: 'Car payment and gas',
          date: new Date(),
          userId: 'user-1',
        },
      ];
      transactions.push(...sampleTransactions);

      // Create sample budget
      const sampleBudget: Budget = {
        id: 'budget-1',
        category: 'Food & Dining',
        limit: 1500,
        spent: 1200,
        period: 'monthly',
        userId: 'user-1',
      };
      budgets.push(sampleBudget);

      // Create sample goal
      const sampleGoal: FinancialGoal = {
        id: 'goal-1',
        title: 'Emergency Fund',
        targetAmount: 10000,
        currentAmount: 2500,
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        category: 'Emergency Fund',
        userId: 'user-1',
      };
      goals.push(sampleGoal);
    }
  }
}

export const mockDataService = new MockDataService();

// Initialize sample data
mockDataService.initializeSampleData();
