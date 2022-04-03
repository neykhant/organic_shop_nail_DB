import { SET_REPORTS } from "../type";

const initialState = {
  report: [],
};

const report = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        report: [action.report],
      };
    default:
      return state;
  }
};

export default report;
