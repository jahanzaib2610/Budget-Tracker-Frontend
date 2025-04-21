import axios from 'axios';

const API_BASE_URL = 'https://backend-budget-tracker.vercel.app/';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  async fetchTransactions() {
    try {
      const response = await axiosInstance.get('/api/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error.response?.data || error.message;
    }
  },

  async addTransaction(transaction) {
    try {
        console.log(transaction);
      const response = await axiosInstance.post('/api/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error.response?.data || error.message;
    }
  },

  async deleteTransaction(id) {
    try {
      await axiosInstance.delete(`/api/transactions/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error.response?.data || error.message;
    }
  },
}; 