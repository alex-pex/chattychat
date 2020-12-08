import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import type { RootState } from './store';

interface AppProps {
  messages?: string[];
}

export function App({ messages = [] }: AppProps) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('submit!');
  };

  return (
    <div className="App">
      <h2>This is Chatty chat!</h2>

      <ul className="Message-list">
        {messages.map((msg, i) => (
          <li key={i} className="Message-item">
            <span className="Message-author">Message</span> {msg}
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
        />
        <button className="Message-submit-button" type="submit">
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
