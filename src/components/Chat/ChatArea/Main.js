import React, { useState, useEffect, useRef } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Main = ({
  client: {
    user,
    chat,
    rooms,
    updateRoom,
    deleteRoom,
    quitRoom,
    sendMessage,
    typing,
    userTyping,
    stoppedTyping,
  },
}) => {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const chatBottomRef = useRef(null);
  const emojiSelector = useRef();

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat, user.roomId]);

  // keyup for message input
  const handleKeyUp = (e, message) => {
    if (e.keyCode === 13) {
      if (message !== '') {
        sendMessage(message);
        setMessage('');
        setShowEmoji(false);
      }
    }
  };

  const handleEmojiKeyUp = e => {
    if (e.keyCode === 13) {
      sendMessage(message);
      setMessage('');
      setShowEmoji(false);
    }
  };

  const handleMessageChange = e => {
    setMessage(e.target.value);
    typing();
  };

  const addEmoji = e => {
    let emoji = e.native;
    setMessage(prevMessage => prevMessage + emoji);
  };

  const handleAppClick = e => {
    if (showEmoji && !emojiSelector.current.contains(e.target)) {
      setShowEmoji(false);
    }
  };

  const handleMessageSubmit = () => {
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="chat_app" onClick={e => handleAppClick(e)}>
      <div className="left_sidebar">
        <div className="logo_text">
          <span>채팅</span>
        </div>

        <div className="profile_info">
          <img src={user.avatar} className="avatar_profile" alt="" />
          <span>{user.username}</span>
        </div>

        <span style={{ alignSelf: 'flex-start', fontWeight: '600' }}>
          Users
        </span>
        <div className="active_users_list">
          {rooms?.map(room =>
            room.id === user.roomId
              ? room.members.map(u => {
                  if (u) {
                    return (
                      <div className="user_card">
                        <img src={u.avatar} className="small_img" alt="" />
                        <span>{u.username}</span>
                      </div>
                    );
                  }
                })
              : null,
          )}
        </div>
      </div>

      <div className="chat_area">
        <div className="chat_bg">
          <div className="chat">
            {chat &&
              chat[user.roomId]?.messages?.map((msg, idx) => {
                if (msg.type === 'info') {
                  return (
                    <div className="announcement" key={idx}>
                      <span>{msg.content}</span>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={
                        msg.userId === user.userId
                          ? 'message_holder me'
                          : 'message_holder'
                      }
                      key={idx}
                    >
                      <img src={msg.avatar} className="small_img" alt="" />
                      <div className="message_box">
                        <div className="message">
                          <span className="message_name">{msg.username}</span>
                          <span className="message_text">{msg.content}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}

            {/* Bottom div ref for auto scroll */}
            <div ref={chatBottomRef} />
          </div>

          <div style={{ marginLeft: 15, color: '#f48235' }}>
            <i>
              {userTyping &&
                userTyping !== user.username &&
                `Typing ${userTyping}`}
            </i>
          </div>

          <div className="chat_input" style={{ position: 'relative' }}>
            {showEmoji && (
              <span
                ref={el => (emojiSelector.current = el)}
                onKeyUp={e => handleEmojiKeyUp(e)}
                style={{ position: 'absolute', bottom: 60, left: 0 }}
              >
                <Picker onSelect={addEmoji} emojiSize={20} />
              </span>
            )}

            <FontAwesomeIcon
              icon={faSmile}
              className="smile"
              style={{ marginRight: 8, color: 'grey' }}
              onClick={() => setShowEmoji(prevState => !prevState)}
            />

            <input
              type="text"
              value={message}
              placeholder="Enter message"
              onChange={handleMessageChange}
              onKeyUp={e => {
                handleKeyUp(e, message);
                stoppedTyping();
              }}
            />

            <button
              className="send_message_btn"
              onClick={e => {
                handleMessageSubmit();
              }}
            >
              SEND
            </button>
          </div>
        </div>
      </div>

      <div className="right_sidebar">
        <span style={{ alignSelf: 'flex-start', fontWeight: '600' }}>
          Rooms
        </span>
        <div className="active_rooms_list">
          {rooms?.map(room =>
            room.members.map(u =>
              u && u.userid === user.userid ? (
                <div
                  className={
                    room.id === user.roomId
                      ? 'room_card active_item'
                      : 'room_card'
                  }
                  key={room.id}
                  onClick={() => {
                    updateRoom(room.id);
                  }}
                >
                  <div className="room_item_content">
                    <img src={room.avatar} className="small_img" alt="" />
                    <div className="roomInfo">
                      <span>{room.name}</span>
                    </div>
                  </div>

                  <div className="room_item_controls">
                    <div
                      onClick={() => quitRoom(room.id)}
                      style={{ margin: 3 }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="trash"
                        style={{ color: 'grey' }}
                      />
                    </div>
                    {chat[room.id]?.unread > 0 && room.id !== user.roomId && (
                      <div className="badge">{chat[room.id]?.unread}</div>
                    )}
                  </div>
                </div>
              ) : null,
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
