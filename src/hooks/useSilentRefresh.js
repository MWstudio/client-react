import React, { useState } from 'react';
import { useQuery } from 'react-query';
import authAPI from 'api/auth';

const useSilentRefresh = () => {
  /* 만약 위에서 로그인 상태라고 나오면! 지속적으로 access 만료 직전에 새로운 access 받아오기*/

  const accessToken = localStorage.getItem('token');

  const [refreshStop, setRefreshStop] = useState(false);
  const refreshQuery = useQuery(['refresh'], authAPI.silentRefresh, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    refetchInterval: refreshStop ? false : 10 * 60 * 1000, // 100초 인 상황
    refetchIntervalInBackground: true,
    onError: () => {
      setRefreshStop(true);
      localStorage.removeItem('token'); //에러 뜨면 다시 로그인 시켜야하니깐 localstorage 토큰 삭제
      // 에러 뜬다고 다 삭제하면 유저 입장에서는 굉장히 불편!!! 테스트 해봐야~~ !!!
    },
    onSuccess: data => {
      console.log(data);
      const token = data?.data?.access_token;
      if (token) localStorage.setItem('token', token); // 토큰을 받아와야 새로 저장
    },
    enabled: Boolean(accessToken),
  }); // error가 나오면 interval stop
  console.log(refreshQuery);

  /* ------------------------------------ */

  return;
};

export default useSilentRefresh;
