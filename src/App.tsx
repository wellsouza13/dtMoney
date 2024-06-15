import { useState } from "react";
import { DashBoard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

import Modal from "react-modal";
import { NewTransactionsModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransaction";
import { LoginModal } from "./components/LoginModal";

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] =
    useState(false);

  function handleTransactionsModal() {
    setIsNewTransactionModalOpen(!isNewTransactionModalOpen);
  }

  function handleLoginModal() {
    setIsLoginModalOpen(!isLoginModalOpen);
  }

  return (
    <TransactionsProvider>
      <Header onTransactionModal={handleTransactionsModal} onLoginModal={handleLoginModal} />
      <DashBoard />
      <NewTransactionsModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleTransactionsModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
