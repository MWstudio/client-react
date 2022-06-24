import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { triggerAccountEnrollmentModal } from 'store/modules/modal';
import {
  InputBase,
  Divider,
  IconButton,
  Grid,
  Paper,
  Link,
  TextField,
  Button,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import LOL from 'assets/images/Game/lol.svg';
import OVERWATCH from 'assets/images/Game/overwatch.svg';
import PUBG from 'assets/images/Game/pubg.svg';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {
  AccountEnrollmentModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  SaveButton,
  ModalContent,
  GameSearchGuide,
  GameSearchBox,
  GameRecommendationGuide,
  GameRecommendation,
  StepButtons,
  StepButton,
  InputGameAccountStepContainer,
  AddNewGameStepContainer,
  AddNewAccountStepContainer,
} from './styles';

const AccountEnrollmentModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerAccountEnrollmentModal());

  /* 게임 등록 step 으로 진행 */
  /* 스텝 하드코딩 방지*/
  const PICK = 'pick';
  const INPUT = 'input';
  const ADD_GAME = 'add_game';
  const ADD_ACCOUNT = 'add_account';

  // 현재 스텝 state
  const [step, setStep] = useState('pick');

  /* 각 스텝별로 보여주는 Switch */
  const getAccountEnrollmentStep = step => {
    switch (step) {
      case 'pick':
        return PickGameStep();
      case 'input':
        return InputGameAccountStep();
      case 'add_game':
        return AddNewGameStep();
      case 'add_account':
        return AddNewAccountStep();
      default:
        return;
    }
  };

  /* 무슨 게임있는지 검색  */
  const [gameSearchWord, setGameSearchWord] = useState('');
  const [gameSearchOpen, setGameSearchOpen] = useState(false);
  const [gameOptions, setGameOptions] = useState([]);

  //const { data, isLoading } = useQuery(["gameSearch"], queryFn);
  // https://v4.mui.com/components/autocomplete/#asynchronous-requests

  // 게임 검색 data로 받아오고 그거에 맞추어서 autoComplete

  // 어떤 게임의 계정을 추가할 지 고름
  const PickGameStep = () => {
    return (
      <>
        <GameSearchGuide>
          <div className="guide">
            <span>
              <strong>게임 찾기</strong>
            </span>
            <span>다른 게임을 찾거나 등록할 수 있습니다</span>
          </div>
          <span className="connection" onClick={() => handleStep(ADD_GAME)}>
            직접 게임 추가
          </span>
        </GameSearchGuide>
        <form>
          <GameSearchBox>
            <InputBase
              placeholder="게임 검색"
              value={gameSearchWord}
              onChange={e => setGameSearchWord(e.target.value)}
            ></InputBase>
            <Divider orientation="vertical" />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </GameSearchBox>
        </form>
        <GameRecommendationGuide>
          <div className="guide">
            <span>
              <strong>추천 게임</strong>
            </span>
            <span>손쉽게 계정 추가를 진행할 수 있어요</span>
          </div>
        </GameRecommendationGuide>
        <GameRecommendation>
          <div className="row">
            <div onClick={() => handleStep('input')}>
              <img src={LOL} alt="" />
              <span>리그 오브 레전드</span>
            </div>
            <div onClick={() => handleStep('input')}>
              <img src={OVERWATCH} alt="" />
              <span>오버워치</span>
            </div>
          </div>
          <div className="row">
            <div onClick={() => handleStep('input')}>
              <img src={PUBG} alt="" />
              <span>배틀그라운드</span>
            </div>
            <div onClick={() => handleStep('input')}>4</div>
          </div>
        </GameRecommendation>
      </>
    );
  };

  /* 게임 계정 등록*/
  const {
    handleSubmit: handleGameAccountSubmit,
    control: gameAccountControl,
    formState: { errors: gameAccountErrors },
  } = useForm({
    defaultValues: {
      gameAccount: '',
    },
  });

  const onGameAccountSubmit = account => {
    console.log(account);
  };

  // 이미 존재하는 게임이면 해당 게임의 계정 검색
  const [pickedGame, setPickedGame] = useState('');
  // 여기서 어떤 게임을 선택하느냐에 따라 다른 이미지를 보여줘야하는 데 어케해야할지 모르겠네...!!!

  const InputGameAccountStep = () => {
    return (
      <>
        <InputGameAccountStepContainer elevation={0}>
          <div className="header">
            <h6>게임 계정 입력</h6> {/* 이거 위치 축소하면 이상해짐*/}
            <Link onClick={() => handleStep('pick')}>변경하기</Link>
          </div>
          <div className="image">
            {/* picked game의 이미지 띄우기*/}
            <img src={LOL} alt="cha" />
          </div>
          <div className="guide">
            <h6>
              <strong>당신의 게임 계정을 입력해주세요</strong>
            </h6>
            <h6>매칭을 위해서 꼭 필요한 정보에요! 정확하게 입력해주세요</h6>
          </div>
          {/* 여기에도 form이 두 개가 필요함. 
          하나는 찾은 계정 제출 
          */}
          <div className="input">
            <form onSubmit={handleGameAccountSubmit(onGameAccountSubmit)}>
              <Controller
                control={gameAccountControl}
                name="gameAccount"
                render={({ field: { onChange, value, name } }) => (
                  <TextField
                    name={name}
                    value={value}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                )}
              />
            </form>
          </div>
          <Button onClick={handleGameAccountSubmit(onGameAccountSubmit)}>
            제출
          </Button>
        </InputGameAccountStepContainer>
      </>
    );
  };

  /* 미존재 게임 등록 form */
  const {
    handleSubmit: handleNewGameSubmit,
    control: newGameControl,
    formState: { errors: newGameErrors },
  } = useForm({
    defaultValues: {
      newGame: '',
      server: '',
      gameIntroduction: '',
      gameNickname: '',
      level: '',
      accountIntroduction: '',
    },
  });

  const onNewGameSubmit = newGame => {
    console.log(newGame);
    console.log(loadedGameImage);
  };

  /* 이미지 업로드하면 보여주기*/
  const [loadedGameImage, setLoadedGameImage] = useState({
    imagePreviewUrl: '',
    imageBlob: null,
  });

  const handleGameImageChange = e => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      // 이미지 새로 선택안하고 취소하면 undefined로 되어서 에러 뜰거임
      reader.readAsDataURL(file); // 1. reader에게 file을 먼저 읽히고
      reader.onloadend = () => {
        setLoadedGameImage({ imagePreviewUrl: reader.result });
        //dispatch(triggerImageCropModal()); // 사진 업로드 하면 crop창 띄움
      }; // 2. 비동기적으로 load가 끝나면 state에 저장
    }
  };

  // 존재하지 않는 미등록 게임이면 직접 추가
  const AddNewGameStep = () => {
    return (
      <>
        <AddNewGameStepContainer elevation={0}>
          <div className="header">게임 정보</div>
          <div className="image">
            <div className="image-border">
              {loadedGameImage.imagePreviewUrl && (
                <img src={loadedGameImage.imagePreviewUrl} alt="" />
              )}
              <label htmlFor="profile-image-input" className="photo-icon">
                <IconButton variant="outlined" color="primary" component="span">
                  <AddAPhotoIcon />
                </IconButton>
              </label>
            </div>
            <Controller
              name="profileImage"
              control={newGameControl}
              render={({ field }) => {
                return (
                  <input
                    accept="image/*"
                    id="profile-image-input"
                    type="file"
                    hidden
                    onChange={e => {
                      field.onChange(e.target.files); // input에 upload하는 파일 hook form에 등록
                      handleGameImageChange(e); // preview를 위한 로직
                    }}
                  />
                );
              }}
            />
          </div>
          <div className="detail-input">
            <Controller
              control={newGameControl}
              name="newGame"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  placeholder="게임 명"
                />
              )}
            />
            <Controller
              control={newGameControl}
              name="server"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  placeholder="지역 혹은 서버"
                />
              )}
            />
            <Controller
              control={newGameControl}
              name="gameIntroduction"
              render={({ field: { onChange, value } }) => (
                <TextField
                  multiline
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  placeholder="설명"
                />
              )}
            />
          </div>
          <StepButtons>
            <StepButton
              variant="outlined"
              onClick={() => {
                setStep(PICK);
              }}
            >
              이전
            </StepButton>
            <StepButton
              variant="contained"
              color="primary"
              onClick={() => {
                //handleNewGameSubmit(handleGameImageChange);
                //setNewGameValue(); // 여기 form은 다음 스텝하고 두 개를 같이 다뤄야 함
                setStep(ADD_ACCOUNT);
              }}
            >
              다음
            </StepButton>
          </StepButtons>
        </AddNewGameStepContainer>
      </>
    );
  };

  // 존재하지 않는 미등록 게임의 계정 추가
  const AddNewAccountStep = () => {
    return (
      <>
        <AddNewAccountStepContainer elevation={0}>
          <div className="header">계정 정보</div>
          <div className="detail-input">
            <Controller
              control={newGameControl}
              name="gameNickname"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  placeholder="게임 닉네임"
                />
              )}
            />
            <Controller
              control={newGameControl}
              name="level"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  placeholder="레벨 혹은 등급"
                />
              )}
            />
            <Controller
              control={newGameControl}
              name="accountIntroduction"
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  variant="outlined"
                  placeholder="설명"
                />
              )}
            />
          </div>
          <StepButtons>
            <StepButton
              variant="outlined"
              onClick={() => {
                setStep(ADD_GAME);
              }}
            >
              이전
            </StepButton>
            <StepButton
              variant="contained"
              color="primary"
              type="submit"
              form="new-game-account"
              onClick={() => {
                handleNewGameSubmit(onNewGameSubmit);
                //setNewGameValue(); // 여기 form은 다음 스텝하고 두 개를 같이 다뤄야 함
              }}
            >
              다음
            </StepButton>
          </StepButtons>
        </AddNewAccountStepContainer>
      </>
    );
  };

  /* 특정 스텝으로 넘어가게*/
  const handleStep = step => {
    setStep(step);
  };

  return (
    <AccountEnrollmentModalContainer>
      <MainContainer>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <h4 className="title">게임 계정 등록</h4>
        </ModalButtons>
        <ModalContent>
          {getAccountEnrollmentStep(step)}
          <form
            id="new-game-account"
            onSubmit={handleNewGameSubmit(onNewGameSubmit)}
          ></form>
        </ModalContent>
      </MainContainer>
    </AccountEnrollmentModalContainer>
  );
};

export default AccountEnrollmentModal;
