import styled, { css } from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Button, ButtonBase, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';
import { lightGreen } from '@material-ui/core/colors';

export const GameAccountModalContainer = styled(ModalContainer)`
  width: 60%;
  min-width: 400px;
  height: 70%;
  z-index: 101;
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
  justify-content: space-between;
  margin-bottom: 0.5rem;
  .title {
    //프로필 업데이터
    text-align: center;
    margin: 0;
  }
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

export const SaveButton = styled(Button)`
  border-radius: 2rem;
  padding: 0.3rem;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameConnnectGuide = styled.div`
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

export const GameConnection = styled.div``;

// droppable
export const EnrolledGameBackground = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  ${({ isDraggingOver }) => {
    if (isDraggingOver) {
      return css`
        background: rgb(0, 0, 0, 0.06);
      `;
    }
  }}
`;

//draggable
export const EnrolledGame = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  user-select: none;
  height: 22%;
  margin: 0.1rem 0;
  border: 1px solid black;
  border-radius: 4px;
  cursor: auto;
  ${({ isDragging }) => {
    if (isDragging) {
      return css`
        border: 1px solid red;
      `;
    }
  }}
  .game {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .description {
    img {
      width: 2rem;
      height: 2rem;
    }
  }
  .account {
    display: flex;
    flex-wrap: wrap;
  }
  /* &:hover {
    background-color: rgb(0, 0, 0, 0.12);
  } */
`;

export const AccountChip = styled(ButtonBase)`
  border: 1px solid rgb(0, 0, 0, 0.36);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.2rem 0.6rem;
  margin: 0.4rem;
  cursor: pointer;
  font-size: 1rem;
  span {
    padding: 0 0.1rem;
  }
  svg {
    transform: scale(0.8);
  }
`;
