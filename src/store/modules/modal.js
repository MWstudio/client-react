import { createSlice } from '@reduxjs/toolkit';

const name = 'modal';

const initialState = {
  login: false,
  profileUpdate: false,
  imageCrop: false,
  personalityUpdate: false,
  guestSignup: false,
  guestGameAccount: false,
  userSignup: false,
  gameAccount: false,
  accountEnrollment: false,
  createRoom: false,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    triggerLoginModal: (state, action) => {
      return { ...state, login: !state.login };
    },
    triggerProfileUpdateModal: (state, action) => {
      return { ...state, profileUpdate: !state.profileUpdate };
    },
    triggerImageCropModal: (state, action) => {
      return { ...state, imageCrop: !state.imageCrop };
    },
    triggerPersonalityUpdateModal: (state, action) => {
      return { ...state, personalityUpdate: !state.personalityUpdate };
    },
    triggerGuestSignupModal: (state, action) => {
      return { ...state, guestSignup: !state.guestSignup };
    },
    triggerGuestGameAccountModal: (state, action) => {
      return { ...state, guestGameAccount: !state.guestGameAccount };
    },
    triggerUserSignupModal: (state, action) => {
      return { ...state, userSignup: !state.userSignup };
    },
    triggerGameAccountModal: (state, action) => {
      return { ...state, gameAccount: !state.gameAccount };
    },
    triggerAccountEnrollmentModal: (state, action) => {
      return { ...state, accountEnrollment: !state.accountEnrollment };
    },
    triggerCreateRoomModal: (state, action) => {
      return { ...state, createRoom: !state.createRoom };
    },
  },
});

export const {
  triggerLoginModal,
  triggerProfileUpdateModal,
  triggerImageCropModal,
  triggerPersonalityUpdateModal,
  triggerGuestSignupModal,
  triggerGuestGameAccountModal,
  triggerUserSignupModal,
  triggerGameAccountModal,
  triggerAccountEnrollmentModal,
  triggerCreateRoomModal,
} = slice.actions;

export default slice.reducer;
