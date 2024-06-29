import logoImg from "../../assets/logo.svg";
import { ButtonContainer, Container, Content } from "./styles";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onTransactionModal: () => void;
}

export function Header({ onTransactionModal }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <ButtonContainer>
          <button type="button" onClick={onTransactionModal}>
            Nova Transação
          </button>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
