import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { signOut, guestSignOut } from 'auth';
import { useSelector, useDispatch } from 'react-redux';
import { CurrentUserContext } from 'App';
import usePopover from 'hooks/usePopover';
import { triggerLoginModal } from 'store/modules/modal';
import { InputBase, Divider, IconButton, Badge } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SearchIcon from '@material-ui/icons/Search';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import NotificationsNoneRoundedIcon from '@material-ui/icons/NotificationsNoneRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import logo from 'assets/images/logo.png';
import sign from 'assets/images/Profile/vsign.jpg';
import { device } from 'styles/variables';
import {
  HeaderArea,
  Container,
  SearchContainer,
  Logo,
  HeaderBtns,
  LoginBtn,
  UserIcons,
  ProfilePopover,
  ProfilePopoverContainer,
} from './styles';

const Header = () => {
  const widthOverTabletPortrait = useMediaQuery({
    query: `${device.TabletPortrait}`,
  });

  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  const userID = currentUser?.user?.unique_id; // userID가 6자리는 정식유저, 7자리는 게스트 유저

  /* 로그인 모달창, 회원가입 모달창, profilePopover - open close */
  const modalState = useSelector(state => state.modal); // 모달의 상태가 들어있음
  const dispatch = useDispatch();

  const [profileAnchorEl, profileOpen, handleProfileOpen, handleProfileClose] =
    usePopover();
  /* ------------------------------------------------------------------*/

  return (
    <HeaderArea>
      <Container>
        <Link id="logo" to="/">
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
        </Link>
        {widthOverTabletPortrait && (
          <SearchContainer component="form" onSubmit={e => e.preventDefault()}>
            <InputBase placeholder="계정 및 매치 검색"></InputBase>
            <Divider orientation="vertical" />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </SearchContainer>
        )}
        {/* 로그인 여부에 따라 유저 정보 <-> 로그인 버튼*/}
        {/* 게스트는 g가 붙어서 7자리, 정식은 6자리*/}
        {currentUser && userID.length < 7 ? (
          <UserIcons>
            <Link to="/">
              <IconButton>
                <HomeRoundedIcon />
              </IconButton>
            </Link>
            <IconButton>
              <Badge badgeContent={6} color="secondary">
                <MailOutlineRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={7} color="secondary">
                <NotificationsNoneRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={handleProfileOpen} ref={profileAnchorEl}>
              <AccountCircleRoundedIcon />
            </IconButton>
            {/* 메뉴, 모달 popover*/}
            <ProfilePopover
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={profileAnchorEl.current}
              open={profileOpen}
              onClose={handleProfileClose}
            >
              <ProfilePopoverContainer>
                <span>성향</span>
                <span>클랜 이름</span>
                <span>매너 레벨</span>
                <div>
                  <button>더보기</button>
                  <button
                    onClick={async () => {
                      await signOut();
                      history.push('/');
                      window.location.reload(); // 그냥 axios만 하면 변화한 상태 못 받아오니깐.
                    }}
                  >
                    로그아웃
                  </button>
                </div>
              </ProfilePopoverContainer>
            </ProfilePopover>
            {/* 메뉴, 모달 popover*/}
          </UserIcons>
        ) : (
          <HeaderBtns>
            {userID?.length === 7 && (
              <button
                onClick={async () => {
                  await guestSignOut();
                  window.location.reload(); // 그냥 axios만 하면 변화한 상태 못 받아오니깐.
                }}
              >
                게스트
              </button>
            )}
            <LoginBtn
              onClick={() => dispatch(triggerLoginModal())}
              endIcon={<LockOpenIcon />}
              variant="contained"
              color="primary"
            >
              LogIn
            </LoginBtn>
          </HeaderBtns>
        )}
      </Container>
    </HeaderArea>
  );
};

export default Header;
