import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

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
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextDataProps>(
  {} as TransactionContextDataProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    async function fetchTransactions() {
      const querySnapshot = await getDocs(collection(db, 'transactions'));
      const transactionsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate().toISOString(), 
        } as Transactions;
      });
      setTransactions(transactionsData);
    }

    fetchTransactions();
  }, []);

  async function createTransaction(transactionInput: TransactionInputProps) {
    const newTransaction = {
      ...transactionInput,
      createdAt: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { id: docRef.id, ...newTransaction, createdAt: newTransaction.createdAt.toDate().toISOString() },
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
