import styled from 'styled-components';
import { Popover } from '@material-ui/core';

export const PopoverContainer = styled(Popover)`
  z-index: 101;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  transition: all 300ms;
  .paper {
    width: 300px;
    height: 300px;
  }
`;
