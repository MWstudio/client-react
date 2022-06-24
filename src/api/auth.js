// axios 함수를 여기서 설정

import axiosInstance from 'utils/axiosInstance';

const signIn = async userData => {
  const response = await axiosInstance.post('/api/auth/signin', {
    email: userData.email,
    password: userData.password,
    remember_check: +userData.rememberCheck, // +붙여서 boolean을 숫자로
  });
  return response;
}; // response return??

const guestSignIn = async userData => {
  const response = await axiosInstance.post('/api/auth/guest', {
    nickname: userData.nickname,
  });
  return response;
};

const signOut = async () => {
  const response = await axiosInstance.get('/api/auth/signout');
  return response;
};

const guestSignOut = async () => {
  const response = await axiosInstance.delete('/api/auth/guest');
  return response;
};

const signUp = async data => {
  const response = axiosInstance.post('/api/auth/signup', {
    email: data.email,
    password: data.password,
    gender: data.gender,
    nickname: data.nickname,
    birth: data.birthYear + data.birthMonth + data.birthDay,
  });
  return response;
};

const sendEmailAuth = async email => {
  const response = axiosInstance.post('/api/auth/email-authcode', {
    request_type: 'signup',
    email: email,
  });
  return response;
};

const validateEmailAuth = async (code, email) => {
  const response = axiosInstance.post('/api/auth/check-auth', {
    request_type: 'signup',
    key: email,
    authcode: code,
  });
  return response;
};

const checkCurrentUser = async () => {
  const response = await axiosInstance.get('/api/auth/current-user');
  return response;
}; // 에러 시에 로컬 스토리지 삭제시키기!!!

const silentRefresh = async () => {
  const response = await axiosInstance.get('/api/auth/refresh');
  return response;
};

const authAPI = {
  signIn,
  signOut,
  signUp,
  guestSignIn,
  guestSignOut,
  sendEmailAuth,
  validateEmailAuth,
  checkCurrentUser,
  silentRefresh,
};

export default authAPI;
