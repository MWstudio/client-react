import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { device } from 'styles/variables';
import character from 'assets/images/character.png';
import { useParams } from 'react-router';
import {
  Container,
  ChatBoxContainer,
  ChatBoxHeader,
  ChatBoxContent,
  ChatRoom,
  ChatContent,
} from './styles';

const ChatBox = () => {
  const { id } = useParams();

  const widthOverTabletLandScape = useMediaQuery({
    query: `${device.TabletLandScape}`,
  });

  return (
    <div>
      {id ? (
        <Container widthOverTabletLandScape={widthOverTabletLandScape}>
          <ChatBoxContainer>
            <button className="user-image">
              <img src={character} alt="" />
            </button>
          </ChatBoxContainer>
        </Container>
      ) : (
        <Container widthOverTabletLandScape={widthOverTabletLandScape}>
          <ChatBoxContainer>
            <ChatBoxHeader>
              <div>Title</div>
              <div>더 보기</div>
            </ChatBoxHeader>
            <ChatBoxContent>
              <ChatRoom>
                <div className="user-image">
                  <img src={character} alt="" />
                </div>
                <ChatContent>
                  <div className="chat-top">
                    <h5>이 방이 어떠한 방인가</h5>
                    <div>3/5</div>
                    <span className="game-type">소환사의 협곡</span>
                  </div>
                  <div className="chat-bottom">
                    <div className="chat-buttons">
                      <button>수락</button>
                      <button>거절</button>
                      <button>상세보기</button>
                    </div>
                    <span>time</span>
                  </div>
                </ChatContent>
              </ChatRoom>
              <ChatRoom></ChatRoom>
            </ChatBoxContent>
          </ChatBoxContainer>
        </Container>
      )}
    </div>
  );
};

export default ChatBox;
