import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router';
import { signIn } from 'auth';
import {
  triggerLoginModal,
  triggerGuestSignupModal,
  triggerUserSignupModal,
} from 'store/modules/modal';
import character from 'assets/images/character.png';
import { InputLabel, TextField, Divider } from '@material-ui/core';
import {
  LoginModalContainer,
  MainContainer,
  LoginFormContainer,
  ModalButtons,
  CloseButton,
  ModalLogo,
  FormButtons,
  SignButton,
} from './styles';
import axiosInstance from 'utils/axiosInstance';

const LoginModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerLoginModal());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldFocusError: true,
    defaultValues: {
      email: '',
      password: '',
      rememberCheck: 0,
    },
  });
  const history = useHistory();

  const loginInfoSubmit = async userData => {
    console.log(userData);
    const result = await signIn(userData);
    if (result) {
      // 로그인 성공시에 result에 그 정보 담김
      history.push('/');
      closeModal();
      window.location.reload(); // 그냥 axios만 하면 변화한   상태 못 받아오니깐.
    }
  };

  return (
    <LoginModalContainer>
      <MainContainer>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <ModalLogo>
            <img src={character} alt="cha" />
          </ModalLogo>
        </ModalButtons>
        <LoginFormContainer>
          <form onSubmit={handleSubmit(loginInfoSubmit)}>
            <h3>스크림도르에 오신걸 환영합니다.</h3>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Controller
              control={control}
              name="email"
              id="email"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="email"
                  onChange={onChange}
                  autoFocus
                  value={value}
                  variant="outlined"
                  fullWidth={true}
                  size="small"
                />
              )}
            />
            {errors.email?.type === 'required' && (
              <span>이메일을 입력해주세요</span>
            )}
            <InputLabel htmlFor="password">Password</InputLabel>
            <Controller
              control={control}
              name="password"
              id="password"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="password"
                  onChange={onChange}
                  value={value}
                  variant="outlined"
                  fullWidth={true}
                  size="small"
                />
              )}
            />
            {errors.password?.type === 'required' && (
              <span>비밀번호를 입력해주세요</span>
            )}
            {/* <Controller
              control={control}
              name="rememberCheck"
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={<Checkbox onChange={onChange} checked={value} />}
                  label="Remember me?"
                />
              )}
            /> */}
            <button type="submit" hidden></button>
          </form>
        </LoginFormContainer>
        <Divider variant="middle" />
        <FormButtons>
          <SignButton
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSubmit(loginInfoSubmit)}
          >
            로그인
          </SignButton>
          <SignButton
            fullWidth
            color="primary"
            variant="outlined"
            onClick={() => {
              closeModal();
              dispatch(triggerUserSignupModal());
            }}
          >
            회원가입
          </SignButton>
          <p>또는</p>
          <SignButton
            fullWidth
            variant="outlined"
            onClick={() => {
              closeModal(); // 로그인 모달 닫아주고
              dispatch(triggerGuestSignupModal()); // signup 모달 열어주기
              //history.push('/signup');
            }}
          >
            게스트
          </SignButton>
        </FormButtons>
      </MainContainer>
    </LoginModalContainer>
  );
};

export default LoginModal;
