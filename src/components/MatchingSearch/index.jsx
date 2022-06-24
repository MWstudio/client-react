import React, { useState } from 'react';
import LeagueOfLegends from './LeagueOfLegends';
import AutoInput from 'components/AutoInput';
import { Button, TextField } from '@material-ui/core';
import LoL from 'assets/images/Game/LoL/Icon.png';
import Maplestory from 'assets/images/Game/Maplestory/Icon.png';
import PUBG from 'assets/images/Game/PUBG/Icon.png';
import Valorant from 'assets/images/Game/Valorant/Icon.png';
import { SearchContainer } from './styles';

const MatchingSearch = props => {
  let [inputRecommend, setInputRecommend] = useState('');

  return (
    <SearchContainer>
      <div>
        <div className="input-label">게임 선택</div>
        <div>
          <AutoInput options="game" />
        </div>
      </div>
      <div>
        <div>추천 게임</div>
        <Button
          className="recommendGame"
          variant="outlined"
          color="success"
          onClick={() => {
            setInputRecommend('리그 오브 레전드');
          }}
        >
          <img src={LoL} alt="" />
          리그 오브 레전드
        </Button>
        <Button
          className="recommendGame"
          variant="outlined"
          color="success"
          onClick={() => {
            setInputRecommend('배틀그라운드');
          }}
        >
          <img src={PUBG} alt="" />
          배틀그라운드{' '}
        </Button>
        <Button
          className="recommendGame"
          variant="outlined"
          color="success"
          onClick={() => {
            setInputRecommend('메이플스토리');
          }}
        >
          <img src={Maplestory} alt="" />
          메이플스토리{' '}
        </Button>
        <Button
          className="recommendGame"
          variant="outlined"
          color="success"
          onClick={() => {
            setInputRecommend('발로란트');
          }}
        >
          <img src={Valorant} alt="" />
          발로란트{' '}
        </Button>
      </div>
      <LeagueOfLegends
        setRoomsList={props.setRoomsList}
        roomsList={props.roomsList}
        roomsdata={props.roomsdata}
      />
    </SearchContainer>
  );
};

export default MatchingSearch;
