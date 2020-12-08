import React, { useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import type { RootState } from './store';

interface AppProps {
  messages: RootState['messages'];
  sendMessage: (text: string) => void;
}

export function App({ messages = [], sendMessage }: AppProps) {
  const [text, setText] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(text);
    setText('');
  };

  return (
    <div className="App">
      <h2>This is Chatty chat!</h2>

      <ul className="Message-list">
        {messages.map((msg, i) => (
          <li key={i} className="Message-item">
            <span className="Message-author">{msg.username}</span> {msg.message}
          </li>
        ))}
      </ul>
      <form className="Message-form" onSubmit={onSubmit}>
        <input
          className="Message-input"
          type="text"
          name="newMessage"
          placeholder="Type your message"
          autoFocus
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button
          className="Message-submit-button"
          type="submit"
          disabled={!text}
        >
          Send
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(App);
