import styled from 'styled-components';
import { size } from 'styles/variables';

// 전체 화면
export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

// 전체화면이지만 modal container 밖, 검은색 색깔 칠해진 박스
export const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const DoubleDimmed = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.6);
  z-index: 200;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalContainer = styled.div`
  z-index: 101;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  transition: all 300ms;
`;
