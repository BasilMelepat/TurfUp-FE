import { useState, useEffect } from "react";
import axiosInstance from "../useAxiosInstance";

const useTransactionData = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/admin/transactions");
        const result = response.data;
        // Ensure transaction.user and transaction.turf are not null before setting transactions
        const filteredTransactions = result.transactions.filter(transaction => transaction.user !== null && transaction.turf !== null);
        setTransactions(filteredTransactions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useTransactionData;