import React, { useState } from "react";
import { DashBoard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

import Modal from "react-modal";
import { NewTransactionsModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransaction";
import firebaseApp from './firebaseConfig';

Modal.setAppElement("#root");

function App() {
  console.log(firebaseApp);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleTransactionsModal() {
    setIsNewTransactionModalOpen(!isNewTransactionModalOpen);
  }

  return (
    <TransactionsProvider>
      <Header onTransactionModal={handleTransactionsModal} />
      <DashBoard />
      <NewTransactionsModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleTransactionsModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}

export default App;
