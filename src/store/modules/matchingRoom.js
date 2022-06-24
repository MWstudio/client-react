import { createSlice } from '@reduxjs/toolkit';

const name = 'matchingRoom';

const initialState = {
  currentRoom: [],
  roomsList: [],
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    getRoomInfo: (state, action) => {
      return {
        ...state,
        currentRoom: action.payload,
      };
    },
    pushRoomsList: (state, action) => {
      state.roomsList.push(action.payload);
    },
    pushUser: (state, action) => {
      /* 고른 방을 room으로 지정 */
      let room = state.roomsList[action.payload.id];
      let sameuser = room.userlist.findIndex(
        user => user.id === action.payload.userdata.id,
      );

      /* 정원이 찰 때 까지 room에 유저를 추가 */
      if (room.userlist.length < room.capacity) {
        if (sameuser < 0) {
          room.userlist.push(action.payload.userdata);
        }
      }
    },
  },
});

export const { getRoomInfo, pushRoomsList, pushUser } = slice.actions;

export default slice.reducer;
