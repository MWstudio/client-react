import React, { useState, useRef } from 'react';

const usePopover = () => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);

  const handleOpen = e => {
    anchorEl.current = e.currentTarget;
    setOpen(true);
  };

  const handleClose = e => {
    setOpen(false);
  };

  return [anchorEl, open, handleOpen, handleClose];
};

export default usePopover;

/* 
  anchorEl은 click혹은 hover 시키려는 애 위에 ref로
  open은 popover의 open
  handleOpen, handleClose는 프로필 페이지 참조
*/
