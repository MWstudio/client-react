import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import axiosInstance from 'utils/axiosInstance';
import checkPattern from 'utils/checkPattern';
import checkDuplication from 'utils/checkDuplication';
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import schoolsList from 'assets/json/schools.json';
import { BirthContainer, BirthWrapper } from './styles';

const genderOptions = [
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Male',
    value: 'male',
  },
];

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const UserInfo = ({ activeStep, handleNext, handleBack }) => {
  // 회원가입 용
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
    defaultValues: { birthYear: '0000', birthMonth: '00', birthDay: '00' },
  });
  // https://blog.logrocket.com/using-material-ui-with-react-hook-form/

  // signup modal에서 휴대폰 인증하고서 redux로 넘어온 데이터
  const phoneNumber = useSelector(
    state => state.phone.phoneNumber?.phoneNumber,
  );

  // 회원가입에 필요한 데이터 서버로 보내기
  const onUserInfoSubmit = async data => {
    console.log(data);
    //이메일 인증
    try {
      await axiosInstance.post('/api/auth/signup', {
        email: data.email,
        password: data.password,
        unique_name: data.uniqueName,
        nickname: data.nickname,
        gender: data?.gender,
        birth: `${data?.birthYear} ${data?.birthMonth} ${data?.birthDay}`,
        school: data?.school,
        introduction: data?.introduction,
        //email_auth: data?.emailAuth,
        phone_number: phoneNumber,
      });
      await axiosInstance.post('/api/auth/email-authcode', {
        email: data.email,
        request_type: 'signup',
      });
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  // 생년월일 rules 정해주기
  // profile image name . 파일리스트로 넘어가? url로 넘어가?

  return (
    <>
      <form id="hook-form" onSubmit={handleSubmit(onUserInfoSubmit)}>
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            validate: {
              checkPattern: email => checkPattern('email', email),
              checkDuplication: email => checkDuplication('email', email),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              size="small"
              id="email"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              variant="outlined"
            />
          )}
        ></Controller>
        {console.log(errors)}
        {errors.email?.type === 'required' && (
          <span>이메일은 필수 정보 입니다</span>
        )}
        {errors.email?.type === 'checkPattern' && (
          <span>이메일 형식을 지켜주세요</span>
        )}
        {errors.email?.type === 'checkDuplication' && (
          <span>이미 사용중인 아이디입니다</span>
        )}
        <InputLabel htmlFor="password">Password</InputLabel>
        <Controller
          control={control}
          name="password"
          rules={{ required: true, minLength: 7 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              id="password"
              size="small"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              variant="outlined"
              type="password"
            />
          )}
        ></Controller>
        {errors.password?.type === 'required' && (
          <span>비밀번호는 필수 정보 입니다</span>
        )}
        {errors.password?.type === 'minLength' && (
          <span>비밀번호는 최소 7자리여야 합니다</span>
        )}
        <InputLabel htmlFor="uniqueName">Unique Name</InputLabel>
        <Controller
          control={control}
          name="uniqueName"
          rules={{
            required: true,
            validate: {
              checkDuplication: email => checkDuplication('unique_name', email),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              id="name"
              size="small"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              variant="outlined"
            />
          )}
        ></Controller>
        {errors.uniqueName?.type === 'required' && (
          <span>당신이 누군지 알려주세요</span>
        )}
        {errors.uniqueName?.type === 'checkDuplication' && (
          <span>이미 사용중인 고유닉네임입니다</span>
        )}
        <InputLabel htmlFor="nickname">NickName</InputLabel>
        <Controller
          control={control}
          name="nickname"
          rules={{
            required: true,
            validate: {
              checkDuplication: nickname =>
                checkDuplication('nickname', nickname),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              id="nickname"
              size="small"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              variant="outlined"
            />
          )}
        ></Controller>
        {errors.nickname?.type === 'required' && (
          <span>닉네임은 필수 정보 입니다</span>
        )}
        {errors.nickname?.type === 'checkDuplication' && (
          <span>이미 사용 중인 닉네임 입니다</span>
        )}
        {/* <div className="optionalDivider">Optional</div>
        <InputLabel htmlFor="genderGroup">Gender</InputLabel>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value} onChange={onChange} row id="genderGroup">
              {genderOptions.map(singleOpt => {
                return (
                  <FormControlLabel
                    key={singleOpt.label}
                    value={singleOpt.value}
                    control={<Radio />}
                    label={singleOpt.label}
                  ></FormControlLabel>
                );
              })}
            </RadioGroup>
          )}
        ></Controller>
        <BirthContainer>
          <BirthWrapper>
            <InputLabel htmlFor="birthYear">Year</InputLabel>
            <Controller
              control={control}
              name="birthYear"
              rules={{ pattern: /[0-9]{4}/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  id="birthYear"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  variant="outlined"
                  placeholder="4자리(년)"
                />
              )}
            ></Controller>
            {errors.birthYear?.type === 'pattern' && <span>4자리 숫자</span>}
          </BirthWrapper>
          <BirthWrapper>
            <InputLabel htmlFor="birthMonth">Month</InputLabel>
            <Controller
              name="birthMonth"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  id="birthMonth"
                  select
                  onChange={onChange}
                  value={value}
                  variant="outlined"
                >
                  {months.map(ele => {
                    return (
                      <MenuItem key={ele} value={ele}>
                        {ele}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            ></Controller>
          </BirthWrapper>
          <BirthWrapper>
            <InputLabel htmlFor="birthDay">Day</InputLabel>
            <Controller
              control={control}
              name="birthDay"
              rules={{ pattern: /[0-9]{2}/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  id="birthDay"
                  variant="outlined"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="2자리(일)"
                />
              )}
            ></Controller>
            {console.log(errors)}
            {errors.birthDay?.type === 'pattern' && <span>2자리 숫자</span>}
          </BirthWrapper>
        </BirthContainer>
        <InputLabel htmlFor="education">대학교</InputLabel>
        <Controller
          control={control}
          name="school"
          render={() => (
            <Autocomplete
              options={schoolsList.schools}
              fullWidth={true}
              renderInput={params => (
                <TextField {...params} label="school" variant="outlined" />
              )}
            />
          )}
        ></Controller>
        <InputLabel htmlFor="introduction">자기소개</InputLabel>
        <Controller
          control={control}
          name="introduction"
          rules={{ maxLength: 150 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              id="introduction"
              multiline
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              variant="outlined"
            />
          )}
        ></Controller>
        {errors.introduction?.type === 'maxLength' && (
          <span>자기소개는 150자 제한입니다</span>
        )} */}
        {/*  
        introduction은 길게 쓰게 personality는 선택가능?? #으로 적을 수 있게???
        개인 성향은 스스로 적으면 태그로 바꿔주고, 게임 이력서(?) 성향은 우리가 정해주는데로
        개인 성향 예시 적어두기. 
      */}
      </form>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button type="submit" form="hook-form">
        {activeStep === 2 ? 'Finish' : 'Next'}
      </Button>
    </>
  );
};

export default UserInfo;
