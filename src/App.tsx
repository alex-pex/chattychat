import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Messages from './Messages';
import './index.css';

const App = () => (
  <Provider store={store}>
    <Messages />
  </Provider>
);

export default App;
