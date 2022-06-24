import { createSlice } from '@reduxjs/toolkit';

const name = 'phone';

const initialState = {
  phoneNumber: null,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    inputPhoneNumber: (state, action) => {
      return { ...state, phoneNumber: action.payload };
    },
  },
});

export const { inputPhoneNumber } = slice.actions;

export default slice.reducer;
