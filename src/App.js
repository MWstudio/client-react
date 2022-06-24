import React, { useEffect, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import GlobalStyle from 'styles/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from 'styles/MaterialTheme';
import Header from 'components/Header';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import useCheckCurrentUser from 'hooks/useCheckCurrentUser';
import useSilentRefresh from 'hooks/useSilentRefresh';
import Matching from 'pages/Matching';
import Friends from 'pages/Friends';
import ChatButton from 'components/Chat/ChatButton';
import { triggerProfileUpdateModal } from 'store/modules/modal';

export const CurrentUserContext = createContext(null);

function App() {
  // silent refresh
  useSilentRefresh();
  const dispatch = useDispatch();

  // 지금 로그인 중인 유저 체크
  const [currentUserQuery] = useCheckCurrentUser(); // !!! react-query로 해서 isloading 중이면 회색화면
  const { isLoading } = currentUserQuery;
  const currentUser = currentUserQuery.data?.data;

  // access token 만료 시에 에러 발생 가능성!!!!

  // 만약 최초 회원가입이라면 로그인 후에 새로고침 하고 회원 정보 수정 창 띄우기
  if (window.sessionStorage.getItem('is_first')) {
    dispatch(triggerProfileUpdateModal());
    // => profile modal
  }
  // 이거 잘 안 되는 건 react.strictmode때문 끄면 잘 됨

  if (isLoading) {
    return <div>"로딩중"</div>;
  }

  return (
    <>
      <StylesProvider injectFirst>
        <StyledThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <CurrentUserContext.Provider value={currentUser}>
              <GlobalStyle />
              <Router>
                <Header />
                <Switch>
                  <Route path="/friends" component={Friends} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/matching/:id" component={Matching} />
                  <Route exact path="/matching" component={Matching} />
                  <Route path="/:userID" component={Profile} />
                  <Route exact path="/" component={Matching} />
                  <Route path="*" component={NotFound} />
                </Switch>
                <ChatButton />
              </Router>
            </CurrentUserContext.Provider>
          </MuiThemeProvider>
        </StyledThemeProvider>
      </StylesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
