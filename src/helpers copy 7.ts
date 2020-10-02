type StateShape = { count: number };
type ActionType =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_COUNT'; value: number };

function reducer(state: StateShape, action: ActionType): StateShape {
  if (action.type === 'INCREMENT') return { ...state, count: state.count + 1 };
  if (action.type === 'DECREMENT') return { ...state, count: state.count - 1 };
  if (action.type === 'SET_COUNT') return { ...state, count: action.value };
  return state;
}

function createStore(initialState: StateShape) {
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

const store = createStore({ count: 0 });

export default store;
