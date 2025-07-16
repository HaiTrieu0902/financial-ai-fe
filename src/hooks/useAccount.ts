import { useState, useCallback } from 'react';
import { Account, AccountResponse } from '@/interface/account.interface';
import { accountApiService } from '@/service/api/account.api';

export interface UseAccountReturn {
  accounts: AccountResponse[];
  totalBalance: number;
  loading: boolean;
  error: string | null;
  createAccount: (account: Account) => Promise<void>;
  getMyAccounts: () => Promise<void>;
  getTotalBalance: (currency: string) => Promise<void>;
  getAccountDetail: (id: string) => Promise<AccountResponse[]>;
  updateAccount: (id: string) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  refreshAccounts: () => Promise<void>;
}

export function useAccount(): UseAccountReturn {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = useCallback(async (account: Account) => {
    try {
      setLoading(true);
      setError(null);
      const newAccount = await accountApiService.createAccount(account);
      setAccounts((prev) => [...prev, newAccount]);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const accountsData = await accountApiService.getMyAccount();
      setAccounts(accountsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch accounts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTotalBalance = useCallback(async (currency: string) => {
    try {
      setLoading(true);
      setError(null);
      const balanceData = await accountApiService.getTotalBalance(currency);
      setTotalBalance(balanceData.totalBalance);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch total balance');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAccountDetail = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const accountDetail = await accountApiService.getAccountDetail(id);
      return accountDetail;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch account detail');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAccount = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAccount = await accountApiService.updateAccount(id);
      setAccounts((prev) => prev.map((account) => (account.id === id ? updatedAccount : account)));
    } catch (err: any) {
      setError(err.message || 'Failed to update account');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await accountApiService.deleteAccount(id);
      setAccounts((prev) => prev.filter((account) => account.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete account');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAccounts = useCallback(async () => {
    await getMyAccounts();
  }, [getMyAccounts]);

  return {
    accounts,
    totalBalance,
    loading,
    error,
    createAccount,
    getMyAccounts,
    getTotalBalance,
    getAccountDetail,
    updateAccount,
    deleteAccount,
    refreshAccounts,
  };
}
