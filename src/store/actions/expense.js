import axios from "axios";
import {
  SHOW_EXPENSES,
  SHOW_EXPENSE,
  CREATE_EXPENSES,
  UPDATE_EXPENSES,
  FILTER_EXPENSES,
  ERROR_EXPENSE
} from "../type";


export const showExpenses = (expenses) => ({
  type: SHOW_EXPENSES,
  expenses
});

export const showExpense = (expense) => ({
  type: SHOW_EXPENSE,
  expense
});

export const createExpenses = (expense) => ({
  type: CREATE_EXPENSES,
  expense
});

export const filterExpenses = (id) => ({
  type: FILTER_EXPENSES,
  id
});

export const updateExpenses = (data) => ({
  type: UPDATE_EXPENSES,
  data
});

export const setExpenseError = (error) => ({
  type: ERROR_EXPENSE,
  error
});

export const getExpenses = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expenses"
      );
      const result = response.data.data.map((expense) => {
        return {
          ...expense,
          key: expense.id
        };
      });

      // console.log("show",result)
      if (response.status === 200) {
        dispatch(showExpenses(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseError(error.response.data.data));
      }
    }
  };
};

export const getExpense = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expenses/${id}`
      );
      const result = response.data.data;
      // console.log(result)
      if (response.status === 200) {
        dispatch(showExpense(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setExpenseError(error));
      } else {
        dispatch(setExpenseError(error));
      }
    }
  };
};

export const saveExpenses = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expenses/batchInsert",
        data
      );
      const result = response.data.data.map((expense) => {
        return {
          ...expense,
          key: expense.id
        };
      });
      // console.log("save",result);
      if (response.status === 201) {
        dispatch(createExpenses(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseError(error.response.data.data));
      } else {
        dispatch(setExpenseError(error.response.data));
      }
    }
  };
};

export const deleteExpenses = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expenses/${id}`
      );
      if (response.status === 204) {
        dispatch(filterExpenses(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseError(error.response.data.data));
      } else {
        dispatch(setExpenseError(error.response.data));
      }
    }
  };
};

export const editExpenses = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/expenses/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result)
      if (response.status === 201) {
        dispatch(updateExpenses(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setExpenseError(error.response.data.data));
      } 
    }
  };
};
