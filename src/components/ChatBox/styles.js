import styled, { css } from 'styled-components';

/* Aisde에 넣어야하는 기능 같은데 일단은 여기에 둠*/
export const Container = styled.div`
  background: #cdcdcd;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
/* -------------------- */

export const ChatBoxContainer = styled.div`
  width: 100%;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  .user-image {
    // 프로필 이미지들 모음
    width: 4rem;
    height: 4rem;
    padding: 0.4rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const ChatBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ChatBoxContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatRoom = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 6px;
  .user-image {
    // 프로필 이미지들 모음
    width: 4rem;
    height: 4rem;
    padding: 0.4rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // 방 제목, 참여자 수, 게임 이미지
  .chat-top {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      width: 180px;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .game-type {
      width: 10%;
      font-size: 10px;
    }
  }
  .chat-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50%;
    .chat-buttons {
      display: flex;
    }
  }
`;
