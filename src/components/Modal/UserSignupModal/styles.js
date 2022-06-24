import styled from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Paper, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const UserSignupModalContainer = styled(ModalContainer)`
  width: 35%;
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

export const InputUserDataStepContainer = styled.div`
  width: 100%;
  height: 80%;
  // input의 label
  .input-label {
    margin: 1rem 0;
  }
  // 생년월일 가로 배치
  .birth-input {
    display: flex;
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
  //생년월일 에러 메시지 모음
  .birth-errors {
    display: flex;
    flex-direction: column;
  }
  // input number 옆에 화살표 안 보이게
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const EmailValidationStepContainer = styled.div`
  width: 100%;
  height: 80%;
  .MuiFormGroup-root {
    display: flex;
  }
  // input number 옆에 화살표 안 보이게
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const InputNicknameStepContainer = styled.div`
  width: 100%;
  height: 80%;
  .header {
    h6 {
      font-size: 20px;
      margin: 0;
    }
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
  .image {
    width: 30%;
    margin: 0 auto;
    margin-bottom: 1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .guide {
    margin-bottom: 1rem;
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
