import styled, { css } from 'styled-components';
import { ButtonBase, Button, Paper } from '@material-ui/core';

export const Container = styled.nav`
  height: 100%;
  width: 250px;
  transition: 150ms all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // 1280 px 이상일 시
  ${({ widthOverTabletLandScape }) => {
    if (!widthOverTabletLandScape) {
      return css`
        width: 65px;
      `;
    }
  }}
  ${({ widthOverMobileLandScape }) => {
    if (!widthOverMobileLandScape) {
      return css`
        width: 0;
      `;
    }
  }}
  // 현재 라우팅
  .selected {
    ${({ theme }) => `
    color : ${theme.palette.primary.main};
  `}
  }
  .PrivateTabIndicator-colorSecondary-7 {
    background-color: white;
  }
`;

export const NavTabsContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.3rem 0;
  a {
    // navlink
    width: 100%;
    display: flex;
    justify-content: center;
  }
  hr {
    // divider
    width: 100%;
  }
`;

export const NavTab = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  font-size: 1.4rem;
  svg {
    transform: scale(1.4);
    margin-right: 1rem;
  }
  &:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

/* 아래 버튼 부분 */

export const ButtonContainer = styled.div`
  width: 90%;
  height: 8rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  font-size: ${props => (props.widthOverTabletLandScape ? '1.3rem' : '0.5rem')};
`;

export const QuickButton = styled(Button)`
  height: 3.3rem;
  margin-bottom: 1rem;
  .MuiButton-label {
    font-size: 1.3rem;
  }
`;
