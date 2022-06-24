import styled, { css } from 'styled-components';
import { ModalContainer } from 'components/Modal/styles';
import { Button, Chip, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { size } from 'styles/variables';

export const PersonalityUpdateModalContainer = styled(ModalContainer)`
  width: 60%;
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

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
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

export const BoxContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BoxLeft = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 60%;
  max-width: 60%;
  flex: 6;
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

// BoxRight
export const SelectedPersonality = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  min-height: 5.5rem;
  flex: 4;
`;

export const PersonalityTag = styled(Chip)`
  margin: 0.3rem;
`;

export const SelectedTagsGuide = styled.p`
  margin: 0.5rem auto;
  text-align: center;
`;

export const PersonalitySearchBox = styled.div`
  padding: 1rem;
`;

export const PersonalitySearchInputContainer = styled(Paper)`
  padding: 0 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // inputbase
  .MuiInputBase-root {
    width: 100%;
    padding-left: 1rem;
  }
  // search, add button
  .buttons {
    display: flex;
  }
`;

export const PersonalityTagsBox = styled.div`
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;
