import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { fetchTransactions, createTransaction as createTransactionAPI } from '../services/transactions';

interface Transactions {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionInputProps = Omit<Transactions, 'id' | 'createdAt'>;

interface TransactionContextDataProps {
  transactions: Transactions[];
  createTransaction: (transactions: TransactionInputProps) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextDataProps>(
  {} as TransactionContextDataProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    async function fetchData() {
      const transactionsData = await fetchTransactions();
      setTransactions(transactionsData);
    }

    fetchData();
  }, []);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const newTransaction = await createTransactionAPI(transactionInput);
    setTransactions([...transactions, newTransaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
