import styled, { css } from 'styled-components';

export const Container = styled.aside`
  height: 100%;
  ${({ widthOverTabletLandScape }) => {
    if (widthOverTabletLandScape) {
      return css`
        width: 350px;
        // margin-right: 1rem;
      `;
    } else {
      return css`
        display: none;
      `;
    }
  }}
`;
