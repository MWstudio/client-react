// 로그인, 로그아웃의 로직을 여기서 구현
import authAPI from 'api/auth';

export const signIn = async userData => {
  try {
    const response = await authAPI.signIn(userData);
    const token = response.data.access_token;
    //setAuthorizationToken(token);
    window.localStorage.setItem('token', token); // page refresh 대비해서 local storage에도 추가
    return response.data;
  } catch (error) {
    console.log(error); // 401 에러
    alert('로그인 실패');
  }
};

export const guestSignIn = async userData => {
  try {
    const response = await authAPI.guestSignIn(userData);
    const token = response.data.access_token;
    window.localStorage.setItem('token', token); // page refresh 대비해서 local storage에도 추가
    return response.data;
  } catch (error) {
    console.log(error); // 401 에러
    alert('게스트 로그인 실패');
  }
};

export const signOut = async () => {
  const response = await authAPI.signOut();
  window.localStorage.removeItem('token'); // localstorage에서 토큰 삭제
  return response.data;
};

export const guestSignOut = async () => {
  const response = await authAPI.guestSignOut();
  window.localStorage.removeItem('token'); // localstorage에서 토큰 삭제
  return response.data;
};

export const checkCurrentUser = async () => {
  //setAuthorizationToken(window.localStorage.getItem('token')); //기존에 지니던 accessToken
  try {
    const response = await authAPI.checkCurrentUser();
    return response.data;
  } catch (error) {
    // 유저에게 다시 로그인 요청!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    throw new Error(error); // react-query는 throw 해야
  }
};

export const silentRefresh = async () => {
  //setAuthorizationToken(window.localStorage.getItem('token')); //기존에 지니던 accessToken
  try {
    const response = await authAPI.silentRefresh();
    return response.data;
  } catch (error) {
    // 또 다른 에러 잡아주기
    throw new Error(error);
  }
};
