import { configureStore } from '@reduxjs/toolkit';

type Message = { username: string; message: string };
type Action = { type: '@@INIT' } | { type: 'POST_MESSAGE'; payload: Message };

const initialState = { initialized: true, messages: [] as Message[] };
export type RootState = typeof initialState;

export const reducer = (state = initialState, action: Action) => {
  if (action.type === 'POST_MESSAGE') {
    return { ...state, messages: [...state.messages, action.payload] };
  }
  return state;
};

export default configureStore({
  reducer,
});
