import { useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onTransactionModal: () => void;
}

export function Header({ onTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
}
