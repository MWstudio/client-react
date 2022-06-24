import styled, { css } from 'styled-components';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

export const SignUpTemplate = styled.div`
  width: 100%;
  height: 100%;
  z-index: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const Container = styled(Card)`
  width: 35rem;
  height: 35rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 5rem;
    height: 5rem;
    margin: 2rem 0;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 70%auto;
    & > * {
      margin: 0.4rem 0;
    }
    .error-message {
      color: #bf1650;
    }
    button {
      margin: 0 auto;
    }
  }
`;
