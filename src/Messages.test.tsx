import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Messages } from './Messages';

describe('[unit] test Messages.tsx', () => {
  test('renders learn react link', () => {
    const { getByText, queryByText } = render(<Messages />);
    const linkElement = getByText(/This is Chatty chat!/i);
    expect(linkElement).toBeInTheDocument();

    const message = queryByText(/hello/);
    expect(message).not.toBeInTheDocument();
  });

  test('displays messages', () => {
    const { getByText } = render(<Messages messages={['hello']} />);
    const message = getByText(/hello/);
    expect(message).toBeInTheDocument();
  });

  test.skip('filters duplicate messages', () => {
    const { queryAllByText } = render(
      <Messages messages={['hello', 'world', 'world', 'hello']} />,
    );

    // expected: hello, world, hello
    const helloMsgs = queryAllByText(/hello/);
    const worldMsgs = queryAllByText(/world/);
    expect(helloMsgs.length).toBe(2);
    expect(worldMsgs.length).toBe(1);
  });

  test('calls postMessage function', () => {
    const postMessage = jest.fn();

    const screen = render(
      <Messages messages={['hello']} postMessage={postMessage} />,
    );
    const input = screen.getByPlaceholderText(
      'Type your message',
    ) as HTMLInputElement;
    const button = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'my message' } });
    fireEvent.click(button);

    // assert postMessage is called once, with "my message"
    expect(postMessage).toHaveBeenCalledWith('my message');
  });
});
