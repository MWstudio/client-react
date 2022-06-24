import styled from 'styled-components';
import { Popover } from '@material-ui/core';

export const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserPopover = styled(Popover)`
  .MuiPopover-paper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    text-align: center;
    width: 400px;
    height: 800px;
  }
`;

export const SiteProfile = styled.div`
  height: 180px;
  width: 100%;
  background: #dddddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  text-align: start;
  img {
    width: 40px;
  }
  button {
    height: 30px;
  }
  .header {
    align-items: start;
  }
  .nicknames {
    width: 100%;
    justify-content: flex-start;
    .items1 {
      flex-basis: 30px;
    }
    .items2 {
      margin-left: 10px;
      text-align: start;
      flex-basis: 190px;
      h4 {
        margin-bottom: 2px;
      }
      .mannerlv {
        height: 6px;
        width: 80%;
        border-radius: 3px;
        background: white;
        .currentlv {
          height: 6px;
          width: 60%; //?  현재의 매너레벨
          background: #2ce2ee;
          border-radius: 3px;
        }
      }
    }
    .items3 {
      flex-basis: 130px;
      display: flex;
      justify-content: space-between;
      img {
        height: 20px;
        width: 100%;
      }
    }
  }
  .currentFollow {
    div {
      margin-right: 10px;
    }
  }
  .personality {
    margin-bottom: 15px;
    div {
      background: white;
      border: 1px solid black;
      border-radius: 20px;
      padding-left: 10px;
      padding-right: 10px;
      margin-right: 5px;
    }
  }
`;

export const GameProfile = styled.div`
  height: 600px;
  width: 380px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 10px;
`;

export const GamProfileHeader = styled.div`
  //? border: 1px solid;
  width: 380px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 10px;
  padding-left: 10px;
  img {
    height: 50px;
  }
  .Server {
    font-size: 6px;
  }
  .Nickname {
    font-weight: bold;
  }
  .Lv {
    font-size: 9px;
  }
`;

export const GameNickname = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const GameRank = styled.div`
  display: flex;
  display-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  .rank {
    //? border: 1px solid;
    width: 160px;
    .header {
      color: white;
      background: black;
    }
    .rankImage {
      height: 110px;
    }
  }
  img {
    padding-top: 10px;
    height: 100%;
    width: 100px;
  }
`;

export const GameRecent = styled.div`
  //? border: 1px solid;
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .header {
    color: white;
    background: black;
  }

  .summary {
    height: 50px;
    align-items: center;
    justify-content: space-evenly;
    .big {
      font-size: 25px;
    }
  }

  .mostChamps {
    justify-content: space-around;
    img {
      width: 35px;
    }
    .winRate {
      font-size: 5px;
    }
    .champ {
      flex-basis: 110px;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 3px;
      }
    }
  }

  .detail {
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
    }
    .mother {
      justify-content: space-around;
      align-items: center;
      width: 250px;
      height: 30px;
      margin-top: 8px;
    }
    .win {
      background: #daf2ff;
    }
    .lose {
      background: #ffe4e4;
    }
  }
`;
