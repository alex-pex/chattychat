import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import App from './App';
import './index.css';

const username = `test_${Math.ceil(new Date().valueOf() / 100) - 16074448931}`;

function AppWithSocket() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  const usersCount = useSelector((state) => state.usersCount);

  const socket = useRef<SocketIOClient.Socket>();

  useEffect(() => {
    socket.current = io('https://socketio-chat-h9jt.herokuapp.com/', {
      transports: ['websocket'],
    });
    socket.current.on('connect', () => {
      socket.current?.emit('add user', username);
    });

    socket.current.on(
      'new message',
      (data: { username: string; message: string }) => {
        dispatch({
          type: 'POST_MESSAGE',
          payload: data,
        });
      },
    );

    // Whenever the server emits 'login', 'user joined' or 'user left'
    // update the user count
    const updateUsersCount = (data: { numUsers: number }) => {
      dispatch({ type: 'SET_USERS_COUNT', value: data.numUsers });
    };

    socket.current.on('login', updateUsersCount);
    socket.current.on('user joined', updateUsersCount);
    socket.current.on('user left', updateUsersCount);
  }, [dispatch]);

  const sendMessage = (message: string) => {
    dispatch({
      type: 'POST_MESSAGE',
      payload: { username, message },
    });
    socket.current?.emit('new message', message);
  };

  return (
    <App
      usersCount={usersCount}
      messages={messages}
      sendMessage={sendMessage}
    />
  );
}

export default AppWithSocket;
