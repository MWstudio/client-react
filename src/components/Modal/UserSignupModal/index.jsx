import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ReactCodeInput from 'react-code-input';
import authAPI from 'api/auth';
import {
  triggerLoginModal,
  triggerUserSignupModal,
  triggerProfileUpdateModal,
} from 'store/modules/modal';
import checkPattern from 'utils/checkPattern';
import checkDuplication from 'utils/checkDuplication';
import getMonths from 'utils/getDate';
import character from 'assets/images/character.png';
import {
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  FormGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
} from '@material-ui/core';
import {
  UserSignupModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  ModalLogo,
  SignupContent,
  InputUserDataStepContainer,
  EmailValidationStepContainer,
  InputNicknameStepContainer,
  StepButtons,
  StepButton,
} from './styles';

const UserSignupModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerUserSignupModal());

  /* 이메일 인증을 위한 form. EmailValidation */
  const {
    handleSubmit: handleValidateCodeSubmit,
    control: controlValidateCode,
    formState: { errors: validateCodeErrors, isValid: isValidateCodeValid },
    getValues: getValidateCodeValues,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      validateCode: '',
    },
  });

  const onValidateCodeSubmit = async code => {
    const email = getUserEmailValues().email;
    try {
      const result = await authAPI.validateEmailAuth(code.validateCode, email);
      window.localStorage.setItem('token', result.data.access_token);
      window.sessionStorage.setItem('is_first', result.data.is_first);
      closeModal();
      window.location.reload(); // => app.js에서 dispatch(프로필창);
    } catch (err) {
      console.log(err);
      alert(err, '잘못된 코드');
    }
  };

  /* 모아둔 유저 정보 서버로 전송. UserData */
  const {
    control: controlUserEmail,
    formState: { errors: userEmailErrors },
    getValues: getUserEmailValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit: handleUserDataSubmit,
    control: controlUserData,
    formState: { errors: userDataErrors, isValid: isUserDataValid }, // isValie === no errors
    getValues: getUserDataValues,
    trigger,
  } = useForm({
    mode: 'onBlur',
    //reValidateMode: 'onBlur',
    //shouldFocusError: true,
    defaultValues: {
      email: '',
      password: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      gender: '',
      nickname: '',
      gameAccount: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false); // 두번째 form 제출 시에

  const onUserDataSubmit = async data => {
    console.log(data); // axios error handling 두개 요청 보내도 되는지 check!!!
    data.email = getUserEmailValues().email;
    try {
      setIsLoading(true);
      const signup = await authAPI.signUp(data);
      const sendEmailAuth = await authAPI.sendEmailAuth(data.email); // 여기서 로딩 내지는 버튼 disable
      handleNextStep();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  // 현재 스텝 state
  const [step, setStep] = useState(1);

  /* 각 스텝별로 보여주는 Switch */
  const getGuestSignupStep = step => {
    switch (step) {
      case 1:
        return InputUserDataStep();
      case 2:
        return InputNicknameStep();
      case 3:
        return EmailValidationStep();
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

  /* 닉네임을 제외한 유저 정보 기입 창*/
  const InputUserDataStep = () => {
    return (
      <InputUserDataStepContainer>
        <h5>회원가입</h5>
        <div>
          <InputLabel className="input-label" htmlFor="email">
            이메일
          </InputLabel>
          <Controller
            control={controlUserEmail}
            name="email"
            rules={{
              required: true,
              validate: {
                checkPattern: email => checkPattern('email', email),
                checkDuplication: async email => {
                  const result = await checkDuplication('email', email);
                  console.log(result);
                  return result;
                },
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                defaultValue={value}
                id="email"
                label="E-mail"
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
                type="email"
                variant="outlined"
                size="small"
              />
            )}
          />
          {userEmailErrors.email?.type === 'required' && (
            <span className="error-explain">이메일은 필수 정보 입니다</span>
          )}
          {userEmailErrors.email?.type === 'checkPattern' && (
            <span className="error-explain">이메일 형식을 지켜주세요</span>
          )}
          {userEmailErrors.email?.type === 'checkDuplication' && (
            <span className="error-explain">이미 사용중인 아이디입니다</span>
          )}
        </div>
        <div>
          <InputLabel htmlFor="password" className="input-label">
            비밀번호
          </InputLabel>
          {/* 암호화 필요 */}
          <Controller
            control={controlUserData}
            name="password"
            rules={{ required: true, minLength: 7 }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                defaultValue={value}
                id="password"
                label="password"
                onChange={onChange}
                onBlur={onBlur}
                fullWidth
                type="password"
                variant="outlined"
                size="small"
              />
            )}
          />
          {userDataErrors.password?.type === 'required' && (
            <span className="error-explain">비밀번호는 필수 정보 입니다</span>
          )}
          {userDataErrors.password?.type === 'minLength' && (
            <span className="error-explain">
              비밀번호는 최소 7자리여야 합니다
            </span>
          )}
        </div>
        <div>
          <InputLabel className="input-label">생년월일</InputLabel>
          <div className="birth-input">
            <Controller
              control={controlUserData}
              name="birthYear"
              rules={{
                required: true,
                max: new Date().getFullYear(),
                min: 1950,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  defaultValue={value}
                  type="number"
                  label="year"
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            ></Controller>
            <Controller
              control={controlUserData}
              name="birthMonth"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={value}
                >
                  <InputLabel>Month</InputLabel>
                  <Select
                    defaultValue={value}
                    label="month"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                    variant="outlined"
                    size="small"
                  >
                    {getMonths().map(month => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            ></Controller>
            <Controller
              control={controlUserData}
              name="birthDay"
              rules={{ required: true, max: 31, min: 1 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  defaultValue={value}
                  label="day"
                  type="number"
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            ></Controller>
          </div>
        </div>
        <div className="birth-errors">
          {(userDataErrors.birthYear?.type === 'required' ||
            userDataErrors.birthMonth?.type === 'required' ||
            userDataErrors.birthDay?.type === 'required') && (
            <span className="error-explain">생년월일 필수 정보 입니다</span>
          )}
          {(userDataErrors.birthYear?.type === 'max' ||
            userDataErrors.birthYear?.type === 'min') && (
            <span className="error-explain">몇 년에 태어나신거에요?</span>
          )}
          {(userDataErrors.birthDay?.type === 'max' ||
            userDataErrors.birthDay?.type === 'min') && (
            <span className="error-explain">몇 일에 태어나신거에요?</span>
          )}
        </div>
        <div>
          <InputLabel className="input-label">성별</InputLabel>
          <Controller
            control={controlUserData}
            name="gender"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RadioGroup
                row
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                defaultValue={value}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="female"
                />
                <FormControlLabel
                  value="non-binary"
                  control={<Radio color="primary" />}
                  label="non-binary"
                />
              </RadioGroup>
            )}
          />
          {userDataErrors.gender?.type === 'required' && (
            <span className="error-explain">성별은 필수정보입니다</span>
          )}
        </div>
      </InputUserDataStepContainer>
    );
  };

  /* 닉네임 기입 칸*/
  const InputNicknameStep = () => {
    return (
      <InputNicknameStepContainer>
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
            control={controlUserData}
            name="nickname"
            rules={{
              required: true,
              // validate: {
              //   checkDuplication: nickname =>
              //     checkDuplication('nickname', nickname),
              // },
            }}
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
        {userDataErrors.nickname?.type === 'required' && <p>필수 값입니다</p>}
      </InputNicknameStepContainer>
    );
  };

  /* 이메일 인증 코드 기입 칸 */
  const EmailValidationStep = () => {
    return (
      <EmailValidationStepContainer>
        <h5>메일인증</h5>
        <div>이메일 인증을 위해 보내드린 코드를 입력하세요.</div>
        <Controller
          control={controlValidateCode}
          name="validateCode"
          rules={{ required: true, minLength: 6 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl required>
              <FormLabel component="label">인증 코드</FormLabel>
              <ReactCodeInput
                type="number"
                fields={6}
                value={value}
                onChange={onChange}
              />
            </FormControl>
          )}
        />
        {validateCodeErrors.validateCode?.type === 'required' && (
          <p>필수입니다</p>
        )}
        {validateCodeErrors.validateCode?.type === 'minLength' && (
          <p>6자리를 입력해주세요</p>
        )}
      </EmailValidationStepContainer>
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
          {step === 3 ? (
            <form
              key={1}
              id="email-validation" // 이메일 인증 form
              onSubmit={e => e.preventDefault()}
            >
              {getGuestSignupStep(step)}
            </form>
          ) : (
            <form
              key={2}
              id="user-data-submit" // 유저 데이터 기입 form
              onSubmit={e => e.preventDefault()}
            >
              {getGuestSignupStep(step)}
            </form>
          )}
        </SignupContent>
        {step === 1 && (
          <StepButtons>
            <StepButton
              variant="outlined"
              onClick={() => {
                closeModal();
                dispatch(triggerLoginModal());
              }}
            >
              로그인 창으로
            </StepButton>
            <StepButton
              variant="contained"
              color="primary"
              onClick={async () => {
                await trigger(); // validate trigger
                //console.log(getUserDataValues());
                !!isUserDataValid && handleNextStep(); // error가 없어야 다음 스텝
              }}
            >
              회원가입
            </StepButton>
          </StepButtons>
        )}
        {step === 2 && !isLoading && (
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
                await handleUserDataSubmit(onUserDataSubmit)(); // handleSubmit() returns function
                console.log(isUserDataValid);
                !!isUserDataValid && handleNextStep();
                //closeModal();
                // 서버로 유저 생성 전송
                // 적은 이메일로 인증코드 발송!!!
              }}
            >
              제출
            </StepButton>
          </StepButtons>
        )}
        {step === 2 && isLoading && <div>로딩 중</div>}
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
                await handleValidateCodeSubmit(onValidateCodeSubmit)();
                // 인증코드를 서버로 전송!!!
                // getValidateCodeValues().validateCode.length >= 6 &&
                //   handleNextStep(); // 이게 아니라 다음 모달창을 열어야!
              }}
            >
              제출
            </StepButton>
          </StepButtons>
        )}
      </MainContainer>
    </UserSignupModalContainer>
  );
};

export default UserSignupModal;
