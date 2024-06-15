import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

interface Transactions {
  id: string; // Ajuste o tipo do ID para string, conforme necessário para o Firestore
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
  createTransaction: (transactionInput: TransactionInputProps) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextDataProps>(
  {} as TransactionContextDataProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const transactionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Transactions[];
      setTransactions(transactionsData);
    }

    fetchTransactions();
  }, []);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transactionInput,
      createdAt: new Date().toISOString(),
    });
    const newTransaction = { id: docRef.id, ...transactionInput, createdAt: new Date().toISOString() };
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
