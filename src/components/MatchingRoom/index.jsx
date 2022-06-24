import React, { useState, useContext } from 'react';
import { CurrentUserContext } from 'App';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { pushUser } from 'store/modules/matchingRoom';
import { Button } from '@material-ui/core';
import setRankColor from 'utils/setRankColor';
import setPositionImage from 'utils/setPositionImage';
import BasicPopover from 'components/Popover/BasicPopover';
import usePopover from 'hooks/usePopover';
import LoLIcon from 'assets/images/Game/LoL/Icon.png';
import {
  RowFlexDiv,
  ColumnFlexDiv,
  Container,
  UserList,
  UserBox,
  RankBox,
  RoomDetail,
  BottomButtons,
} from './styles';
import { socket } from 'utils/socket';
// import { useQuery } from 'react-query';
// import { useParams } from 'react-router-dom';
// import axiosInstance from 'utils/axiosInstance';

const MatchingRoom = props => {
  const dispatch = useDispatch();
  const matchingRoomState = useSelector(state => state.matchingRoom);

  /* 로그인 중인 유저를 얻기위한 임시 함수 */
  const currentUser = useContext(CurrentUserContext);
  // const paramID = useParams()?.userID;

  // const userID = currentUser?.user?.unique_id;

  // const { data, isLoading, isError } = useQuery(
  //   ['profile', `${paramID}`],
  //   () => axiosInstance.get(`api/profile/${paramID}`),
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: true,
  //     refetchOnReconnect: true,
  //     retry: false,
  //     //staleTime: 60 * 60 * 1000,
  //   },
  // );

  let userLogined = {
    id: currentUser ? currentUser.user.unique_id : null,
    nickname: currentUser ? currentUser.user.nickname : '로그인정보X',
    mannerlv: 0,
    following: 0,
    follower: 0,
    tag: ['접속한', '유저'],
    description: '현재 접속중인 계정입니다.',
    icon: 1059,
    gamecharacter: '인증해주세요',
    Lv: '512',
    solorank: 'G3',
    teamrank: 'C',
    position: 'sup',
    preSeason: 'S5 iron',
    summary: {
      win: 13,
      lose: 7,
      point: 2.28,
      winrate: 68,
      kda: '7.4/7.5/9.7',
    },
    mostChampions: [
      {
        champion: '하이머딩거',
        win: 12,
        lose: 7,
        winrate: 63,
        point: 2.28,
        KDA: '7.4/7.5/9.7',
      },
      {
        champion: '블리츠크랭크',
        win: 0,
        lose: 1,
        winrate: 0,
        point: 1.6,
        KDA: '2/5/6',
      },
    ],
    Detail: [
      { champion: '하이머딩거', result: '패', KDA: '19/8/9', point: 3.5 },
      { champion: '하이머딩거', result: '승', KDA: '4/5/10', point: 2.8 },
      { champion: '하이머딩거', result: '승', KDA: '19/7/15', point: 4.86 },
      { champion: '하이머딩거', result: '승', KDA: '11/4/8', point: 4.75 },
      { champion: '하이머딩거', result: '승', KDA: '8/4/10', point: 4.5 },
    ],
    achievement: '최근 업적 목록 5',
  };

  /* 유저를 클릭했을 시 popover 나오도록 함수 설정 */
  const [userPop, setUserPop] = useState({});
  const [anchorEl, open, handleClick, handleClose] = usePopover();
  const Popid = open ? 'ProfilePopover' : undefined;

  /* dispatch */
  let fakeUser = {
    id: props.id,
    userdata: userLogined,
  };
  const history = useHistory();

  /* 선택한 방을 room이라는 변수로 설정 */
  let room = matchingRoomState.roomsList[props.id];

  /*-------------------------------------------------------------- */

  return (
    <Container>
      {room ? (
        <div>
          <RowFlexDiv className="roomHeader">
            <ColumnFlexDiv className="gameInfo">
              <div>
                <img src={LoLIcon} alt="롤" />
              </div>
              <div>소환사의 협곡</div>
              <div>자유 랭크 게임</div>
            </ColumnFlexDiv>
            <h2>{room.title}</h2>
            <ColumnFlexDiv>
              <div>수정</div>
              <div>
                {room.userlist.length} / {room.capacity}
              </div>
            </ColumnFlexDiv>
          </RowFlexDiv>
          <UserList>
            {room.userlist.map((user, i) => {
              return (
                <UserBox
                  key={i}
                  onClick={e => {
                    setUserPop(user);
                    handleClick(e);
                  }}
                >
                  <RowFlexDiv className="main">
                    <div className="item1">
                      <img
                        src="https://icon-library.com/images/discord-icon-png/discord-icon-png-28.jpg"
                        alt="임시 이미지"
                      />
                      {user.nickname}
                    </div>
                    <div className="item2">
                      <img
                        onClick
                        src={setPositionImage(user.position)}
                        alt={user.position}
                      />
                    </div>
                    <div className="item3">
                      <RankBox color={setRankColor(user)}>
                        {user.solorank}
                      </RankBox>
                    </div>
                  </RowFlexDiv>
                  <div className="more">무시 신고 더보기</div>
                </UserBox>
              );
            })}
          </UserList>
          <BasicPopover
            id={Popid}
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
            userPop={userPop}
          ></BasicPopover>
          <RoomDetail>
            <div className="detailbox">
              <div className="detailheader">평균 티어 </div>
              <div>실버3</div>
            </div>
            <div className="detailbox">
              <div className="detailheader">마이크</div>
              <div>{room.mic}</div>
            </div>
          </RoomDetail>
        </div>
      ) : (
        <div> 존재하지 않는 방입니다.</div>
      )}

      <BottomButtons>
        {props.joined === false ? (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push('/matching/' + props.id);
              // props.setJoined(!props.joined);
              dispatch(pushUser(fakeUser));
              const room_data = {
                id: 1, // 각 방마다 인덱싱 정보 필요
              };

              const user_data = {
                userid: socket.auth['userid'],
                username: socket.auth['username'],
                avatar: socket.auth['avatar'],
              };

              socket.emit('joinRoom', room_data, user_data);
              console.log(currentUser);
            }}
          >
            입장
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push('/matching');
              props.setJoined(!props.joined);

              const room_data = {
                id: room.id, // 각 방마다 인덱싱 정보 필요
              };

              const user_data = {
                userid: socket.auth['userid'],
                username: socket.auth['username'],
                avatar: socket.auth['avatar'],
              };

              socket.emit('quitRoom', room_data, user_data);
            }}
          >
            퇴장
          </Button>
        )}
      </BottomButtons>
    </Container>
  );
};

export default MatchingRoom;
