import {
    SHOW_STOCKS,
  CREATE_PURCHASES,
  UPDATE_PURCHASES,
  FILTER_PURCHASES,
  ERROR_PURCHASES
  } from "../type";
  
  const initialState = {
    stocks: [],
    error: {}
  };
  
  const item = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_PURCHASES:
        return {
            purchases: [...state.purchases, action.purchase]
        };
      case SHOW_STOCKS:
        return {
          ...state,
          stocks: action.stocks
        };
      case FILTER_PURCHASES:
        const filterStocks = state.stocks.filter((stock) => stock.id !== action.id);
        return {
          ...state,
          stocks: filterStocks
        };
      case UPDATE_PURCHASES:
        const index = state.items.findIndex((item) => item.id === action.data.id);
        state.items[index] = action.data;
        return {
          ...state
        };
      case ERROR_PURCHASES:
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default item;
  