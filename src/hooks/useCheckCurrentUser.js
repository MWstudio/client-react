import React from 'react';
import { useQuery } from 'react-query';
import authAPI from 'api/auth';

const useCheckCurrentUser = () => {
  /* app을 켜자마자 refresh token을 이용해서 로그인 상태 확인. */
  // refresh 올바르면 1. access token과 2. 로그인한 유저 정보 받아오기

  const accessToken = localStorage.getItem('token'); // 현재 local storage에 저장된 엑세스 토큰;

  const currentUserQuery = useQuery(['currentUser'], authAPI.checkCurrentUser, {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 2,
    staleTime: 24 * 60 * 60 * 1000,
    enabled: Boolean(accessToken), // accessToken이 있어야 enable
    onError: () => {
      localStorage.removeItem('token'); //에러 뜨면 다시 로그인 시켜야하니깐 localstorage 토큰 삭제
      // 에러 뜬다고 다 삭제하면 유저 입장에서는 굉장히 불편!!! 테스트 해봐야~~ !!!
    },
  });
  console.log(currentUserQuery);

  /* ------------------------------ */

  // refresh token이 없으면 로그인 다시하도록 이동 시킴.

  return [currentUserQuery];

  // 1. refresh token을 가지고 만료 전이면 access token을 새로 발급
  // 1-1. refresh token이 만료 되었으면 새로 로그인 요청
  // 2. 이 access token을 가지고 현재 로그인 상태인지 확인
};

export default useCheckCurrentUser;
