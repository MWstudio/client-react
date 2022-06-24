import styled from 'styled-components';
import { primaryDarkColor } from 'styles/variables';
import { Popover } from '@material-ui/core';

export const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  padding: 16px;
  height: 100%;
  width: 100%;
  //? border: solid black 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  img {
    width: 28px;
  }
  .roomHeader {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .gameInfo {
      font-size: 10px;
    }
  }
`;

export const UserList = styled.div``;

export const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #ededed;
  &:hover {
    /* transform: translateX(10%); */
    color: ${primaryDarkColor};
  }
  .main {
    width: 100%;
    justify-content: space-between;
    .item1 {
      text-align: start;
      flex-basis: 60%;
      img {
        margin-right: 8px;
      }
    }
    .item2 {
      flex-basis: 15%;
    }
    .item3 {
      flex-basis: 15%;
    }
  }
  .more {
    align-items: end;
    text-align: end;
    font-size: 10px;
  }
`;

export const RankBox = styled.span`
  display: inline-block;
  border: 0.5px solid grey;
  background: ${props => props.color};
  padding: 1px;
  border-radius: 4px;
  margin: auto;
  width: 28px;
  text-align: center;
`;

export const RoomDetail = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  .detailbox {
    width: 200px;
    margin: 10px;
    border: 1px solid #bdbdbd;
    .detailheader {
      height: 30px;
      background: #bdbdbd;
      color: white;
    }
    div {
      flex-basis: 80px;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

export const BottomButtons = styled.div`
  margin: 0 auto;
  margin-bottom: 3rem;
`;
