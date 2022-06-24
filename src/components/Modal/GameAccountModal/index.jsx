import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  triggerGameAccountModal,
  triggerAccountEnrollmentModal,
} from 'store/modules/modal';
import LOL from 'assets/images/Game/lol.svg';
import OVERWATCH from 'assets/images/Game/overwatch.svg';
import PUBG from 'assets/images/Game/pubg.svg';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';
import { Switch, IconButton } from '@material-ui/core';
import {
  GameAccountModalContainer,
  MainContainer,
  ModalButtons,
  CloseButton,
  SaveButton,
  ModalContent,
  GameConnnectGuide,
  GameConnection,
  EnrolledGameBackground,
  EnrolledGame,
  AccountChip,
} from './styles';

const reorder = (list, startIdx, endIdx) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIdx, 1);
  result.splice(endIdx, 0, removed);

  return result;
};

const GameAccountModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(triggerGameAccountModal());

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

    const items = reorder(data, result.source.index, result.destination.index);

    setData(items);
  };

  // https://merrily-code.tistory.com/76   데이터 update 이후 다시 받게

  /* react-query로 받아올 데이터 */
  const [data, setData] = useState([
    {
      key: 0,
      game: 'League of Legends',
      image: `${LOL}`,
      accounts: [
        { key: 0, server: 'KR', ID: 'SCRIMDOR', certified: true },
        { key: 1, server: 'KR', ID: '뉴욕 카서스', certified: false },
      ],
      checked: true,
    },
    {
      key: 1,
      game: 'Overwatch',
      image: `${OVERWATCH}`,
      accounts: [{ key: 0, server: 'KR', ID: '조향래', certified: true }],
      checked: true,
    },
    {
      key: 2,
      game: 'PUBG',
      image: `${PUBG}`,
      accounts: [
        { key: 0, server: 'KR', ID: 'NoChatNoAngry', certified: true },
        { key: 1, server: 'KR', ID: '뉴욕 카서스', certified: false },
        { key: 2, server: 'KR', ID: '조향래', certified: true },
      ],
      checked: false,
    },
  ]);

  /* form */
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [data[0].game]: data[0].checked,
      [data[1].game]: data[1].checked,
      [data[2].game]: data[2].checked,
      // 우선 순위 priority도 데이터에 넣는 방법 vs 배열로 바꿔서 서버에 전달해주는 방법
    },
  });

  const onGameEnrollmentSubmit = data => {
    console.log(data);
  };

  return (
    <GameAccountModalContainer>
      <MainContainer>
        <ModalButtons>
          <CloseButton onClick={closeModal} />
          <h4 className="title">게임 계정 등록</h4>
          <SaveButton
            color="primary"
            variant="contained"
            onClick={handleSubmit(onGameEnrollmentSubmit)}
          >
            저장
          </SaveButton>
        </ModalButtons>
        <ModalContent>
          <GameConnnectGuide>
            <div className="guide">
              <span>
                <strong>당신의 게임과 소셜 계정을 연동해보세요</strong>
              </span>
              <span>(게임별 최대 3개)</span>
            </div>
            <span
              className="connection"
              onClick={() => dispatch(triggerAccountEnrollmentModal())}
            >
              등록할 게임 선택
            </span>
          </GameConnnectGuide>
          <GameConnection>
            <form onSubmit={e => e.preventDefault()}>
              <h5>연결됨</h5>
              <div>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <EnrolledGameBackground
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {data &&
                          data.map((game, index) => {
                            return (
                              <Draggable
                                key={game.key}
                                draggableId={game.game}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <EnrolledGame
                                    elevation={0}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    isDragging={snapshot.isDragging}
                                    style={{ ...provided.draggableProps.style }}
                                  >
                                    <div className="game">
                                      <div className="description">
                                        <img src={game.image} alt="" />
                                        <span>{game.game}</span>
                                        <span>{` ${game.accounts.length} / 3 `}</span>
                                      </div>
                                      <div className="buttons">
                                        <Controller
                                          control={control}
                                          name={`${game.game}`}
                                          render={({
                                            field: { value, onChange, name },
                                          }) => (
                                            <Switch
                                              name={name}
                                              value={value}
                                              checked={value}
                                              onChange={onChange}
                                            />
                                          )}
                                        />
                                      </div>
                                    </div>
                                    <div className="account">
                                      {game.accounts.map(account => {
                                        return (
                                          <AccountChip key={account.key}>
                                            <span>
                                              <strong>{account.server}</strong>
                                            </span>
                                            <span>{account.ID}</span>
                                            <CheckCircleIcon color="primary" />
                                          </AccountChip>
                                        );
                                      })}
                                      {game.accounts.length < 3 && (
                                        <IconButton>
                                          <AddIcon></AddIcon>
                                        </IconButton>
                                      )}
                                    </div>
                                  </EnrolledGame>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </EnrolledGameBackground>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </form>
          </GameConnection>
        </ModalContent>
      </MainContainer>
    </GameAccountModalContainer>
  );
};

export default GameAccountModal;
