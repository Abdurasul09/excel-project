import { createStore } from "./createStore";

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD") {
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe("createStore:", () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test("should return store object", () => {
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test("it should return store as a object", () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test("it should return initialState", () => {
    expect(store.getState()).toEqual(initialState);
  });

  test("it should change if actions exist", () => {
    store.dispatch({ type: "ADD" });
    expect(store.getState().count).toBe(1);
  });

  test("it should NOT change if action don't exist", () => {
    store.dispatch({ type: "NOT_EXISTING_ACTION" });
    expect(store.getState().count).toBe(0);
  });

  test("it should call subscriber function", () => {
    store.subscribe(handler);
    store.dispatch({ type: "ADD" });

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test("it should NOT call sub if unsubscribe", () => {
    const sub = store.subscribe(handler);
    sub.unSubscribe();
    store.dispatch({ type: "ADD" });

    expect(handler).not.toHaveBeenCalled();
  });

  test("it should dispatch async way", () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: "ADD" });
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
