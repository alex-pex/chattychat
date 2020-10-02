type StateShape = { count: number };
type ActionType = { type: 'INCREMENT' } | { type: 'DECREMENT' };

function reducer(state: StateShape, action: ActionType): StateShape {
  if (action.type === 'INCREMENT') return { ...state, count: state.count + 1 };
  if (action.type === 'DECREMENT') return { ...state, count: state.count - 1 };
  return state;
}

let state: StateShape = { count: 0 };

const store = {
  getState(): StateShape {
    return state;
  },

  dispatch(action: ActionType) {
    state = reducer(state, action);
    return action;
  },
};

export default store;
