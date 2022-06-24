import styled from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Button, Slider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const ImageCropModalContainer = styled(ModalContainer)`
  width: 50%;
  min-width: 400px;
  height: 60%;
  z-index: 201;
  position: absolute;
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
`;

export const ModalButtons = styled.div`
  display: flex;
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

export const CropperContainer = styled.div`
  position: relative;
  height: 70%;
  button {
    position: absolute;
    bottom: -20%;
  }
`;

export const ZoomSlider = styled(Slider)`
  position: absolute;
  bottom: -10%;
  width: 60%;
  left: 20%;
`;
