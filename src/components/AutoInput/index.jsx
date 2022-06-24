import React from 'react';
import TextField from '@material-ui/core/TextField';
import { AutoInputContainer } from './styles';
import LoL from 'assets/images/Game/LoL/Icon.png';

export default function AutoInput(props) {
  const setOption = options => {
    switch (options) {
      case 'game':
        return game;
      case 'server':
        return server;
      case 'type':
        return type;
      case 'mic':
        return mic;
      default:
        return;
    }
  };
  return (
    <AutoInputContainer
      freeSolo
      id="free-solo-2-demo"
      autoSelect="true"
      autoComplete="true"
      disableClearable
      options={setOption(props.options).map(option => option)}
      renderInput={params => (
        <TextField
          {...params}
          defaultValue={props.value}
          id={props.options}
          label={props.options}
          onChange={props.onChange}
          onBlur={props.onBlur}
          fullWidth
          InputProps={{ ...params.InputProps, type: 'search' }}
          variant="outlined"
          size="small"
        />
        // <TextField
        //   {...params}
        //   label="게임 검색"
        //   margin="normal"
        //   variant="outlined"
        //   InputProps={{ ...params.InputProps, type: 'search' }}
        // />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const game = ['리그 오브 레전드', '메이플스토리', '발로란트', '배틀그라운드'];
const server = [
  'BR',
  'EUNE',
  'EUW',
  'JP',
  'KR',
  'LAN',
  'LAS',
  'NA',
  'OCE',
  'RU',
  'TR',
  'PBE',
];
const type = [
  '일반 게임',
  '개인/2인 랭크',
  '자유 랭크',
  '칼바람 나락',
  '특별 게임 모드',
  '사용자 설정 게임',
];
const mic = ['필수', '금지', '무관'];
