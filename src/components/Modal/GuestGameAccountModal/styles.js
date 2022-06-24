import styled from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Paper, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const GuestSignupModalContainer = styled(ModalContainer)`
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
  justify-content: space-between;
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
  &:hover {
    transform: rotate(90deg);
  }
`;

export const LinkToSignupButton = styled(Button)`
  border-radius: 2rem;
  padding: 0.3rem 0.4rem;
`;

export const ModalLogo = styled.div`
  height: 100%;
  width: 2.2rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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

/* 닉네임 적어주는 칸*/
export const InputNicknameStepContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
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

export const InputGameAccountStepContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  .header {
    h6 {
      margin: 0;
      font-size: 20px;
    }
    .MuiLink-root {
      cursor: pointer;
      &:hover {
        text-decoration: none;
        color: red;
      }
    }
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .image {
    width: 30%;
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

export const CheckResultStepContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  .header {
    h6 {
      margin: 0;
      font-size: 20px;
    }
    .MuiLink-root {
      cursor: pointer;
      &:hover {
        text-decoration: none;
        color: red;
      }
    }
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .guest {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .guest-image {
      width: 3rem;
      height: 3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .guest-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 0 1rem;
      h6 {
        margin: 0;
      }
    }
  }
`;
