import React, { useState } from 'react';
import { Avatar, IconButton, Chip } from '@material-ui/core';
import useOpenCloseTrigger from 'hooks/useOpenCloseTrigger';
import {
  ProfileBoxContainer,
  ProfileImages,
  ProfileFrontImage,
  ProfileBackgroundImage,
  ProfileDescription,
  UserName,
  MannerLevel,
  SettingIcons,
  PersonalityList,
} from './styles';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import profileBackground from 'assets/images/Profile/profileBackground.jpg';
import vsign from 'assets/images/Profile/vsign.jpg';

const ProfileBox = ({ user }) => {
  // user는 프로필에 띄울 user

  /* 모달 창 오픈 여부*/
  const [isProfileUpdateModalOpened, handleProfileUpdateModalOpenClose] =
    useOpenCloseTrigger();
  /* --------------------------------------------------------- */

  // 성향 태그, 개인 세부정보 => 나중에 매칭에 쓰면 redux로 교체!!!
  const [personalityTag, setPersonalityTag] = useState([
    { key: 0, label: 'INFP' },
    { key: 1, label: 'Passionate' },
    { key: 2, label: 'Passionate' },
    { key: 3, label: 'Passionate' },
    { key: 4, label: 'Passionate' },
    { key: 5, label: 'Passionate' },
    { key: 6, label: 'Passionate' },
  ]);

  return (
    <ProfileBoxContainer>
      <ProfileImages>
        <ProfileBackgroundImage src={profileBackground} />
        <ProfileFrontImage>
          <Avatar src={vsign} variant="circle"></Avatar>
        </ProfileFrontImage>
      </ProfileImages>
      <ProfileDescription>
        <UserName>{user}[Clan]</UserName>
        <MannerLevel value={50} variant="determinate"></MannerLevel>
        <SettingIcons>
          <IconButton>
            <SettingsIcon onClick={handleProfileUpdateModalOpenClose} />
          </IconButton>
          <IconButton>
            <EmailIcon />
          </IconButton>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
        </SettingIcons>
        <PersonalityList>
          {personalityTag.map(data => {
            return (
              <li key={data.key}>
                <Chip label={data.label}></Chip>
              </li>
            );
          })}
        </PersonalityList>
      </ProfileDescription>
    </ProfileBoxContainer>
  );
};

export default ProfileBox;
