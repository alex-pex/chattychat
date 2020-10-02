type StateShape = {};

let state: StateShape = {};

const store = {
  getState(): StateShape {
    return state;
  },
};

export default store;
