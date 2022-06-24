import styled, { css } from 'styled-components';
import { Button, Paper, Popover } from '@material-ui/core';
import logo from 'assets/images/logo.png';
import { Zindex, primaryLightColor } from 'styles/variables';

/* Header의 base */
export const HeaderArea = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  height: 4.5rem;
  padding: 0.5rem 0;
  background-color: white;
  border-bottom: 1px solid rgb(0, 0, 0, 0.12);
  z-index: ${Zindex.headerZindex};
  /* padding: 0.5rem 0; */
`;

export const Container = styled.div`
  width: 1320px;
  height: 4.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  #logo {
    // a tag
    width: 250px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

/* --------------------------- */

/* 로고 */

export const Logo = styled.div`
  img {
    background: no-repeat center;
    background-size: contain;
    width: 100%;
    height: 60%;
    z-index: ${Zindex.headerZindex};
  }
`;

/* --------------------------- */

/* search */

export const SearchContainer = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  border-radius: 2rem;
  input {
    width: 20rem;
    padding: 0.3rem;
  }
  hr {
    // Divider styling
    height: 2rem;
  }
`;

/* --------------------------- */

/* 로그인 버튼*/

export const HeaderBtns = styled.div`
  display: flex;
  align-items: center;
`;

export const GuestBtn = styled.div``;

export const LoginBtn = styled(Button)`
  height: 50%;
  margin-right: 1rem;
`;
/* --------------------- */

/* 로그인 하면 나오는 유저 아이콘*/

export const UserIcons = styled.div`
  display: flex;
  align-items: center;
  svg {
    transform: scale(1.2);
  }
`;

/* ------------------- */

/* 로그인 후 프로필 popover*/

export const ProfilePopover = styled(Popover)``;

export const ProfilePopoverContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
`;
