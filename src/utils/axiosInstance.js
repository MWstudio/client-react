import axios from 'axios';
import setAuthorizationToken from 'utils/setAuthorization';

const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
  // headers: {
  //   common: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`,
  //   },
  // },
});

// server로 보내기 직전의 정보 intercept
axiosInstance.interceptors.request.use(
  config => {
    /*
  config에는 axiosInstance 객체를 이용하여 request를 보냈을 때의 모든 설정값들이 들어있다.
  * 활용 *
  1. api요청의 경우 token이 필요한 경우가 있다. 토큰에 대한 정보를 한 번에 처리 가능
  2. 요청 method에 따른 외부에 들러내지 않고 싶을 때
  */

    const token = window.localStorage.getItem('token');
    config.headers.common['Authorization'] = `Bearer ${token}`;

    console.log(config);
    return config;
  },
  err => {
    /* 
    request를 보낼 때에 error 발생 경우, 여기서 catch 가능
    */
    return Promise.reject(err);
  },
);

// 서버에서 받아 온 response를 client에서 보기 직전
axiosInstance.interceptors.response.use(
  config => {
    /*
    요청을 보낸 후, response가 오는 경우 여기서 먼저 확인 가능
    * 활용 *
    1. status-code가 정상이어도 내용상 이유로 에러 처리하고 싶은 경우
    2. 민감 정보에 대한 데이터 가공
    */
    console.log(config);
    return config;
  },
  ({ config, request, response, ...err }) => {
    /*
    response 응답 후에 status code가 40x 50x  처럼 에러 나타나는 경우에 해당 루트 수행
   */
    console.log(response);
    const errMsg = 'Error Message';
    return Promise.reject({ config, message: errMsg, ...err });
  },
);

export default axiosInstance;
