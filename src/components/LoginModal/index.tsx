import { useState } from "react";
import Modal from "react-modal";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import closeImg from "../../assets/close.svg";
// import googleImg from "../../assets/google.svg";
import { Container, AuthButton } from "./styles";
import { provider } from "../../firebaseConfig";

interface LoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function LoginModal({ isOpen, onRequestClose }: LoginModalProps) {
    const [loading, setLoading] = useState(false);
    const auth = getAuth();

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            onRequestClose(); // Fechar o modal após o login
        } catch (error) {
            console.error("Erro ao fazer login com o Google", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container>
                <h2>Login</h2>
                <AuthButton onClick={handleGoogleSignIn} disabled={loading}>
                    {/* <img src={googleImg} alt="Google Logo" /> */}
                    {loading ? "Carregando..." : "Login com Google"}
                </AuthButton>
            </Container>
        </Modal>
    );
}
