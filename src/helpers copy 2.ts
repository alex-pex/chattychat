type StateShape = {};
type ActionType = void;

let state: StateShape = {};

const store = {
  getState(): StateShape {
    return state;
  },

  dispatch(action: ActionType) {
    return action;
  },
};

export default store;
