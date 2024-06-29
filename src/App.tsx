// App.tsx
import React, { useState } from "react";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { NewTransactionsModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransaction";
import Routes from "./routes/routes";
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../firebaseConfig";

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  function handleTransactionsModal() {
    setIsNewTransactionModalOpen(!isNewTransactionModalOpen);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <TransactionsProvider>
        {user && (
          <>
            <Header onTransactionModal={handleTransactionsModal} />
            <NewTransactionsModal
              isOpen={isNewTransactionModalOpen}
              onRequestClose={handleTransactionsModal}
            />
          </>
        )}
        <GlobalStyle />
        <Routes />
      </TransactionsProvider>
    </Router>
  );
}

export default App;
