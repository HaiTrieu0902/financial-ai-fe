import { notFound } from 'next/navigation';

export default {
  // Navigation
  navigation: {
    home: 'Home',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
  },
  // Landing Page
  landing: {
    title: 'Smart Personal Finance Management',
    subtitle: 'Manage your finances intelligently with AI-powered insights',
    features: {
      budgeting: 'Smart Budgeting',
      expenses: 'Expense Tracking',
      goals: 'Financial Goals',
      aiChat: 'AI Financial Assistant',
    },
    cta: {
      getStarted: 'Get Started',
      learnMore: 'Learn More',
    },
  },
  // Authentication
  auth: {
    login: {
      title: 'Login to Your Account',
      email: 'Email',
      password: 'Password',
      submit: 'Login',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      invalid: 'Invalid email or password or account not found',
      success: 'Login successful! Redirecting to dashboard...',
    },
    register: {
      title: 'Create Your Account',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      submit: 'Register',
      hasAccount: 'Already have an account?',
      signIn: 'Sign in',
    },
  },
  // Dashboard
  dashboard: {
    welcome: 'Welcome back',
    overview: 'Financial Overview',
    totalBalance: 'Total Balance',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses',
    savings: 'Savings',
    recentTransactions: 'Recent Transactions',
    quickActions: 'Quick Actions',
    addTransaction: 'Add Transaction',
    setGoal: 'Set Goal',
    viewReports: 'View Reports',
  },
  // Chat
  chat: {
    title: 'AI Financial Assistant',
    placeholder: 'Ask me anything about your finances...',
    send: 'Send',
    examples: {
      budgetHelp: 'How can I create a better budget?',
      savingTips: 'Give me tips for saving money',
      investmentAdvice: 'What should I know about investing?',
    },
  },
  // Common
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    logout: 'Logout',
    edit: 'Edit',
    close: 'Close',
    deleting: 'Deleting...',
    creating: 'Creating...',
    updating: 'Updating...',
    add: 'Add',
    update: 'Update',
  },

  // user profile
  user: {
    message: {
      failedToLoadUserProfile: 'Failed to load user profile. Please try again.',
      profileUpdated: 'Profile updated successfully.',
      profileUpdateFailed: 'Failed to update profile. Please check your input.',
      deleteUserError: 'Failed to delete user account. Please try again.',
      doYouWantToDelete:
        'Are you sure you want to delete your account? This action cannot be undone. All your data including accountsand transactions will be permanently removed.',
    },
  },

  account: {
    title: {
      accountManagement: 'Account Management',
      totalBalance: 'Total Balance',
      across: 'Across',
      account: 'account',
      name: 'Account Name',
      initialBalance: 'Initial Balance',
    },
    message: {
      notFound: 'Account not found.',
      createfirstToGetStarted: 'Create your first account to get started.',
      accountCreated: 'Account created successfully.',
      accountCreationFailed: 'Failed to create account. Please check your input.',
      accountUpdated: 'Account updated successfully.',
      accountUpdateFailed: 'Failed to update account. Please try again.',
      accountDeleted: 'Account deleted successfully.',
      accountDeletionFailed: 'Failed to delete account. Please try again.',
    },
  },
};
