
import { configureStore } from '@reduxjs/toolkit';

const initialState = { initialized: true };
const reducer = (state = initialState) => state;

export default configureStore({
  reducer,
});
