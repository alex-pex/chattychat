import React from 'react';
import logo from './logo.svg';
import './App.css';

interface AppProps {}

function App({}: AppProps) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('submit!');
  };

  return (
    <div className="App">
      <h2>This is Chatty chat!</h2>
      <ul className="Message-list">
        <li className="Message-item">
          <span className="Message-author">Bot</span> Welcome!
        </li>
      </ul>
      <form className="Message-form" onSubmit={onSubmit}>
        <input
          className="Message-input"
          type="text"
          name="newMessage"
          placeholder="Type your message"
          autoFocus
        />
        <button className="Message-submit-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
