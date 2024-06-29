// hooks/useTransaction.tsx
import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebaseConfig';

interface Transactions {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
  uid: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

type TransactionInputProps = Omit<Transactions, 'id' | 'createdAt' | 'uid'>;

interface TransactionContextDataProps {
  transactions: Transactions[];
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextDataProps>(
  {} as TransactionContextDataProps
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchTransactions() {
      if (user) {
        const q = query(collection(db, 'transactions'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
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
    }

    fetchTransactions();
  }, [user]);

  async function createTransaction(transactionInput: TransactionInputProps) {
    if (!user) return;

    const newTransaction = {
      ...transactionInput,
      createdAt: Timestamp.now(),
      uid: user.uid,
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
