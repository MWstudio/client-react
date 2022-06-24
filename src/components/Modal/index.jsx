import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import useModalClose from 'hooks/useModalClose';
import { ModalBackground, Dimmed, DoubleDimmed } from './styles';

/* portal 생성기 */
const ModalPortal = ({ children }) => {
  return ReactDOM.createPortal(children, document.getElementById('modal'));
};
/* ------------ */

const Modal = ({ children, closeModal }) => {
  useModalClose(closeModal); // 모달 닫을 수 있는 로직 모아둔 hook

  /* 현재 열려 있는 모달 갯수에 따라 다른 dim 제공 */

  const modalState = useSelector(state => state.modal);
  // modal state 내에서 true인 state가 2개인 순간 이미 하나가 열렸다는 의미니깐.
  if (Object.values(modalState).filter(state => state === true).length >= 2) {
    // 이미 열려있는 모달 창이 있으면 doubleDimmed
    return (
      <ModalPortal>
        <ModalBackground className="modalspace">
          <DoubleDimmed onClick={closeModal} className="dimmed" />
          {children}
        </ModalBackground>
      </ModalPortal>
    );
  } else {
    return (
      <ModalPortal>
        <ModalBackground className="modalspace">
          <Dimmed onClick={closeModal} className="dimmed" />
          {children}
        </ModalBackground>
      </ModalPortal>
    );
  }
};

// useCloseModal을 사용하지 않는 (esc키 없고 회색화면 클릭해도 안 닫히는)
export const SolidModal = ({ children }) => {
  /* 현재 열려 있는 모달 갯수에 따라 다른 dim 제공 */

  const modalState = useSelector(state => state.modal);
  // modal state 내에서 true인 state가 2개인 순간 이미 하나가 열렸다는 의미니깐.
  if (Object.values(modalState).filter(state => state === true).length >= 2) {
    // 이미 열려있는 모달 창이 있으면 doubleDimmed
    return (
      <ModalPortal>
        <ModalBackground className="modalspace">
          <DoubleDimmed className="dimmed" />
          {children}
        </ModalBackground>
      </ModalPortal>
    );
  } else {
    return (
      <ModalPortal>
        <ModalBackground className="modalspace">
          <Dimmed className="dimmed" />
          {children}
        </ModalBackground>
      </ModalPortal>
    );
  }
};

export default Modal;
