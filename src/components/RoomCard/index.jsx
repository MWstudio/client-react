import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import {
  Box,
  RankBox,
  UserBox,
  RoomHeader,
  GameDetail,
  BottomBox,
  RowFlexDiv,
  ColumnFlexDiv,
} from './styles';
import { socket } from 'utils/socket';
import setRankColor from 'utils/setRankColor';
import setPositionImage from 'utils/setPositionImage';
import lol from 'assets/images/Game/LoL/Icon.png';
import roomsdata from 'pages/Matching/RoomsData';

const RoomCard = props => {
  let room = props.room; // 상위 컴포넌트에서 받은 방 정보를 room이라고 지정
  const history = useHistory();

  /* 어느 방에 마우스를 올렸는지 확인하기 위한 state */
  const [mouseOn, setMouseOn] = useState(null);

  /*----------------------------------------------------- */

  return (
    <div>
      <Box
        onMouseEnter={() => {
          setMouseOn(room.id);
        }} // 마우스엔터 이벤트이면 mouseOn이 방의 id가 된다.
        onMouseLeave={() => {
          setMouseOn(null);
        }} // 마우스리브 이벤트이면 mouseOn이 null이 된다.
        onClick={() => {
          history.push('/matching/' + room.id);
          props.setSelectedRoom && props.setSelectedRoom(room.id);
          props.setRoomDetail && props.setRoomDetail(true);
        }}
      >
        <RoomHeader>
          <div className="header-left">
            <div>
              <img src={room.img} alt="롤" />
            </div>
            <GameDetail>
              <div>{room.game}</div>
              <div>
                {room.detail1} {room.detail2 && '- ' + room.detail2}
              </div>
            </GameDetail>
          </div>
          <div>
            {room.userlist.length} / {room.capacity}
          </div>
        </RoomHeader>
        <h3>{room.title}</h3>
        <time>{room.start === '지금' ? room.start : room.time}</time>
        <div>
          {room.userlist && // 방의 userlist 정보가 있을 경우에만
            room.userlist.map(user => {
              return (
                <UserBox key={user.nickname}>
                  <div className="item1">
                    <img
                      src="https://icon-library.com/images/discord-icon-png/discord-icon-png-28.jpg"
                      alt="임시용"
                    />
                    {user.nickname}
                  </div>
                  <div>
                    <img
                      src={setPositionImage(user.position)}
                      alt={user.position}
                    />
                  </div>
                  <div className="item2">
                    <RankBox color={setRankColor(user)}>
                      {user.solorank}
                    </RankBox>
                  </div>
                </UserBox>
              );
            })}
        </div>
        <BottomBox>
          <RowFlexDiv className="rows">
            <div className="detailbox">실버3</div>
            <div className="detailbox">마이크 {room.mic}</div>
          </RowFlexDiv>
          <RowFlexDiv className="buttons">
            {props.setJoined && mouseOn === room.id ? ( // mouseOn과 방의 id 값이 같으면 버튼을 표시해준다.
              <>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      props.setJoined && props.setJoined(true);
                      props.setRoomDetail && props.setRoomDetail(true);

                      const room_data = {
                        id: room.id, // 각 방마다 인덱싱 정보 필요
                      };

                      const user_data = {
                        userid: socket.auth['userid'],
                        username: socket.auth['username'],
                        avatar: socket.auth['avatar'],
                      };

                      socket.emit('joinRoom', room_data, user_data);
                    }}
                  >
                    입장
                  </Button>
                </div>
                <div>
                  <Button variant="outlined" color="inherit">
                    상세보기
                  </Button>
                </div>
              </>
            ) : (
              <div className="withoutButtons"> </div>
            )}
          </RowFlexDiv>
        </BottomBox>
      </Box>
    </div>
  );
};

export default RoomCard;
