import React, { useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-router';
import axiosInstance from 'utils/axiosInstance';
import { CurrentUserContext } from 'App';
import usePopover from 'hooks/usePopover';
import {
  triggerProfileUpdateModal,
  triggerPersonalityUpdateModal,
  triggerGameAccountModal,
} from 'store/modules/modal';
import BaseTemplate from 'pages/BaseTemplate';
import Aside from 'components/Aside';
import ChatBox from 'components/ChatBox';
import character from 'assets/images/character.png';
import { Avatar, Chip, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { device } from 'styles/variables';
import ChatButton from 'components/Chat/ChatButton';
import LOL from 'assets/images/Game/lol.svg';
import OVERWATCH from 'assets/images/Game/overwatch.svg';
import PUBG from 'assets/images/Game/pubg.svg';
import {
  ProfileContainer,
  UserImage,
  UserProfile,
  UserInfo,
  UserManner,
  SettingIcons,
  SettingButton,
  UserIntroduction,
  UserFollowing,
  UserPersonality,
  PreferredGamesListContainer,
  GameIcon,
} from './styles';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  popoverContent: {
    pointerEvents: 'auto',
  },
}));

const Profile = () => {
  /* 현재 프로필 params & 현재 로그인한 유저currentUser*/
  const paramID = useParams()?.userID;
  const currentUser = useContext(CurrentUserContext);
  const userID = currentUser?.user?.unique_id;

  /* --------- */

  /* media query */
  const widthOverTabletLandScape = useMediaQuery({
    query: `${device.TabletLandScape}`,
  });

  /* 모달 창 오픈 여부*/
  const modalState = useSelector(state => state.modal);
  const dispatch = useDispatch();
  /* --------------------------------------------------------- */

  /* 각 유저별 프로필페이지 데이터 */
  const { data, isLoading, isError } = useQuery(
    ['profile', `${paramID}`],
    () => axiosInstance.get(`api/profile/${paramID}`),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 60 * 60 * 1000,
    },
  );
  // 자꾸 fetch 되는 에러..
  console.log(data);

  // 성향, 좋아하는 게임 리스트 => 나중에 매칭에 쓰면 redux or react-query로 교체
  const [personalityTags, setPersonalityTags] = useState([
    { key: 0, label: 'INFP' },
    { key: 1, label: 'Passionate' },
  ]);

  const [gameTags, setGameTags] = useState([
    { key: 0, label: '리그 오브 레전드', image: `${LOL}` },
    { key: 1, label: '오버워치', image: `${OVERWATCH}` },
    { key: 2, label: '배틀그라운드', image: `${PUBG}` },
  ]);

  /* --------------------------------------------------------- */

  if (paramID) {
    // 검색해서 paramsId로 들어올 시('/profile/:paramsId')
    if (currentUser) {
      // 로그인도 되어있으면, 친구 추가 버튼 활성화
    } else if (paramID === currentUser) {
      // 자기 정보니깐, 설정도 가능
    } else if (!currentUser) {
      // 그냥 정보만 공개
    }
  } else if (paramID === undefined) {
    // profile 버튼 누르면
    if (currentUser) {
      // 로그인 되어있는 상황, profile 버튼 누르면 currentUser의 id가 paramsId로 자동 들어가 검색
    } else if (!currentUser) {
      // 로그인 해달라는 곳으로
      // const history = useHistory();
      //alert('로그인을 해주세요');
      //history.push('/');
    }
  }

  /* 게임 아이콘 위 popover */
  /* usePopover랑 달라서... 어떻게 refactoring 할지 고민 좀 해봐야*/

  const [gameAnchorEl, gameOpen, handleGameOpen, handleGameClose] =
    usePopover();
  const classes = useStyles();

  /* --------------------------------------------------------- */
  if (isLoading) return <div>프로필 로딩중</div>;

  if (isError) return <div>404 NotFound</div>;

  if (data) {
    return (
      <BaseTemplate>
        <ProfileContainer widthOverTabletLandScape={widthOverTabletLandScape}>
          <UserProfile>
            <UserImage>
              {data.data.user.profile_image_url ? (
                <Avatar
                  src={data.data.user.profile_image_url}
                  variant="circular"
                ></Avatar>
              ) : (
                <Avatar src={character} variant="circular"></Avatar>
              )}
            </UserImage>
            <UserInfo>
              <h3>{data.data.user.nickname}</h3>
              <span>{data.data.user.unique_id}</span>
              <UserManner barWidth={30}>
                <span className="manner-level">LV.30</span>
                <div className="progress-background">
                  <div className="progress-bar"></div>
                </div>
              </UserManner>
            </UserInfo>
            {paramID === userID && (
              <SettingIcons>
                <SettingButton
                  variant="outlined"
                  onClick={() => dispatch(triggerProfileUpdateModal())}
                >
                  프로필 편집
                </SettingButton>
              </SettingIcons>
            )}
          </UserProfile>
          <UserIntroduction>
            자기소개 {data.data.user.introduction}
          </UserIntroduction>
          <UserFollowing>
            <span>
              <strong>17</strong> 팔로워
            </span>
            <span>
              <strong>18</strong>팔로잉
            </span>
          </UserFollowing>
          <UserPersonality>
            <div className="header">
              <h5 className="title">나의 성향</h5>
              {paramID === userID && (
                <SettingButton
                  variant="outlined"
                  onClick={() => dispatch(triggerPersonalityUpdateModal())}
                >
                  성향 편집
                </SettingButton>
              )}
            </div>
            <ul className="personality-list">
              {personalityTags.map(tag => {
                return (
                  <li key={tag.key}>
                    <Chip variant="outlined" clickable label={tag.label}></Chip>
                  </li>
                );
              })}
            </ul>
          </UserPersonality>
          <PreferredGamesListContainer>
            <div className="header">
              <h5 className="title">연동된 게임 계정</h5>
              {paramID === userID && (
                <SettingButton
                  variant="outlined"
                  onClick={() => dispatch(triggerGameAccountModal())}
                >
                  게임 편집
                </SettingButton>
              )}
            </div>
            <ul className="game-list">
              {gameTags.map(tag => {
                return (
                  <li key={tag.key}>
                    <GameIcon
                      onMouseEnter={handleGameOpen}
                      onMouseLeave={handleGameClose}
                      ref={gameAnchorEl}
                    >
                      <img className="icon-img" src={tag.image} alt="" />
                    </GameIcon>
                  </li>
                );
              })}
            </ul>
            {/* 게임 아이콘 popover*/}
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.popoverContent,
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={gameOpen}
              anchorEl={gameAnchorEl.current}
              PaperProps={{
                onMouseEnter: handleGameOpen,
                onMouseLeave: handleGameClose,
              }}
            >
              asdasd
            </Popover>
          </PreferredGamesListContainer>
        </ProfileContainer>
        <Aside>
          <ChatBox />
          <ChatBox />
        </Aside>
      </BaseTemplate>
    );
  }
};

export default Profile;
