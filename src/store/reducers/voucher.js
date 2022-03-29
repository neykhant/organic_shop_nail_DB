import {
  SHOW_VOUCHERS,
  SHOW_VOUCHER,
  CREATE_VOUCHERS,
  UPDATE_VOUCHERS,
  FILTER_VOUCHERS,
  ERROR_VOUCHERS
} from "../type";

const initialState = {
  vouchers: [],
  voucher: {},
  error: {}
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_VOUCHERS:
        return {
          ...state,
          vouchers: action.vouchers
        };
    case ERROR_VOUCHERS:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default item;
