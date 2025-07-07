export const KEY_LOCALSTORAGE_SYNC = {
  token: '@access_token',
  user: '@user',
};

export const TRANSACTION_CATEGORIES = {
  INCOME: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
  EXPENSE: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Other Expense'],
};

export const BUDGET_PERIODS = ['monthly', 'weekly', 'yearly'] as const;

export const GOAL_CATEGORIES = ['Emergency Fund', 'Vacation', 'Home Purchase', 'Car Purchase', 'Retirement', 'Education', 'Investment', 'Other'];

export const CURRENCY_FORMAT = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const DATE_FORMAT = 'MMM dd, yyyy';
