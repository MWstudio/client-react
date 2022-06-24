import styled from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Button, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const AccountEnrollmentModalContainer = styled(ModalContainer)`
  width: 50%;
  min-width: 400px;
  height: 70%;
  z-index: 201;
  position: absolute;
  @media only screen and (max-width: ${size.TabletPortrait}) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const ModalButtons = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  .title {
    //프로필 업데이터
    text-align: center;
    margin: 0;
  }
`;

export const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  left: 0;
  width: 35px;
  margin-right: 30px;
  transition: all 400ms;
  &:hover {
    transform: rotate(90deg);
  }
`;

export const SaveButton = styled(Button)`
  border-radius: 2rem;
  padding: 0.3rem;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameSearchGuide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  .guide {
    display: flex;
    flex-direction: column;
  }
  .connection {
    cursor: pointer;
    color: red;
  }
`;

// 게임 search
export const GameSearchBox = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 2rem;
  width: 100%;
  .MuiInputBase-root {
    width: 95%;
  }
  input {
    width: 100%;
    padding: 0.3rem;
  }
  hr {
    // Divider styling
    height: 2rem;
  }
`;

export const GameRecommendationGuide = styled.div`
  .guide {
    display: flex;
    flex-direction: column;
  }
`;

export const GameRecommendation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .row {
    width: 60%;
    display: flex;
    div {
      // columnn
      width: 40%;
      margin: 1rem;
      &:hover {
        color: red;
      }
    }
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

export const AddNewGameStepContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 11rem;
    .image-border {
      position: relative;
      width: 9rem;
      height: 9rem;
      border: 1px solid rgb(0, 0, 0, 0.12);
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .photo-icon {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
  .detail-input {
    display: flex;
    flex-direction: column;
    .MuiFormControl-root {
      margin: 1rem 0;
    }
  }
`;

export const AddNewAccountStepContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  .detail-input {
    display: flex;
    flex-direction: column;
    .MuiFormControl-root {
      margin: 1rem 0;
    }
  }
`;
