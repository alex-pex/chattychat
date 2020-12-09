import { configureStore } from '@reduxjs/toolkit';

type Message = { username: string; message: string };

const initialState = {
  initialized: true,
  messages: [] as Message[],
  usersCount: 0,
};
export type RootState = typeof initialState;

type Action =
  | { type: '@@INIT' }
  | { type: 'POST_MESSAGE'; payload: Message }
  | { type: 'SET_USERS_COUNT'; value: number };

export const reducer = (state = initialState, action: Action) => {
  if (action.type === 'POST_MESSAGE') {
    return { ...state, messages: [...state.messages, action.payload] };
  }
  if (action.type === 'SET_USERS_COUNT') {
    return { ...state, usersCount: action.value };
  }
  return state;
};

export default configureStore({
  reducer,
});
