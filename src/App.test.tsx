import * as React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe('[unit] test App.tsx', () => {
  test('renders learn react link', () => {
    const { getByText, queryByText } = render(<App />);
    const linkElement = getByText(/This is Chatty chat!/i);
    expect(linkElement).toBeInTheDocument();

    const message = queryByText(/hello/);
    expect(message).not.toBeInTheDocument();
  });

  test('displays messages', () => {
    const { getByText } = render(<App messages={['hello']} />);
    const message = getByText(/hello/);
    expect(message).toBeInTheDocument();
  });

  test('filters duplicate messages', () => {
    const { queryAllByText } = render(
      <App messages={['hello', 'world', 'world', 'hello']} />,
    );

    // expected: hello, world, hello
    const helloMsgs = queryAllByText(/hello/);
    const worldMsgs = queryAllByText(/world/);
    expect(helloMsgs.length).toBe(2);
    expect(worldMsgs.length).toBe(1);
  });
});
