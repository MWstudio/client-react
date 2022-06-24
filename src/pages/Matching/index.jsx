import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BaseTemplate from 'pages/BaseTemplate/index.jsx';
import Aside from 'components/Aside/index.jsx';
import MatchingRoom from 'components/MatchingRoom';
import MatchingSearch from 'components/MatchingSearch';
import RoomCard from 'components/RoomCard';
import ChatBox from 'components/ChatBox';
import { socket } from 'utils/socket';
import roomsdata from './RoomsData';
import tier from './TierData.js';
import { AsideContainer, MatchingContainer, Search } from './styles.js';
import { useSelector } from 'react-redux';
import Masonry from 'react-masonry-css';

const Matching = () => {
  /*방에 들어갈 주소를 방의 id로 라우팅*/
  const { id } = useParams();
  const history = useHistory();

  /* 방 리스트를 전역에서 쓰기 위한 redux 세팅 */
  let matchingRoomState = useSelector(state => state.matchingRoom);

  /*-------------------------------------------------------------*/

  const [roomsList, setRoomsList] = useState(roomsdata); //검색 결과에 나올 데이터를 state로 설정
  const [selectedRoom, setSelectedRoom] = useState(); // 어떤 방을 골랐는지 state로 설정
  const [roomDetail, setRoomDetail] = useState(false); // 방 상세정보를 보여줄지 state로 설정
  const [joined, setJoined] = useState(false); //방 입장정보를 보여줄지 state로 설정

  /* 창 크기 변화에 맞춰 Masonry breakpoint 설정 (px: cols) */
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  /*-------------------------------------------------------------*/

  return (
    <BaseTemplate>
      <MatchingContainer roomDetail={roomDetail}>
        <Search>
          {joined && id ? (
            <div>
              <h1>입장 시 나올 페이지입니다.(방 id : {id})</h1>
              <div>채팅창이 보여야 함.</div>
            </div> //   방에 입장하면 나올 페이지
          ) : (
            <MatchingSearch
              setRoomsList={setRoomsList}
              roomsList={roomsList}
              roomsdata={roomsdata}
            />
          )}
        </Search>

        {!joined && (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {matchingRoomState.roomsList.map((room, i) => {
              return (
                <RoomCard
                  key={room.id}
                  room={room}
                  setSelectedRoom={setSelectedRoom}
                  selectedRoom={selectedRoom}
                  setRoomDetail={setRoomDetail}
                  setJoined={setJoined}
                />
              );
            })}
          </Masonry>
          //    방 리스트
        )}
      </MatchingContainer>
      <Aside>
        <AsideContainer>
          {id ? (
            <>
              <MatchingRoom
                id={id}
                selectedRoom={selectedRoom}
                tier={tier}
                roomsList={roomsList}
                joined={joined}
                setJoined={setJoined}
                roomDetail={roomDetail}
              />
              <section
                onClick={() => {
                  history.push('/matching');
                }}
              >
                <ChatBox />
              </section>
            </>
          ) : (
            <section className="chatbox">
              <ChatBox />
            </section>
          )}
        </AsideContainer>
      </Aside>
    </BaseTemplate>
  );
};

export default Matching;
