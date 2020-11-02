import * as React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import App from './App';
import store from './store';

afterEach(() => {
  store.dispatch({ type: 'RESET' });
});

describe('[functional] test the real app', () => {
  test('It displays a message after posting', () => {
    const screen = render(<App />);
    screen.getByText(/This is Chatty chat!/i);

    const input = screen.getByPlaceholderText(
      'Type your message',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello world!' } });

    const button = screen.getByText('Send');
    fireEvent.click(button);

    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('It filters duplicate message', () => {
    const screen = render(<App />);
    screen.getByText(/This is Chatty chat!/i);

    const input = screen.getByPlaceholderText(
      'Type your message',
    ) as HTMLInputElement;
    const button = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: 'world' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'world' } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.click(button);

    expect(screen.queryAllByText('hello').length).toBe(2);
    expect(screen.queryAllByText('world').length).toBe(1);
  });
});
