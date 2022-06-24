import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from 'styles/variables';
import { ModalContainer } from 'components/Modal/styles';
import { Paper, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const UserSignupModalContainer = styled(ModalContainer)`
  width: 35%;
  min-width: 400px;
  max-height: 70%;
  min-height: 50%;
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
  justify-content: space-between;
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
  position: absolute;
  left: 0;
  cursor: pointer;
  width: 35px;
  margin-right: 30px;
  transition: all 400ms;
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

export const SignupContent = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  form {
    width: 60%;
    min-width: 320px;
  }
`;

export const InputGameStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 80%;
  // input의 label
  .input-label {
    margin: 1rem 0;
  }
  // input 내부의 label
  .MuiFormLabel-root {
    background-color: white;
    padding: 0 0.2rem 0.2rem 0.2rem;
  }
  // 에러 메시지
  .error-explain {
    color: red;
  }
`;

export const InputTitleStepContainer = styled.div`
  width: 100%;
  height: 80%;
  .selected {
    display: flex;
    justify-content: start;
    align-items: center;
    div {
      color: #ffffff;
      background: ${primaryColor};
      font-size: 12px;
      padding: 5px;
      padding-left: 7px;
      padding-right: 7px;
      border-radius: 10px;
      margin-right: 10px;
    }
  }
  .input-label {
    margin: 1rem 0;
  }
  .MuiFormLabel-root {
    background-color: white;
    padding: 0 0.2rem 0.2rem 0.2rem;
  }
  .error-explain {
    color: red;
  }
  .MicWithCapacity {
    display: flex;
    justify-content: space-between;
  }
`;

export const StepButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 3rem 0;
`;

export const StepButton = styled(Button)`
  border-radius: 2rem;
  padding: 0.5rem 2rem;
`;
