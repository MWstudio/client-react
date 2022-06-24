import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { guestSignIn } from 'auth';
import {
  triggerGuestSignupModal,
  triggerUserSignupModal,
} from 'store/modules/modal';
import { TextField } from '@material-ui/core';
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
} from './styles';

const GuestSignupModal = () => {
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
        <form onSubmit={handleSubmit(handleGuestSignupDataSubmit)}>
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
        </form>
        <StepButtons>
          <StepButton variant="outlined">이전</StepButton>
          <StepButton
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleGuestSignupDataSubmit)}
          >
            입장하기
          </StepButton>
        </StepButtons>
      </MainContainer>
    </GuestSignupModalContainer>
  );
};

export default GuestSignupModal;
