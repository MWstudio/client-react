import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import { Zindex } from './variables';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html ,body {
    height : 100%;
    width : 100%;
    position : relative;
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
  }

  body {
    min-height : 100vh;
  }

  #root {
    height : 100%;
    width : 100%;
    position : absolute;
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
    display : flex;
    flex-direction: column; 
    // display - flex direction 하고서 maincontainer에 min-height : 0,flex : 1 주니깐 content가 화면 밖 벗어나던거 해결
    // flex : 1 === flex : 1 1 0 (flex-grow, shrink 1 주었으니 div는 window-size만큼 작아지고 커짐!)
    align-items : center;
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
  }

  #modal {
    height : 100%;
    width : 100%;
    position : absolute;
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
  }

  a {
    color : black;
    text-decoration: none;
  }

  // 스크롤 해도 nav 고정시키는 방법
  section {
    overflow-y: auto;
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
  }
  aside {
    overflow-y: auto;
    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
    }
  }

`;

export default GlobalStyle;
