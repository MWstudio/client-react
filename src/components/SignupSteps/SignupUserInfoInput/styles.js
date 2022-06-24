import styled from 'styled-components';

export const BirthContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BirthWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > span {
    color: red;
    padding-left: 0.8rem;
  }
  // birth year div
  &:nth-child(1) {
    margin-right: 1rem;
  }
  // birth month div
  &:nth-child(2) {
    margin: 0 1rem;
  }
  // birth day div
  &:nth-child(3) {
    margin-left: 1rem;
  }
`;
