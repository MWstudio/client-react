import styled from 'styled-components';
import { Card, LinearProgress } from '@material-ui/core';

export const ProfileBoxContainer = styled(Card)`
  width: 320px;
  overflow: initial;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.24);
  position: relative;
  margin: 1rem;
`;

/* 맨 위 프로필 설정한 사진들 */
export const ProfileImages = styled.article`
  height: 8rem;
  width: 100%;
  position: relative;
`;

export const ProfileBackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 9;
`;

export const ProfileFrontImage = styled.div`
  position: absolute;
  bottom: -28%;
  left: 8%;
  z-index: 10;
  width: 108px;
  height: 108px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  // 사진 둘러싼 div
  .MuiAvatar-root {
    width: 100px;
    height: 100px;
  }
`;
/* ------------------------------------------ */

/* 프로필 상세 정보 */

export const ProfileDescription = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
  margin: 2.5rem 0;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
`;

export const UserName = styled.h2`
  margin-bottom: 1rem;
`;

export const MannerLevel = styled(LinearProgress)`
  width: 90%;
  .MuiLinearProgress-bar1Indeterminate {
    animation: '';
  }

  .MuiLinearProgress-bar2Indeterminate {
    animation: '';
  }
  margin-bottom: 1rem;
  height: 0.3rem;
`;

export const SettingIcons = styled.div`
  position: absolute;
  top: -20%;
  right: 0;
  width: 100%;
  text-align: right;
  padding: 0.2rem;
`;

export const PersonalityList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding: 0;
  width: 100%;
  height: 8rem;
  li {
    list-style: none;
    margin-right: 0.5rem;
    display: inline-block;
  }
`;

/* -------------------------------------------- */
