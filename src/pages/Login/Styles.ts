import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

export const LoginForm = styled.div`
  background: var(--shape);
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: var(--text-title);
    margin-bottom: 1rem;
  }

  button {
    padding: 0.75rem 1rem;
    border-radius: 0.25rem;
    border: 0;
    background: #4285f4;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: #357ae8;
    }

    svg {
      background: #fff;
      border-radius: 50%;
      padding: 0.2rem;
    }
  }
`;

export const Logo = styled.div`
  width: 173px;
  height: 40px;
  margin-bottom: 2rem;
  display: flex ;
  align-items: center ;
  align-self: end;

  svg {
    width: 100%;
    height: 100%;
  }
`;