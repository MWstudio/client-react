import styled, { css } from 'styled-components';

// nav를 제외한 전체를 아우름
export const MatchingContainer = styled.section`
  background: #f5f5f5;
  padding: 20px;
  align-items: start;
  height: 100%;
  display: flex;
  flex-direction: column;
  // width: 100%;
  //min-width: 680px;
  //max-width: 900px;

  // Masonry
  .my-masonry-grid {
    display: -webkit-box; // Not needed if autoprefixing
    display: -ms-flexbox; // Not needed if autoprefixing
    display: flex;
    width: 100%;
  }
  .my-masonry-grid_column {
    //? padding-left: 10px; // gutter size
    background-clip: padding-box;
    text-align: center;
  }

  // Style your items
  .my-masonry-grid_column > div {
    // change div to reference your elements you put in <Masonry>
    // background: grey;
    margin-bottom: 15px;
  }
`;

export const Search = styled.div`
  width: 100%;
  display: flex;
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #eeeeee;
  padding: 15px;
  border: solid #bdbdbd 1px;
  border-radius: 5px;
  height: 100%;
  min-height: 200px;
  max-height: 400px;
  min-width: 250px;
  max-width: 320px;
  margin-left: 10px;
  margin-rigth: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin: flex;
  align-content: center;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #eeeeee;
  padding: 15px;
  border: solid #bdbdbd 1px;
  border-radius: 5px;
  height: 100%;
  min-height: 200px;
  max-height: 400px;
  min-width: 250px;
  max-width: 320px;
  margin-left: 10px;
  margin-rigth: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin: flex;
  align-content: center;
`;

export const AsideContainer = styled.div`
  display: flex;
  width: 350px;
  height: 100%;
  .chatbox {
    width: 350px;
  }
`;
