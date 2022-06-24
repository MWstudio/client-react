import React, { useState } from 'react';

const useOpenCloseTrigger = () => {
  const [modalState, setModalState] = useState(false);

  const handleState = () => {
    setModalState(prev => !prev);
  };

  return [modalState, handleState];
};

export default useOpenCloseTrigger;
