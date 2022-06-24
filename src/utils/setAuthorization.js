import axiosInstance from 'utils/axiosInstance';

const setAuthorizationToken = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    axiosInstance.defaults.headers.common['Authorizaiton'] = '';
  }
};

export default setAuthorizationToken;
