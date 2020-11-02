import * as React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('[functional] test the real app', () => {
  test('zzzzzzzzzzzzzz', () => {
    const { getByText, debug } = render(<App />);
    const linkElement = getByText(/This is Chatty chat!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
