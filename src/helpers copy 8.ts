type StateShape = { count: number };
type ActionType =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_COUNT'; value: number };

type ReducerFn = (state: StateShape, action: ActionType) => StateShape;

function createStore(reducer: ReducerFn, initialState: StateShape) {
  let state = initialState;

  const store = {
    getState(): StateShape {
      return state;
    },

    dispatch(action: ActionType) {
      state = reducer(state, action);
      return action;
    },
  };

  return store;
}

const store = createStore(
  (state, action) => {
    if (action.type === 'INCREMENT')
      return { ...state, count: state.count + 1 };
    if (action.type === 'DECREMENT')
      return { ...state, count: state.count - 1 };
    if (action.type === 'SET_COUNT') return { ...state, count: action.value };
    return state;
  },
  { count: 0 },
);

export default store;
