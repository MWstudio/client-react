import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { guestSignIn } from 'auth';
import {
  triggerGuestSignupModal,
  triggerUserSignupModal,
} from 'store/modules/modal';
import { Button, TextField, Link } from '@material-ui/core';
import character from 'assets/images/character.png';
import {
  GuestSignupModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  LinkToSignupButton,
  ModalContent,
  StepButtons,
  StepButton,
  InputNicknameStepContainer,
  InputGameAccountStepContainer,
  CheckResultStepContainer,
} from './styles';

const GuestGameAccountModal = () => {
  const history = useHistory();
  /* 모달 창 닫기 기능*/
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerGuestSignupModal());

  /* 모아둔 유저 정보 서버로 전송 */
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const handleGuestSignupDataSubmit = async userData => {
    console.log(userData);
    const result = await guestSignIn(userData);
    if (result) {
      history.push('/');
      closeModal();
      window.location.reload(); // 그냥 axios만 하면 변화한   상태 못 받아오니깐.
    }
  };

  // 현재 스텝 state
  const [step, setStep] = useState(1);

  /* 각 스텝별로 보여주는 Switch */
  const getGuestSignupStep = step => {
    switch (step) {
      case 1:
        return InputNicknameStep();
      case 2:
        return InputGameAccountStep();
      case 3:
        return CheckResultStep();
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

  /* 유저가 결과 확인할 수 있게 입장 버튼 1초간 disable */
  const [enterButtonDisable, setEnterButtonDisable] = useState(true);

  /* 닉네임 적어주는 칸*/
  const InputNicknameStep = () => {
    return (
      <ModalContent>
        <InputNicknameStepContainer elevation={0}>
          <div className="header">
            <h6>닉네임 설정</h6> {/* 이거 위치 축소하면 이상해짐*/}
          </div>
          <div className="image">
            <img src={character} alt="cha" />
          </div>
          <div className="guide">
            <h6>
              <strong>매칭방에서 사용할 닉네임을 입력해주세요</strong>
            </h6>
            <h6>걱정마세요! 닉네임은 언제든지 수정이 가능합니다</h6>
          </div>
          <div className="input">
            <Controller
              control={control}
              name="nickname"
              rules={{ required: true }}
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
          </div>
        </InputNicknameStepContainer>
      </ModalContent>
    );
  };

  /* 게임 계정 연동 칸*/
  const InputGameAccountStep = () => {
    return (
      <ModalContent>
        <InputGameAccountStepContainer elevation={0}>
          <div className="header">
            <h6>게임 계정 입력</h6> {/* 이거 위치 축소하면 이상해짐*/}
            <Link>변경하기</Link>
          </div>
          <div className="image">
            <img src={character} alt="cha" />
          </div>
          <div className="guide">
            <h6>
              <strong>당신의 게임 계정을 입력해주세요</strong>
            </h6>
            <h6>매칭을 위해서 꼭 필요한 정보에요! 정확하게 입력해주세요</h6>
          </div>
          <div className="input">
            <Controller
              control={control}
              name="gameAccount"
              rules={{ required: true }}
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
          </div>
        </InputGameAccountStepContainer>
      </ModalContent>
    );
  };

  /* 결과 확인 칸*/
  const CheckResultStep = () => {
    return (
      <ModalContent>
        <CheckResultStepContainer elevation={0}>
          <div className="header">
            <h6>당신이 맞나요?</h6> {/* 이거 위치 축소하면 이상해짐*/}
            <Link onClick={() => setStep(1)}>처음으로</Link>
          </div>
          <div className="guest">
            <div className="guest-image">
              <img src={character} alt="cha" />
            </div>
            <div className="guest-name">
              <h6>
                <strong>라베르나</strong>
              </h6>
              <h6>@guest123123213215</h6>
            </div>
          </div>
          <div>여기는 건오가 만든 프로필 박스</div>
        </CheckResultStepContainer>
      </ModalContent>
    );
  };

  return (
    <GuestSignupModalContainer>
      <MainContainer>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <div>게스트 로그인</div>
          <LinkToSignupButton
            color="primary"
            variant="contained"
            onClick={() => {
              closeModal();
              dispatch(triggerUserSignupModal());
            }}
          >
            회원가입
          </LinkToSignupButton>
        </ModalButtons>
        {/*enter에는 submit 안되게*/}
        <form onSubmit={e => e.preventDefault()}>
          {getGuestSignupStep(step)}
        </form>
        <StepButtons>
          <StepButton variant="outlined" onClick={() => handlePreviousStep()}>
            이전
          </StepButton>
          {step === 1 && (
            <StepButton
              variant="contained"
              color="primary"
              disabled={getValues().nickname.length === 0}
              onClick={() => {
                if (getValues().nickname.length > 0) handleNextStep();
              }}
            >
              다음
            </StepButton>
          )}
          {step === 2 && (
            <StepButton
              variant="contained"
              color="primary"
              disabled={getValues().gameAccount.length === 0}
              onClick={() => {
                setTimeout(() => setEnterButtonDisable(false), 1200); // 1.2초후 활성화
                if (getValues().gameAccount.length > 0) handleNextStep();
              }}
            >
              다음
            </StepButton>
          )}
          {step === 3 && (
            <StepButton
              variant="contained"
              color="primary"
              disabled={enterButtonDisable}
              onClick={handleSubmit(handleGuestSignupDataSubmit)}
            >
              입장하기
            </StepButton>
          )}
        </StepButtons>
      </MainContainer>
    </GuestSignupModalContainer>
  );
};

export default GuestGameAccountModal;
