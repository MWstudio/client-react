import React from 'react';
import { PopoverContainer } from './styles';
import usePopover from 'hooks/usePopover';

const Popover = (children, e) => {
  usePopover(e);
  return (
    <>
      <PopoverContainer>{children}</PopoverContainer>
    </>
  );
};

export default Popover;
