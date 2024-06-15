import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Transactions {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInputProps = Omit<Transactions, 'id' | 'createdAt'>;

export async function fetchTransactions(): Promise<Transactions[]> {
  const querySnapshot = await getDocs(collection(db, 'transactions'));
  const transactionsData = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Transactions[];
  return transactionsData;
}

export async function createTransaction(transactionInput: TransactionInputProps): Promise<Transactions> {
  const docRef = await addDoc(collection(db, 'transactions'), {
    ...transactionInput,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...transactionInput, createdAt: new Date().toISOString() };
}
