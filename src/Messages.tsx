import React, { useEffect, useState } from 'react';
import './Messages.css';
import { connect } from 'react-redux';
import type { RootState } from './store';

interface MessagesProps {
  messages?: string[];
  postMessage?: (v: string) => void;
}

const noop = () => {};
export function Messages({ messages = [], postMessage = noop }: MessagesProps) {
  const [newMessage, setNewMessage] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    postMessage(newMessage);
    setNewMessage('');
  };

  useEffect(() => {
    if (messages[messages.length - 1] === 'ping') {
      setTimeout(() => {
        postMessage('pong');
      }, 500);
    }
  }, [messages]);

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
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
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

const mapDispatchToProps = (dispatch: any) => ({
  postMessage: (value: string) => dispatch({ type: 'POST_MESSAGE', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
