export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: "__INIT__" });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unSubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },

    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  };
}
