// components/Login.tsx
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
`;

const LoginForm = styled.div`
  background: var(--shape);
  padding: 2rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: var(--text-title);
    margin-bottom: 1rem;
  }

  button {
    padding: 0.75rem;
    border-radius: 0.25rem;
    border: 0;
    background: var(--blue);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <Container>
      <LoginForm>
        <h2>Login</h2>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </LoginForm>
    </Container>
  );
};

export default Login;
