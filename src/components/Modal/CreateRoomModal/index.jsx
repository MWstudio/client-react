import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import AutoInput from 'components/AutoInput';
import RoomCard from 'components/RoomCard';
import getTimeStamp from 'utils/getTimeStamp';
import { triggerCreateRoomModal } from 'store/modules/modal';
import { getRoomInfo, pushRoomsList } from 'store/modules/matchingRoom';
import character from 'assets/images/character.png';
import users from 'pages/Matching/UsersData';
import { TextField, InputLabel, MenuItem, Select } from '@material-ui/core';
import LoL from 'assets/images/Game/LoL/Icon.png';
import PUBG from 'assets/images/Game/PUBG/Icon.png';
import Maplestory from 'assets/images/Game/Maplestory/Icon.png';
import Valorant from 'assets/images/Game/Valorant/Icon.png';
import DefaultImg from 'assets/images/character.png';
import {
  UserSignupModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  ModalLogo,
  SignupContent,
  InputGameStepContainer,
  InputTitleStepContainer,
  StepButtons,
  StepButton,
} from './styles';
import { socket } from 'utils/socket';
import { CurrentUserContext } from 'App';

const CreateRoomModal = () => {
  const currentUser = useContext(CurrentUserContext);
  const matchingRoomState = useSelector(state => state.matchingRoom);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerCreateRoomModal());

  /* 현재 시간을 표시해주는 함수 */
  const [dateString, timeString] = getTimeStamp();

  /* 지금까지 있는 방의 갯수 + 1 만큼의 숫자를 방의 id로 부여하는 함수 */
  const newRoomId = () => {
    let newId = matchingRoomState.roomsList.length;
    newId++;
    return newId;
  };

  const logined = () => {
    let newObject = { ...users[0] };
    newObject.nickname = currentUser ? currentUser.user.nickname : '로그인X';
    newObject.id = currentUser ? currentUser.user.unique_id : '로그인X';
    return newObject;
  };

  /* 모아둔 방의 정보를 전송. RoomData */
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors, isValid }, // isValid === no errors
    getValues,
    trigger,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    defaultValues: {
      id: newRoomId(), // 현재 있는 방의 갯수 + 1
      game: '',
      server: '',
      detail1: '',
      detail2: '',
      mic: 'O',
      title: '',
      start: '',
      time: '',
      capacity: 2,
      userlist: [logined()],
    },
  });

  const onSubmit = data => {
    console.log(data);
  };

  /*------ 이미지 설정을 위한 함수 -------*/
  const setImageSrc = () => {
    switch (watch().game) {
      case '리그 오브 레전드':
        return LoL;
      case '배틀그라운드':
        return PUBG;
      case '메이플스토리':
        return Maplestory;
      case '발로란트':
        return Valorant;
      default:
        return DefaultImg;
    }
  };

  // 현재 스텝 state
  const [step, setStep] = useState(1);

  /* 각 스텝별로 보여주는 Switch */
  const getCreateRoomStep = step => {
    switch (step) {
      case 1:
        return InputGameStep();
      case 2:
        return InputTitleStep();
      case 3:
        return PreviewStep();
      default:
        return;
    }
  };

  /* 이전 스텝으로 넘어가게*/
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  /* 다음 스텝으로 넘어가게*/
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  /* 매칭하고 싶은 게임 기입 칸 */
  const InputGameStep = () => {
    return (
      <InputGameStepContainer>
        <h5>게임 선택</h5>
        <div>
          <InputLabel className="input-label" htmlFor="game">
            게임
          </InputLabel>
          <Controller
            control={control}
            name="game"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              // <TextField
              //   defaultValue={value}
              //   label="game"
              //   id="game"
              //   onChange={onChange}
              //   onBlur={onBlur}
              //   fullWidth
              //   type="search"
              //   variant="outlined"
              //   size="small"
              // />

              <Select
                defaultValue={value}
                label="game"
                id="game"
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
                type="search"
                variant="outlined"
                size="small"
              >
                <MenuItem value="리그 오브 레전드">리그 오브 레전드</MenuItem>
                <MenuItem value="메이플스토리">메이플스토리</MenuItem>
                <MenuItem value="배틀그라운드">배틀그라운드</MenuItem>
                <MenuItem value="발로란트">발로란트</MenuItem>
                <MenuItem value="미지원 게임">미지원 게임</MenuItem>
              </Select>

              // <AutoInput
              //   options="game"
              //   value={value}
              //   onChange={onChange}
              //   onBlur={onBlur}
              // />
            )}
          />
          {errors.game?.type === 'required' && (
            <span className="error-explain">게임을 입력해주세요!</span>
          )}
        </div>

        {/*------------------------------------ 리그 오브 레전드 -------------------------------------- */}
        {watch().game === '리그 오브 레전드' && (
          <>
            <div>
              <InputLabel htmlFor="server" className="input-label">
                서버
              </InputLabel>
              <Controller
                control={control}
                name="server"
                rules={{ required: true, minLength: 7 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  // defaultValue={value}
                  // label="server"
                  // id="server"
                  // onChange={onChange}
                  // onBlur={onBlur}
                  // fullWidth
                  // type="search"
                  // variant="outlined"
                  // size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="server"
                    id="server"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="BR">BR</MenuItem>
                    <MenuItem value="EUNE">EUNE</MenuItem>
                    <MenuItem value="EUW">EUW</MenuItem>
                    <MenuItem value="JP">JP</MenuItem>
                    <MenuItem value="KR">KR</MenuItem>
                    <MenuItem value="LAN">LAN</MenuItem>
                    <MenuItem value="LAS">LAS</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                    <MenuItem value="OCE">OCE</MenuItem>
                    <MenuItem value="RU">RU</MenuItem>
                    <MenuItem value="TR">TR</MenuItem>
                    <MenuItem value="PBE">PBE</MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="server"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.server?.type === 'required' && (
                <span className="error-explain">서버를 입력해주세요!</span>
              )}
            </div>
            <div>
              <InputLabel className="input-label" htmlFor="detail1">
                게임 유형
              </InputLabel>
              <Controller
                control={control}
                name="detail1"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  //   defaultValue={value}
                  //   label="type"
                  //   id="detail1"
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  //   fullWidth
                  //   type="search"
                  //   variant="outlined"
                  //   size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="type"
                    id="type"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="개인/2인 랭크">개인/2인 랭크</MenuItem>
                    <MenuItem value="자유 랭크">자유 랭크</MenuItem>
                    <MenuItem value="일반 게임">일반 게임</MenuItem>
                    <MenuItem value="격전">격전</MenuItem>
                    <MenuItem value="칼바람 나락">칼바람 나락</MenuItem>
                    <MenuItem value="특별 게임 모드">특별 게임 모드</MenuItem>
                    <MenuItem value="사용자 설정 게임">
                      사용자 설정 게임
                    </MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="type"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.detail1?.type === 'required' && (
                <span className="error-explain">게임 유형을 입력해주세요!</span>
              )}
            </div>
          </>
        )}

        {/*------------------------------------ 메이플스토리 -------------------------------------- */}
        {watch().game === '메이플스토리' && (
          <>
            <div>
              <InputLabel htmlFor="server" className="input-label">
                월드
              </InputLabel>
              <Controller
                control={control}
                name="server"
                rules={{ required: true, minLength: 7 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  // defaultValue={value}
                  // label="server"
                  // id="server"
                  // onChange={onChange}
                  // onBlur={onBlur}
                  // fullWidth
                  // type="search"
                  // variant="outlined"
                  // size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="server"
                    id="server"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="스카니아">스카니아</MenuItem>
                    <MenuItem value="베라">베라</MenuItem>
                    <MenuItem value="루나">루나</MenuItem>
                    <MenuItem value="제니스">제니스</MenuItem>
                    <MenuItem value="크로아">크로아</MenuItem>
                    <MenuItem value="유니온">유니온</MenuItem>
                    <MenuItem value="엘리시움">엘리시움</MenuItem>
                    <MenuItem value="이노시스">이노시스</MenuItem>
                    <MenuItem value="레드">레드</MenuItem>
                    <MenuItem value="오로라">오로라</MenuItem>
                    <MenuItem value="아케인">아케인</MenuItem>
                    <MenuItem value="노바">노바</MenuItem>
                    <MenuItem value="리부트1">리부트1</MenuItem>
                    <MenuItem value="리부트2">리부트2</MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="server"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.server?.type === 'required' && (
                <span className="error-explain">서버를 입력해주세요!</span>
              )}
            </div>
            <div>
              <InputLabel className="input-label" htmlFor="detail1">
                보스
              </InputLabel>
              <Controller
                control={control}
                name="detail1"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  //   defaultValue={value}
                  //   label="type"
                  //   id="detail1"
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  //   fullWidth
                  //   type="search"
                  //   variant="outlined"
                  //   size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="boss"
                    id="boss"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="발록">발록</MenuItem>
                    <MenuItem value="자쿰">자쿰</MenuItem>
                    <MenuItem value="혼테일">혼테일</MenuItem>
                    <MenuItem value="핑크빈">핑크빈</MenuItem>
                    <MenuItem value="카웅">카웅</MenuItem>
                    <MenuItem value="시그너스">시그너스</MenuItem>
                    <MenuItem value="파풀라투스">파풀라투스</MenuItem>
                    <MenuItem value="가디언 엔젤 슬라임">
                      가디언 엔젤 슬라임
                    </MenuItem>
                    <MenuItem value="더스크">더스크</MenuItem>
                    <MenuItem value="듄켈">듄켈</MenuItem>
                    <MenuItem value="반반">반반</MenuItem>
                    <MenuItem value="피에르">피에르</MenuItem>
                    <MenuItem value="블러디 퀸">블러디 퀸</MenuItem>
                    <MenuItem value="벨룸">벨룸</MenuItem>
                    <MenuItem value="힐라">힐라</MenuItem>
                    <MenuItem value="진 힐라">진 힐라</MenuItem>
                    <MenuItem value="반 레온">반 레온</MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="type"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.detail1?.type === 'required' && (
                <span className="error-explain">게임 유형을 입력해주세요!</span>
              )}
            </div>
            <div>
              <InputLabel className="input-label" htmlFor="detail1">
                난이도
              </InputLabel>
              <Controller
                control={control}
                name="detail2"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  //   defaultValue={value}
                  //   label="type"
                  //   id="detail1"
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  //   fullWidth
                  //   type="search"
                  //   variant="outlined"
                  //   size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="difficulty"
                    id="difficulty"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="이지">이지</MenuItem>
                    <MenuItem value="노말">노말</MenuItem>
                    <MenuItem value="하드/카오스">하드/카오스</MenuItem>
                    <MenuItem value="연습 모드">연습 모드</MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="type"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.detail1?.type === 'required' && (
                <span className="error-explain">게임 유형을 입력해주세요!</span>
              )}
            </div>
          </>
        )}

        {/*------------------------------------ 배틀그라운드 -------------------------------------- */}
        {watch().game === '배틀그라운드' && (
          <>
            <div>
              <InputLabel htmlFor="server" className="input-label">
                서버
              </InputLabel>
              <Controller
                control={control}
                name="server"
                rules={{ required: true, minLength: 7 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  // defaultValue={value}
                  // label="server"
                  // id="server"
                  // onChange={onChange}
                  // onBlur={onBlur}
                  // fullWidth
                  // type="search"
                  // variant="outlined"
                  // size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="server"
                    id="server"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="카카오">카카오</MenuItem>
                    <MenuItem value="스팀">스팀</MenuItem>
                  </Select>
                  // <AutoInput
                  //   options="server"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.server?.type === 'required' && (
                <span className="error-explain">서버를 입력해주세요!</span>
              )}
            </div>
            <div>
              <InputLabel className="input-label" htmlFor="detail1">
                게임 유형
              </InputLabel>
              <Controller
                control={control}
                name="detail1"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  //   defaultValue={value}
                  //   label="type"
                  //   id="detail1"
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  //   fullWidth
                  //   type="search"
                  //   variant="outlined"
                  //   size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="type"
                    id="type"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="일반">일반</MenuItem>
                    <MenuItem value="랭크">랭크</MenuItem>
                    <MenuItem value="팀 데스매치">팀 데스매치</MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="type"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.detail1?.type === 'required' && (
                <span className="error-explain">게임 유형을 입력해주세요!</span>
              )}
            </div>
          </>
        )}

        {/*------------------------------------ 발로란트 -------------------------------------- */}
        {watch().game === '발로란트' && (
          <>
            <div>
              <InputLabel htmlFor="server" className="input-label">
                서버
              </InputLabel>
              <Controller
                control={control}
                name="server"
                rules={{ required: true, minLength: 7 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  // defaultValue={value}
                  // label="server"
                  // id="server"
                  // onChange={onChange}
                  // onBlur={onBlur}
                  // fullWidth
                  // type="search"
                  // variant="outlined"
                  // size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="server"
                    id="server"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="BR">BR</MenuItem>
                    <MenuItem value="EUNE">EUNE</MenuItem>
                    <MenuItem value="EUW">EUW</MenuItem>
                    <MenuItem value="JP">JP</MenuItem>
                    <MenuItem value="KR">KR</MenuItem>
                    <MenuItem value="LAN">LAN</MenuItem>
                    <MenuItem value="LAS">LAS</MenuItem>
                    <MenuItem value="NA">NA</MenuItem>
                    <MenuItem value="OCE">OCE</MenuItem>
                    <MenuItem value="RU">RU</MenuItem>
                    <MenuItem value="TR">TR</MenuItem>
                    <MenuItem value="PBE">PBE</MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="server"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.server?.type === 'required' && (
                <span className="error-explain">서버를 입력해주세요!</span>
              )}
            </div>
            <div>
              <InputLabel className="input-label" htmlFor="detail1">
                게임 유형
              </InputLabel>
              <Controller
                control={control}
                name="detail1"
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  // <TextField
                  //   defaultValue={value}
                  //   label="type"
                  //   id="detail1"
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  //   fullWidth
                  //   type="search"
                  //   variant="outlined"
                  //   size="small"
                  // />

                  <Select
                    defaultValue={value}
                    label="type"
                    id="type"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  >
                    <MenuItem value="일반전">일반전</MenuItem>
                    <MenuItem value="경쟁전">경쟁전</MenuItem>
                    <MenuItem value="스파이크 돌격">스파이크 돌격</MenuItem>
                    <MenuItem value="데스매치">데스매치</MenuItem>
                    <MenuItem value="에스컬레이션">에스컬레이션</MenuItem>
                    <MenuItem value="사용자 지정 매치">
                      사용자 지정 매치
                    </MenuItem>
                  </Select>

                  // <AutoInput
                  //   options="type"
                  //   value={value}
                  //   onChange={onChange}
                  //   onBlur={onBlur}
                  // />
                )}
              />
              {errors.detail1?.type === 'required' && (
                <span className="error-explain">게임 유형을 입력해주세요!</span>
              )}
            </div>
          </>
        )}
        {/*------------------------------------ 미지원 게임 -------------------------------------- */}
        {watch().game === '미지원 게임' && (
          <>
            <div>
              <InputLabel htmlFor="flexGame" className="input-label">
                게임 이름
              </InputLabel>
              <Controller
                control={control}
                name="flexGame"
                rules={{ required: true, minLength: 7 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    defaultValue={value}
                    label="Game"
                    id="flexGame"
                    onChange={onChange}
                    onBlur={onBlur}
                    fullWidth
                    type="search"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              {errors.flexGame?.type === 'required' && (
                <span className="error-explain">게임을 입력해주세요!</span>
              )}
            </div>
          </>
        )}
      </InputGameStepContainer>
    );
  };

  /* 방의 제목, 정원, 시작 시간 기입 칸 */
  const InputTitleStep = () => {
    return (
      <InputTitleStepContainer>
        <h5>방 설정</h5>
        <div className="selected">
          {matchingRoomState.currentRoom.game === '' ? null : (
            <div>{matchingRoomState.currentRoom.game}</div>
          )}
          {matchingRoomState.currentRoom.server === '' ? null : (
            <div>{matchingRoomState.currentRoom.server}</div>
          )}
          {matchingRoomState.currentRoom.detail1 === '' ? null : (
            <div>{matchingRoomState.currentRoom.detail1}</div>
          )}
          {matchingRoomState.currentRoom.detail2 === '' ? null : (
            <div>{matchingRoomState.currentRoom.detail2}</div>
          )}
        </div>
        <div>
          {/* -------- 고른 게임을 바탕으로 이미지 주소를 정해주는 보이지 않는 Controller --------- */}

          <Controller
            control={control}
            name="img"
            defaultValue={setImageSrc()}
            render={() => <p></p>}
          />

          {/* ------------------------------------------------------------------------ */}
          <InputLabel className="input-label" htmlFor="title">
            방 제목
          </InputLabel>
          <Controller
            control={control}
            name="title"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                defaultValue={value}
                id="title"
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
                type="text"
                variant="outlined"
                size="small"
              />
            )}
          />
          {errors.title?.type === 'required' && (
            <span className="error-explain">방 제목을 입력해주세요!</span>
          )}
        </div>
        <div>
          <InputLabel className="input-label" htmlFor="start">
            시작 시간
          </InputLabel>
          <Controller
            control={control}
            name="start"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                defaultValue={value}
                id="start"
                onChange={onChange}
                onBlur={onBlur}
                variant="outlined"
                size="small"
              >
                <MenuItem value="지금">지금</MenuItem>
                <MenuItem value="예약">예약</MenuItem>
              </Select>

              // <TextField
              //   defaultValue={value}
              //   id="time"
              //   onChange={onChange}
              //   onBlur={onBlur}
              //   type="datetime-local"
              //   variant="outlined"
              //   size="small"
              // />
            )}
          />
          {errors.start?.type === 'required' && (
            <div className="error-explain">시작 시간을 결정해주세요!</div>
          )}
        </div>
        {watch().start === '예약' && (
          <div>
            <InputLabel className="input-label" htmlFor="time">
              시간 설정
            </InputLabel>
            <Controller
              control={control}
              name="time"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  defaultValue={value}
                  id="time"
                  onChange={onChange}
                  onBlur={onBlur}
                  type="datetime-local"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            {errors.time?.type === 'required' && (
              <div className="error-explain">시간을 결정해주세요!</div>
            )}
          </div>
        )}

        <div className="MicWithCapacity">
          <div>
            <InputLabel className="input-label" htmlFor="capacity">
              정원
            </InputLabel>
            <Controller
              control={control}
              name="capacity"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                // <TextField
                //   defaultValue={value}
                //   id="title"
                // onChange={onChange}
                // onBlur={onBlur}
                // fullWidth
                // type="number"
                // variant="outlined"
                // size="small"
                // />
                <Select
                  defaultValue={value}
                  id="capacity"
                  onChange={onChange}
                  onBlur={onBlur}
                  type="number"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              )}
            />
            {errors.capacity?.type === 'required' && (
              <div className="error-explain">정원을 결정해주세요!</div>
            )}
          </div>
          <div>
            <InputLabel className="input-label" htmlFor="mic">
              마이크
            </InputLabel>
            <Controller
              control={control}
              name="mic"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  defaultValue={value}
                  label="mic"
                  id="mic"
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                  type="search"
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="O">O</MenuItem>
                  <MenuItem value="X">X</MenuItem>
                </Select>
                // <AutoInput
                //   options="mic"
                //   value={value}
                //   onChange={onChange}
                //   onBlur={onBlur}
                // />
              )}
            />
            {errors.mic?.type === 'required' && (
              <div className="error-explain">
                마이크 가능 여부를 입력해주세요!
              </div>
            )}
          </div>
        </div>
      </InputTitleStepContainer>
    );
  };

  /* 미리보기 칸 */
  const PreviewStep = () => {
    return (
      <InputTitleStepContainer>
        <h5>미리보기</h5>
        <RoomCard room={matchingRoomState.currentRoom} />
      </InputTitleStepContainer>
    );
  };

  return (
    <UserSignupModalContainer>
      <MainContainer>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <ModalLogo>
            <img src={character} alt="cha" />
          </ModalLogo>
        </ModalButtons>
        <SignupContent elevation={0}>
          <form
            key={1}
            id="room-data-submit" // 유저 데이터 기입 form
            onSubmit={e => e.preventDefault()}
          >
            {getCreateRoomStep(step)}
          </form>
        </SignupContent>
        {step === 1 && (
          <StepButtons>
            <StepButton
              variant="outlined"
              onClick={() => {
                closeModal();
              }}
            >
              닫기
            </StepButton>
            <StepButton
              variant="contained"
              color="primary"
              onClick={async () => {
                await trigger(); // validate trigger
                await dispatch(getRoomInfo(getValues()));
                handleNextStep(); // error가 없어야 다음 스텝
              }}
            >
              다음
            </StepButton>
          </StepButtons>
        )}
        {step === 2 && (
          <StepButtons>
            <StepButton variant="outlined" onClick={handlePreviousStep}>
              뒤로가기
            </StepButton>
            <StepButton
              variant="contained"
              color="primary"
              type="submit"
              form="user-data-submit"
              onClick={async () => {
                await trigger();
                await dispatch(getRoomInfo(getValues()));
                handleNextStep();
              }}
            >
              다음
            </StepButton>
          </StepButtons>
        )}
        {step === 3 && (
          <StepButtons>
            <StepButton variant="outlined" onClick={handlePreviousStep}>
              뒤로가기
            </StepButton>
            {/* 만약 뒤로 갔다가 다시 돌아오면 다시 인증코드를 입력하라고 할 텐데 그러면 다시 1단계까지 내려갔다가 와야함 */}
            <StepButton
              variant="contained"
              color="primary"
              onClick={async () => {
                await handleSubmit(onSubmit)(); // handleSubmit() returns function
                await dispatch(getRoomInfo(getValues()));
                await dispatch(pushRoomsList(getValues()));
                // console.log(matchingRoomState.currentRoom.title);
                const room_data = {
                  id: matchingRoomState.currentRoom.id, // 각 방마다 인덱싱 정보 필요
                  title: matchingRoomState.currentRoom.title,
                };

                const user_data = {
                  userid: socket.auth['userid'],
                  username: socket.auth['username'],
                  avatar: socket.auth['avatar'],
                };

                socket.emit('createRoom', room_data, user_data);
                closeModal();
              }}
            >
              생성하기
            </StepButton>
          </StepButtons>
        )}
      </MainContainer>
    </UserSignupModalContainer>
  );
};

export default CreateRoomModal;
