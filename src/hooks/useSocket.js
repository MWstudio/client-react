import { useEffect, useState } from 'react';
import { socket } from 'utils/socket';

const useSocket = () => {
  // let u, a;
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [rooms, setRooms] = useState();
  const [chat, setChat] = useState({});

  const [userTyping, setUserTyping] = useState();
  const [typingTimer, setTypingTimer] = useState();

  useEffect(() => {
    socket.on('user', sUser => {
      setUser(sUser);
    });

    socket.on('users', sUsers => {
      setUsers(sUsers);
    });

    socket.on('rooms', sRooms => {
      setRooms(sRooms);
    });

    socket.on('room', roomId => {
      setUser(prevUser => ({ ...prevUser, roomId: roomId }));
    });

    socket.on('chat', message => {
      setChat(prevchat => ({
        ...prevchat,
        [message.room]: {
          messages: [...(prevchat[message.room]?.messages || []), message],
          unread:
            (prevchat[message.room]?.unread || 0) +
            (message.type === 'message' ? 1 : 0),
        },
      }));
    });

    socket.on('typing', username => {
      setUserTyping(username);
    });

    socket.on('stoppedTyping', () => {
      setUserTyping(null);
    });

    // return () => {
    //   console.log('Disconnected from server');
    //   socket.disconnect();
    // };
  }, []);

  const logIn = ({ userid, username, avatar }) => {
    // u = username;
    // a = avatar;
    // console.log('logIn', u, a);
    console.log(socket);
    if (!socket.connected) {
      socket.auth = { userid, username, avatar };
      console.log(socket.auth['username']);
      try {
        socket.connect();
        const user_data = {
          userid: socket.auth['userid'],
          username: socket.auth['username'],
          avatar: socket.auth['avatar'],
        };
        socket.emit('setUpUser', user_data);
      } catch {
        console.log('Cannot connect to chat server');
      }
      console.log(socket);
    }
  };

  const logOut = () => {
    setUser(null);
    sessionStorage.removeItem('sessionId');
    socket.disconnect();
    console.log('User logged out');
  };

  const sendMessage = message => {
    const user_data = {
      userid: socket.auth['userid'],
      username: socket.auth['username'],
      avatar: socket.auth['avatar'],
    };
    socket.emit('message', message, user_data);
  };

  const createRoom = roomName => {
    console.log('emit createRoom');
    socket.emit('createRoom', roomName);
  };

  const updateRoom = roomId => {
    socket.emit('updateRoom', roomId);

    setChat(prevchat => ({
      ...prevchat,
      [user.roomId]: {
        ...prevchat[user.roomId],
        unread: 0,
      },
      [roomId]: {
        ...prevchat[roomId],
        unread: 0,
      },
    }));
  };

  const deleteRoom = roomId => {
    socket.emit('deleteRoom', roomId);
  };

  const quitRoom = roomId => {
    const room_data = {
      id: roomId,
    };

    const user_data = {
      userid: socket.auth['userid'],
      username: socket.auth['username'],
      avatar: socket.auth['avatar'],
    };
    socket.emit('quitRoom', room_data, user_data);
  };

  const typing = () => {
    socket.emit('typing');
    clearTimeout(typingTimer);
    setTypingTimer(null);
  };

  const stoppedTyping = () => {
    if (typingTimer == null) {
      setTypingTimer(
        setTimeout(() => {
          socket.emit('stoppedTyping');
        }, 300),
      );
    }
  };

  const logStates = ({
    showUser = false,
    showUsers = false,
    showRooms = false,
    showChat = false,
  }) => {
    if (showUser) console.log(user);
    if (showUsers) console.log(users);
    if (showRooms) console.log(rooms);
    if (showChat) console.log(chat);
  };

  return {
    socket,
    user,
    users,
    chat,
    setChat,
    rooms,
    logIn,
    logOut,
    sendMessage,
    createRoom,
    updateRoom,
    deleteRoom,
    quitRoom,
    typing,
    stoppedTyping,
    userTyping,
    logStates,
  };
};

export default useSocket;
