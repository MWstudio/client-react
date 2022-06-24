import styled from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const LoginModalContainer = styled(ModalContainer)`
  width: 30%;
  min-width: 400px;
  height: 70%;
  min-height: 70%;
  @media only screen and (max-width: ${size.TabletPortrait}) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  width: 100%;
  padding-bottom: 2%;
  border-bottom: 1px solid rgb(0, 0, 0, 0.06);
  background-color: white;
  z-index: 110;
`;

export const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  width: 35px;
  margin-right: 30px;
  transition: all 400ms;
  position: absolute;
  left: 0;
  &:hover {
    transform: rotate(90deg);
  }
`;

export const ModalLogo = styled.div`
  height: 100%;
  width: 2.2rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const LoginFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  label {
    margin: 0.5rem;
  }
`;

export const FormButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  margin: 0.4rem 0;
  p {
    margin: 0.2rem 0;
    color: rgb(0, 0, 0, 0.24);
    font-size: 0.6rem;
  }
`;

export const SignButton = styled(Button)`
  margin: 0.3rem 0;
`;
