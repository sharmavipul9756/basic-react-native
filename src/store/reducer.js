import { Addition, Subtraction } from "./actionType";

const initialState = {
  counter: 0,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case Addition:
      return { ...state, counter: state.counter + 1 };
    case Subtraction:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};
