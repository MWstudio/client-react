import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { InputLabel, TextField, Button } from '@material-ui/core';
import Character from 'assets/images/character.png';
import { SignUpTemplate, Container } from './styles';

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
  });

  const emailSubmit = data => {
    console.log(data);
  };

  /* --------------------------------------------------------- */
  return (
    <SignUpTemplate>
      <Container elevation={6}>
        <img src={Character} alt="" />
        <form onSubmit={handleSubmit(emailSubmit)}>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Controller
            control={control}
            name="email"
            rules={{ required: '필수 값입니다' }}
            // 이메일로 받는 것이 좋고, 중복 확인도 필요
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                error={!!error}
                type="email"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error-message">{message}</p>}
          ></ErrorMessage>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Controller
            control={control}
            name="password"
            rules={{
              required: '필수 값입니다',
              minLength: { value: 7, message: '비밀번호는 최소 7글자입니다' },
            }}
            // 패스워드는 최소 7글자, 영문 하나 들어가야 하고, 암호화
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                error={!!error}
                type="password"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="error-message">{message}</p>}
          ></ErrorMessage>
          <InputLabel htmlFor="nickname">Nickname</InputLabel>
          <Controller
            control={control}
            name="nickname"
            rules={{
              required: '필수 값입니다',
            }}
            // 패스워드는 최소 7글자, 영문 하나 들어가야 하고, 암호화
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                onChange={onChange}
                error={!!error}
                type="text"
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="nickname"
            render={({ message }) => <p className="error-message">{message}</p>}
          ></ErrorMessage>
          <Button type="submit" color="primary" fullWidth variant="container">
            회원가입
          </Button>
        </form>
      </Container>
    </SignUpTemplate>
  );
};

export default Signup;
