import { reducer } from './store';

const initialState = {
  initialized: true,
  messages: [],
};

describe('[unit] test store.ts', () => {
  test('initial state is correct', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('saves a message on POST_MESSAGE action', () => {
    const newState = reducer(initialState, {
      type: 'POST_MESSAGE',
      value: 'hello',
    });
    expect(newState.messages).toEqual(['hello']);
  });

  it('saves a message on POST_MESSAGE action, with initial values', () => {
    const newState = reducer(
      { ...initialState, messages: ['hello'] },
      { type: 'POST_MESSAGE', value: 'world' },
    );
    expect(newState.messages).toEqual(['hello', 'world']);
  });
});
