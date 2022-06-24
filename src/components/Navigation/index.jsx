import React, { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { CurrentUserContext } from 'App';
import { triggerCreateRoomModal } from 'store/modules/modal';
import { Divider } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import returnRandomNumber from 'utils/returnRandomNumber';
import roomsdata from 'pages/Matching/RoomsData';
import { device } from 'styles/variables';
import {
  Container,
  NavTabsContainer,
  NavTab,
  ButtonContainer,
  QuickButton,
} from './styles';
import { socket } from 'utils/socket';

const Navigation = () => {
  /* 방 생성 모달을 위한 redux 세팅 */
  const modalState = useSelector(state => state.modal); // 모달의 상태가 들어있음
  const dispatch = useDispatch();

  /* 퀵매칭을 누를 때 랜덤한 방 id로 들어가게 하기 위한 준비 */
  let randomRoomid = returnRandomNumber(0, roomsdata.length - 1);
  let history = useHistory();

  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  const widthOverMobileLandScape = useMediaQuery({
    query: `${device.MobileLandScape}`,
  });
  const widthOverLapTops = useMediaQuery({
    query: `${device.LapTops}`,
  });

  // 1280px 이상에서
  return (
    <Container
      widthOverTabletLandScape={widthOverLapTops}
      widthOverMobileLandScape={widthOverMobileLandScape}
    >
      <NavTabsContainer elevation={0}>
        <NavLink activeClassName="selected" to="/matching">
          {widthOverLapTops ? (
            <NavTab>
              <SportsKabaddiIcon />
              <span>매칭</span>
            </NavTab>
          ) : (
            <NavTab>
              <SportsKabaddiIcon />
            </NavTab>
          )}
        </NavLink>
        {currentUser && (
          <>
            <NavLink
              activeClassName="selected"
              to={{ pathname: `/${currentUser.user.unique_id}` }}
            >
              {widthOverLapTops ? (
                <NavTab>
                  <AccountBoxIcon />
                  <span>프로필</span>
                </NavTab>
              ) : (
                <NavTab>
                  <AccountBoxIcon />
                </NavTab>
              )}
            </NavLink>
            <NavLink exact activeClassName="selected" to="/friends">
              {widthOverLapTops ? (
                <NavTab>
                  <PeopleAltIcon />
                  <span>친구</span>
                </NavTab>
              ) : (
                <NavTab>
                  <PeopleAltIcon />
                </NavTab>
              )}
            </NavLink>
          </>
        )}
        <Divider />
      </NavTabsContainer>
      {widthOverLapTops && (
        <ButtonContainer>
          <QuickButton
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              history.push('/matching/' + randomRoomid);
            }}
          >
            퀵 매칭
          </QuickButton>
          <QuickButton
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (socket.auth['userid'] != null) {
                dispatch(triggerCreateRoomModal());
              } else {
                alert('로그인이 필요합니다.');
              }
            }}
          >
            방 생성
          </QuickButton>
        </ButtonContainer>
      )}
    </Container>
  );
};

export default Navigation;
