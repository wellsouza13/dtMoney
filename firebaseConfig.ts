// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJf8TlxkW8wr44knr0WmyhRSUVWLpXoKg",
    authDomain: "dt-money-43275.firebaseapp.com",
    projectId: "dt-money-43275",
    storageBucket: "dt-money-43275.appspot.com",
    messagingSenderId: "31169185509",
    appId: "1:31169185509:web:3799d383b874bb4f4b760c"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
