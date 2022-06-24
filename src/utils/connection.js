import React, { useEffect, useContext } from 'react';
import useSocket from 'hooks/useSocket';
import { CurrentUserContext } from 'App';

const Connection = () => {
  const currentUser = useContext(CurrentUserContext);

  // function makeid(length) {
  //   var result = '';
  //   var characters =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  // TODO: 로그인한 유저의 정보 가져와야함
  let userid = currentUser ? currentUser.user.unique_id : null;
  let username = currentUser ? currentUser.user.nickname : null;
  let avatar = 'https://semantic-ui.com/images/avatar2/small/patrick.png';

  const client = useSocket();

  useEffect(() => client.logIn({ userid, username, avatar }), []);

  return client;
};

export default Connection;
