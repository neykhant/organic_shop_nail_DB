import {
  SHOW_ITEMS,
  SHOW_ITEM,
  CREATE_ITEMS,
  UPDATE_ITEMS,
  FILTER_ITEMS,
  ERROR_ITEM
} from "../type";

const initialState = {
  items: [],
  item: {},
  error: {}
};

const item = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEMS:
      return {
        items: [...state.items, action.item]
      };
    case SHOW_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case SHOW_ITEM:
      return {
        ...state,
        item: action.item
      };
    case FILTER_ITEMS:
      const filterItems = state.items.filter((item) => item.id !== action.id);
      return {
        ...state,
        items: filterItems
      };
    case UPDATE_ITEMS:
      const index = state.items.findIndex((item) => item.id === action.data.id);
      state.items[index] = action.data;
      return {
        ...state
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default item;
