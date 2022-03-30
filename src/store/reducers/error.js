import { ADD_ERROR, REMOVE_ERROR } from "store/types.js";

const initialState = {
  message: "errorss",
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        message: action.error,
      };

    case REMOVE_ERROR:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

export default error;