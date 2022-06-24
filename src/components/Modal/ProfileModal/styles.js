import styled, { css } from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const ProfileUpdateModalContainer = styled(ModalContainer)`
  width: 40%;
  min-width: 400px;
  height: 90%;
  @media only screen and (max-width: ${size.TabletPortrait}) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

export const MainContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 110;
  border-bottom: 1px solid rgb(0, 0, 0, 0.06);
  padding-bottom: 2%;
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

export const ProfileUpdateContainer = styled.div`
  & > * {
    margin: 0.8rem 0;
  }
`;

export const ProfileImage = styled.div`
  width: 9rem;
  height: 9rem;
  border: 1px solid black;
  position: relative;
  margin: 0.8rem auto;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
  }
  .photo-icon {
    position: absolute;
    left: 30%;
    top: 30%;
  }
`;

export const ProfileDescription = styled.div`
  & > * {
    margin: 0.8rem 0;
  }
`;
