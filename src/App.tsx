import React, { useState } from 'react';
import './App.css';

interface AppProps {
  usersCount: number;
  messages: Array<{ username: string; message: string }>;
  sendMessage: (text: string) => void;
}

export function App({ usersCount, messages, sendMessage }: AppProps) {
  const [text, setText] = useState('');
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(text);
    setText('');
  };

  return (
    <div className="App">
      <h2>This is Chatty chat!</h2>
      <h3>{usersCount} users are in!</h3>

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

export default App;
