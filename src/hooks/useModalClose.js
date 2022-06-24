import React, { useEffect } from 'react';

const useModalClose = closeModal => {
  // ESC key 누르면 닫기
  useEffect(() => {
    const closeWithESC = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeWithESC);
    return () => window.removeEventListener('keydown', closeWithESC);
  }, []);

  // modal 창 열리면 외부 scroll 금지
  useEffect(() => {
    document.body.style.cssText = "overflow: 'hidden'";
    return () => (document.body.style.cssText = "overflow :'unset'");
  }, []);

  return;
};

export default useModalClose;
