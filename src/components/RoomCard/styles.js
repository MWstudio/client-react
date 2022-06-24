import styled, { css } from 'styled-components';
import { primaryColor } from 'styles/variables';

export const RowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ColumnFlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  padding: 7px;
  padding-top: 0.7rem;
  border: solid #bdbdbd 1px;
  border-radius: 15px;
  height: 100%;
  min-height: 200px;
  max-height: 600px;
  width: 210px;
  margin-right: 13px;
  margin-top: 10px;
  margin-bottom: 35px;
  align-content: center;
  transition: 150ms all;
  h3 {
    border-top: 0.5px solid #bdbdbd;
    border-bottom: 0.5px solid #bdbdbd;
  }
  &:hover {
    transform: translateY(-1%);
    border: 1.5px solid ${primaryColor};
  }
`;
export const RankBox = styled.span`
  display: inline-block;
  background: ${props => props.color};
  padding: 1px;
  border: 0.5px solid grey;
  border-radius: 4px;
  margin: auto;
  width: 28px;
  text-align: center;
`;

export const UserBox = styled.div`
  padding: 5px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  img {
    width: 20px;
  }
  .item1 {
    text-align: start;
    flex-basis: 100px;
    img {
      margin-right: 5px;
    }
  }
  .item2 {
    flex-basis: 30px;
  }
`;

export const RoomHeader = styled.div`
  text-align: center;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
  }
  img {
    margin-bottom: 5px;
    margin-right: 5px;
    width: 25px;
  }
`;

export const GameDetail = styled.div`
  text-align: start;
  font-size: 10px;
`;

export const BottomBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-basis: 70px;
  .rows {
    text-align: center;
    align-items: center;
    justify-content: start;
    .detailbox {
      background: ${primaryColor};
      color: white;
      padding: 3px;
      padding-left: 5px;
      padding-right: 5px;
      margin-right: 7px;
      border-radius: 10px;
      font-size: 10px;
    }
  }
  .buttons {
    text-align: center;
    align-items: center;
    justify-content: space-evenly;
    .withoutButtons {
      height: 30px;
    }
    button {
      height: 30px;
    }
  }
`;
