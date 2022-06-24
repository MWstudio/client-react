import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Typography,
  Button,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import {
  RoomSearchAccordion,
  RoomSearchAccordionSummary,
  RoomSearchAccordionDetails,
  RoomSearchAccordionActions,
} from './styles';

const LeagueOfLegends = props => {
  const matchingRoomState = useSelector(state => state.matchingRoom);

  let newRoom = {
    id: 0,
    userlist: [user],
    game: matchingRoomState.currentRoom.game,
    detail1: matchingRoomState.currentRoom.detail1,
    title: matchingRoomState.currentRoom.title,
    capacity: matchingRoomState.currentRoom.capacity,
    mic: matchingRoomState.currentRoom.mic,
  };

  const unshiftNewRoom = newRoom => {
    let newArray = [...props.roomsList];
    newArray.unshift(newRoom);
    props.setRoomsList(newArray);
  };

  let history = useHistory();

  /* 검색 조건에 따른 react-hook-form*/

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rift: true,
      abyss: false,
      special: false,
      normal: false,
      solo_rank: true,
      team_rank: false,
    },
  });

  const handleRoomSearchSubmit = data => {
    console.log(data);
  };

  const mapOptions = {
    rift: 'rift',
    abyss: 'abyss',
    special: 'special',
  };

  const queueOptions = {
    normal: 'normal',
    soloRank: 'solo_rank',
    teamRank: 'team_rank',
  };

  /* ------------------------------------ */
  return (
    <RoomSearchAccordion>
      <RoomSearchAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        //ria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="Title">방 검색</Typography>
        <Typography className="Introduction">검색 조건을 설정하세요</Typography>
      </RoomSearchAccordionSummary>
      <RoomSearchAccordionDetails>
        <form className="Room-Search-Form">
          <div className="map">
            <FormLabel component="legend">맵 선택</FormLabel>
            <FormGroup>
              <Controller
                control={control}
                name={mapOptions.rift}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        onChange={e => props.onChange(e.target.checked)}
                        defaultChecked
                      />
                    }
                    label="소환사의 협곡"
                  />
                )}
              />
              <Controller
                control={control}
                name={mapOptions.abyss}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        onChange={e => props.onChange(e.target.checked)}
                      />
                    }
                    label="칼바람 나락"
                  />
                )}
              />
              <Controller
                control={control}
                name={mapOptions.special}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        onChange={e => props.onChange(e.target.checked)}
                      />
                    }
                    label="특별 게임 모드"
                  />
                )}
              />
            </FormGroup>
          </div>
          <div className="queue">
            <FormLabel component="legend">게임 타입 선택</FormLabel>
            <FormGroup>
              <Controller
                control={control}
                name={queueOptions.normal}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        onChange={e => props.onChange(e.target.checked)}
                      />
                    }
                    label="일반게임"
                  />
                )}
              />
              <Controller
                control={control}
                name={queueOptions.soloRank}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        onChange={e => props.onChange(e.target.checked)}
                        defaultChecked
                      />
                    }
                    label="솔로 랭크"
                  />
                )}
              />
              <Controller
                control={control}
                name={queueOptions.teamRank}
                render={({ field: props }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...props}
                        onChange={e => props.onChange(e.target.checked)}
                      />
                    }
                    label="팀 랭크"
                  />
                )}
              />
            </FormGroup>
          </div>
        </form>
      </RoomSearchAccordionDetails>
      <RoomSearchAccordionActions>
        <Button
          variant="outlined"
          onClick={() => {
            axios
              .get() // 방 생성 api 주소
              .then(result => {
                alert('성공');
                history.push('/matching');
                props.setRoomsList([]);
              })
              .catch(() => {
                alert('실패');
                history.push('/matching');
                unshiftNewRoom(newRoom);
              });
          }}
        >
          방 생성
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.setRoomsList(props.roomsdata);
          }}
        >
          로컬 데이터 불러오기
        </Button>
        <Button
          variant="outlined"
          onClick={handleSubmit(handleRoomSearchSubmit)}
        >
          방 검색하기
        </Button>
      </RoomSearchAccordionActions>
    </RoomSearchAccordion> //   검색 Accordion
  );
};

export default LeagueOfLegends;

let user = {
  nickname: '하이머딩거',
  mannerlv: 30,
  following: 600,
  follower: '118K',
  tag: ['INFP', '이명박'],
  description: 'One in a Million! Hello We are TWICE \nLets TikTok with TWICE',
  icon: 1004,
  gamecharacter: '하이머딩거 코치',
  Lv: '230',
  solorank: 'P4',
  teamrank: 'G1',
  position: 'top',
  preSeason: 'S10 diamond',
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
  achievement: '최근 업적 목록 1',
};
