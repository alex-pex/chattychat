import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import store from './store';
import App from './App';
import './index.css';

const socket = io('https://socketio-chat-h9jt.herokuapp.com/', {
  transports: ['websocket'],
});

const username = `test_${Math.ceil(new Date().valueOf() / 100) - 16074448931}`;
socket.on('connect', () => {
  socket.emit('add user', username);
});

socket.on('new message', (data: { username: string; message: string }) => {
  store.dispatch({
    type: 'POST_MESSAGE',
    payload: data,
  });
});

const sendMessage = (message: string) => {
  store.dispatch({
    type: 'POST_MESSAGE',
    payload: { username, message },
  });
  socket.emit('new message', message);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App sendMessage={sendMessage} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
