import { Account, AccountResponse } from '@/interface/account.interface';
import client from '.';

class AccountApiService {
  // Account endpoints
  async createAccount(account: Account): Promise<AccountResponse> {
    const response = await client.post<AccountResponse>('/accounts', account);
    return response.data;
  }

  async getAccounts(userId: string): Promise<AccountResponse[]> {
    const response = await client.get<AccountResponse[]>('/accounts', {
      params: { userId },
    });
    return response.data;
  }

  async getMyAccount(): Promise<AccountResponse[]> {
    const response = await client.get<AccountResponse[]>('/accounts/my-accounts');
    return response.data;
  }

  async getTotalBalance(currency: string): Promise<{ totalBalance: number }> {
    const response = await client.get<{ totalBalance: number }>('/accounts/total-balance', {
      params: { currency },
    });
    return response.data;
  }

  async getAccountDetail(id: string): Promise<AccountResponse[]> {
    const response = await client.get<AccountResponse[]>(`/accounts/${id}`);
    return response.data;
  }

  async updateAccount(id: string): Promise<AccountResponse> {
    const response = await client.patch<AccountResponse>(`/accounts/${id}`);
    return response.data;
  }

  async deleteAccount(id: string): Promise<void> {
    await client.delete(`/accounts/${id}`);
  }
}

export const accountApiService = new AccountApiService();
