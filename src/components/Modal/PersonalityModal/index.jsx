import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { Divider, InputBase, IconButton, Paper } from '@material-ui/core';
import { triggerPersonalityUpdateModal } from 'store/modules/modal';
import {
  Container,
  ModalButtons,
  CloseButton,
  SaveButton,
  BoxContent,
  BoxLeft,
  PersonalityTag,
  SelectedPersonality,
  SelectedTagsGuide,
  PersonalitySearchBox,
  PersonalitySearchInputContainer,
  PersonalityTagsBox,
  PersonalityUpdateModalContainer,
} from './styles';

const reorder = (list, startIdx, endIdx) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIdx, 1);
  result.splice(endIdx, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  height: '22%',
  margin: '0.1rem 0',
  background: isDragging ? 'lightgreen' : 'none',
  border: '1px solid black',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'auto',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  display: 'flex',
  flexDirection: 'column',
  padding: grid,
  width: '100%',
  height: 300,
  overflow: 'auto',
});

const PersonalityUpdateModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerPersonalityUpdateModal());

  const searchBar = useRef(); // 작업후 focus시키기 위해

  // 선택한 태그들 (react-query로 끌어올 데이터)
  const [selection, setSelection] = useState([
    { id: 3, group: 'MBTI', value: 'INTP' },
    { id: 4, group: 'MBTI', value: 'ISTP' },
  ]);

  // 전체 태그들 (react-query로 끌어올 데이터)
  const [fakeArr, setFakeArr] = useState([
    { id: 1, group: 'MBTI', value: 'INFP' },
    { id: 2, group: 'MBTI', value: 'ENFP' },
    { id: 3, group: 'MBTI', value: 'INTP' },
    { id: 4, group: 'MBTI', value: 'ISTP' },
    { id: 5, group: 'MBTI', value: 'ESFP' },
    { id: 6, group: 'MBTI', value: 'ESTP' },
    { id: 7, group: 'MBTI', value: 'ISFJ' },
    { id: 8, group: '티어', value: 'gold' },
    { id: 9, group: '티어', value: 'SILVER' },
    { id: 10, group: '티어', value: 'Platinum' },
    { id: 11, group: '티어', value: 'Platinumasdadasdadasdasdasdadasdasdas' },
  ]);

  // 선택된 태그에서 x 버튼 누르면 삭제
  const deleteSelectedTag = toDelete => {
    setSelection([...selection.filter(tag => tag !== toDelete)]);
  };

  /* 선택한 태그 드래그 앤 드롭 */
  // 드래그 끝나면 할 일
  const onDragEnd = result => {
    // source : 현재 위치한 droppable의 위치, 인덱스
    // destination : dnd를 마친 후 droppable의 위치, 인덱스

    // 바깥으로 drop 시에
    if (!result.destination) {
      return;
    }

    // 같은 자리에 가져다 두었다면 그냥 리턴
    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      selection,
      result.source.index,
      result.destination.index,
    );

    setSelection(items);
  };

  /* -------------------- */

  // 전체 중 태그 클릭하면 위로 추가 / 삭제
  const clickTag = click => {
    let contains = selection.some(elem => {
      return _.isEqual(click, elem);
    });
    // 만약 selection에 이미 들어있었으면 삭제
    if (contains) {
      console.log(click);
      setSelection([...selection.filter(tag => tag.value !== click.value)]);
    }
    // 만약 selection에 안 들어있으면 추가
    else if (!contains && selection.length < 5) {
      console.log(selection);
      setSelection(() => [...selection, click]);
      if (searchBar) searchBar.current.focus();
    }
  };

  const clearSearchWord = () => {
    if (searchWord) {
      setSearchWord('');
    }
    if (searchBar) searchBar.current.focus();
  };

  // input 창에 검색한 것 onChange로 search word 바꿔주고, filtering해주는 함수
  const [searchWord, setSearchWord] = useState('');
  const filterValues = useCallback(
    tag => {
      return tag.value.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1;
    },
    [searchWord],
  );

  // 만약 검색한 태그가 없으면 새로 추가 하게 해주는 함수
  const addNonExistedPersonality = () => {
    if (searchWord) {
      let tagByte = 0;
      for (let i = 0; i < searchWord.length; i++) {
        let char = searchWord.charAt(i);
        if (escape(char).length === 6) {
          tagByte += 2; // 한글 2byte
        } else {
          tagByte++; // 한글 1byte
        }
      }
      if (tagByte <= 16 && selection.length < 5) {
        const newTag = {
          id: parseInt(Math.random() * 10000),
          groupt: 'Custom',
          value: `${searchWord}`,
        };
        setSelection([...selection, newTag]);
      } else {
        alert('그만'); // 초과
      }
    }
  };

  // 상단 저장 버튼 클릭하면 제출 (바로 서버로 제출);
  const personalityUpdateSubmit = () => {
    console.log(selection);
  };

  return (
    <PersonalityUpdateModalContainer>
      <Container>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <h4 className="title">성향 업데이터</h4>
          <SaveButton
            color="primary"
            variant="contained"
            onClick={personalityUpdateSubmit}
          >
            저장
          </SaveButton>
        </ModalButtons>
        <Divider />
        <BoxContent>
          <BoxLeft>
            <PersonalitySearchBox>
              <PersonalitySearchInputContainer>
                <SearchIcon />
                <InputBase
                  inputRef={searchBar}
                  autoFocus
                  value={searchWord}
                  type="text"
                  onChange={e => setSearchWord(e.target.value)}
                />
                <div className="buttons">
                  <IconButton>
                    <ClearIcon onClick={clearSearchWord} />
                  </IconButton>
                  <IconButton onClick={addNonExistedPersonality}>
                    <AddIcon />
                  </IconButton>
                </div>
              </PersonalitySearchInputContainer>
            </PersonalitySearchBox>
            <PersonalityTagsBox>
              {fakeArr.filter(filterValues).map(tag => {
                // tag는 fakeArr에서 골라진 친구, elem은 selection 내에서의
                let contains = selection.some(elem => {
                  return _.isEqual(tag, elem);
                });
                //console.log(contains); // 너무 많이 re-rendering되는 것이 아닌가 하는 우려
                if (contains) {
                  return (
                    <PersonalityTag
                      clickable
                      variant="contained"
                      color="primary"
                      label={tag.value}
                      key={tag.value}
                      onClick={() => clickTag(tag)}
                    />
                  );
                } else {
                  return (
                    <PersonalityTag
                      clickable
                      variant="outlined"
                      label={tag.value}
                      key={tag.value}
                      onClick={() => clickTag(tag)}
                    />
                  );
                }
              })}
              {fakeArr.filter(filterValues).length === 0 && (
                <p>검색 기록이 없으면 + 버튼을 눌러서 직접 추가하세요</p>
              )}
            </PersonalityTagsBox>
          </BoxLeft>
          <Divider orientation="horizontal" />
          <SelectedPersonality>
            <p>선택한 성향 (5개)</p>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <Paper
                    elevation={1}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {selection &&
                      selection.map((tag, index) => {
                        return (
                          <Draggable
                            key={tag.id}
                            draggableId={tag.value}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style,
                                )}
                              >
                                <PersonalityTag
                                  clickable
                                  value={tag.value}
                                  key={tag.value}
                                  label={tag.value}
                                  onDelete={() => deleteSelectedTag(tag)}
                                />
                                <IconButton
                                  disableRipple
                                  {...provided.dragHandleProps}
                                >
                                  <ControlCameraIcon />
                                </IconButton>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </DragDropContext>
            {selection.length !== 0 && (
              <SelectedTagsGuide>
                * 선택한 태그를 드래그하여 보여줄 순서를 정해주세요 *
              </SelectedTagsGuide>
            )}
          </SelectedPersonality>
        </BoxContent>
      </Container>
    </PersonalityUpdateModalContainer>
  );
};

export default PersonalityUpdateModal;

// https://r4bb1t.tistory.com/26 DND 설명
