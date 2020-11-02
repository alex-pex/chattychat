import { configureStore } from '@reduxjs/toolkit';

type Action =
  | { type: '@@INIT' }
  | { type: 'RESET' }
  | { type: 'POST_MESSAGE'; value: string };

const initialState = { initialized: true, messages: [] as string[] };
export type RootState = typeof initialState;

export const reducer = (state = initialState, action: Action) => {
  if (action.type === 'RESET') return initialState;
  if (action.type === 'POST_MESSAGE') {
    return { ...state, messages: [...state.messages, action.value] };
  }
  return state;
};

export default configureStore({
  reducer,
});
