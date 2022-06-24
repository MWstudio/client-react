import React, { useState } from 'react';
import './styles.css';
import { Container, Window } from './styles';
import Main from 'components/Chat/ChatArea/Main';
import Connection from 'utils/connection';

const ChatButton = () => {
  const [show, setShow] = useState(false);
  const onClick = () => setShow(show => !show);

  const client = Connection();

  return (
    <>
      <Container onClick={() => onClick()}>채팅 버튼</Container>
      {show ? (
        <>
          <Window>
            <Main client={client} />
          </Window>
        </>
      ) : null}
    </>
  );
};

export default ChatButton;
