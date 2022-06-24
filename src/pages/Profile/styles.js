import styled, { css } from 'styled-components';
import { Button, ButtonBase } from '@material-ui/core';

/* 맨 위 유저 프로필 */

export const ProfileContainer = styled.div`
  padding: 2rem 3rem;
  ${({ widthOverTabletLandScape }) => {
    if (widthOverTabletLandScape) {
      return css`
        min-width: 650px;
      `;
    } else {
      return css`
        width: 100%;
      `;
    }
  }}
`;
export const UserProfile = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 1rem;
`;

export const UserImage = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  .MuiAvatar-root {
    width: 100%;
    height: 100%;
  }
`;

export const UserInfo = styled.div`
  margin: 0.5rem 0 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const UserManner = styled.div`
  .manner-level {
    font-size: 1.2rem;
  }
  .progress-background {
    width: 15rem;
    height: 12px;
    background-color: rgb(255, 192, 193);
  }
  .progress-bar {
    height: 12px;
    ${({ barWidth }) => {
      return css`
        width: ${barWidth}%;
      `;
    }}
    ${({ theme }) => `
      background-color : ${theme.palette.primary.main};
    `}
  }
`;

export const SettingIcons = styled.div`
  text-align: right;
  padding: 0.2rem;
  margin-top: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
`;

export const SettingButton = styled(Button)`
  border-radius: 2rem;
  font-weight: 900;
  min-width: 6rem;
`;

/* ------------------------------------------ */

/* 자기소개, 팔로잉, 성향 */

export const UserIntroduction = styled.div`
  padding-left: 1rem;
  margin: 0.8rem 0;
`;

export const UserFollowing = styled.div`
  padding-left: 1rem;
  margin: 0.8rem 0;
  & > * {
    margin-right: 0.5rem;
  }
`;

export const UserPersonality = styled.div`
  margin: 0.8rem 0;
  margin-bottom: 2rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .personality-list {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      list-style: none;
      margin-right: 0.4rem;
      .MuiChip-root {
        border-radius: 8px;
        height: 24px;
      }
    }
  }
`;

/* 좋아하는 게임 리스트와 그에 따른 프로필 */

export const PreferredGamesListContainer = styled.div`
  width: 100%;
  margin: 1.2rem 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .game-list {
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    li {
      list-style: none;
      margin-right: 0.4rem;
      .icon-img {
        width: 1rem;
        height: 1rem;
      }
    }
  }
`;

export const GameIcon = styled.div`
  width: 5rem;
  height: 5rem;
  border: 1px solid rgb(0, 0, 0, 0.12);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    transform: scale(3);
    transform-origin: center;
  }
`;

/* 나중에 atomic 디자인 용
export const GameChip = styled(ButtonBase)`
  border: 1px solid rgb(0, 0, 0, 0.36);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.1rem 0.6rem;
  margin: 0.2rem;
  cursor: pointer;
  font-size: 1rem;
  span {
    padding: 0 0.1rem;
  }
  svg {
    transform: scale(0.7);
  }
`;
*/

/* -------------------------------------------- */
