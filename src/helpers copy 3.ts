type StateShape = {};
type ActionType = void;

function reducer(state: StateShape, action: ActionType): StateShape {
  return state;
}

let state: StateShape = {};

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
