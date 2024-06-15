import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface HeaderProps {
  onTransactionModal: () => void;
  onLoginModal: () => void;
}

export function Header({ onTransactionModal, onLoginModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onTransactionModal}>
          Nova Transação
        </button>
        <button type="button" onClick={onLoginModal}>
          Login
        </button>
      </Content>
    </Container>
  );
}
