import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navigation from 'components/Navigation';
import Modal, { SolidModal } from 'components/Modal';
import PersonalityUpdateModalContent from 'components/Modal/PersonalityModal';
import ProfileUpdateModalContent from 'components/Modal/ProfileModal';
import LoginModalContent from 'components/Modal/LoginModal';
import GuestSignupModalContent from 'components/Modal/GuestSignupModal';
import GuestGameAccountModalContent from 'components/Modal/GuestGameAccountModal';
import UserSignupModalContent from 'components/Modal/UserSignupModal';
import GameAccountModalContent from 'components/Modal/GameAccountModal';
import AccountEnrollmentModalContent from 'components/Modal/AccountEnrollmentModal';
import CreateRoomModalContent from 'components/Modal/CreateRoomModal';
import {
  triggerProfileUpdateModal,
  triggerPersonalityUpdateModal,
  triggerLoginModal,
  triggerCreateRoomModal,
  triggerGuestGameAccountModal,
} from 'store/modules/modal';
import { MainContainer, MainBackground } from './styles';

const BaseTemplate = ({ children }) => {
  /* 모달 창 오픈 여부*/
  const modalState = useSelector(state => state.modal);
  const dispatch = useDispatch();

  return (
    <MainContainer>
      <MainBackground>
        <Navigation />
        {children}
        {modalState.profileUpdate && (
          <Modal closeModal={() => dispatch(triggerProfileUpdateModal())}>
            <ProfileUpdateModalContent />
          </Modal>
        )}
        {/* profileUpdateModal 안에 imageCropModal, 부모에 의존적인 props있어서 redux나 context?*/}
        {modalState.personalityUpdate && (
          <Modal closeModal={() => dispatch(triggerPersonalityUpdateModal())}>
            <PersonalityUpdateModalContent />
          </Modal>
        )}
        {modalState.login && (
          <Modal closeModal={() => dispatch(triggerLoginModal())}>
            <LoginModalContent />
          </Modal>
        )}
        {modalState.guestSignup && (
          <SolidModal>
            <GuestSignupModalContent />
          </SolidModal>
        )}
        {modalState.guestGameAccount && (
          <Modal closeModal={() => dispatch(triggerGuestGameAccountModal())}>
            <GuestGameAccountModalContent />
          </Modal>
        )}
        {modalState.userSignup && (
          <SolidModal>
            <UserSignupModalContent />
          </SolidModal>
        )}
        {modalState.gameAccount && (
          <SolidModal>
            <GameAccountModalContent />
          </SolidModal>
        )}
        {modalState.accountEnrollment && (
          <SolidModal>
            <AccountEnrollmentModalContent />
          </SolidModal>
        )}
        {modalState.createRoom && (
          <Modal closeModal={() => dispatch(triggerCreateRoomModal())}>
            <CreateRoomModalContent />
          </Modal>
        )}
      </MainBackground>
    </MainContainer>
  );
};

export default BaseTemplate;
