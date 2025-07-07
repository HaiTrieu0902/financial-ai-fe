import { useState, useEffect } from 'react'
import { Transaction, FinancialSummary } from '@/interface/types'
import { mockDataService } from '@/service/mockData'

export const useFinancialData = (userId: string | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<FinancialSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const [transactionsData, summaryData] = await Promise.all([
          mockDataService.getTransactions(userId),
          mockDataService.getFinancialSummary(userId),
        ])
        setTransactions(transactionsData)
        setSummary(summaryData)
      } catch (error) {
        console.error('Error fetching financial data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!userId) return
    
    try {
      const newTransaction = await mockDataService.addTransaction(transaction)
      setTransactions(prev => [...prev, newTransaction])
      
      // Refresh summary
      const updatedSummary = await mockDataService.getFinancialSummary(userId)
      setSummary(updatedSummary)
    } catch (error) {
      console.error('Error adding transaction:', error)
    }
  }

  const deleteTransaction = async (transactionId: string) => {
    if (!userId) return
    
    try {
      await mockDataService.deleteTransaction(transactionId)
      setTransactions(prev => prev.filter(t => t.id !== transactionId))
      
      // Refresh summary
      const updatedSummary = await mockDataService.getFinancialSummary(userId)
      setSummary(updatedSummary)
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  return {
    transactions,
    summary,
    loading,
    addTransaction,
    deleteTransaction,
  }
}
