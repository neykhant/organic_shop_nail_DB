import axios from "axios";
import {
  SHOW_ITEMS,
  SHOW_ITEM,
  CREATE_ITEMS,
  UPDATE_ITEMS,
  FILTER_ITEMS,
<<<<<<< HEAD
  ERROR_ITEM,
  
  ADD_ERROR,
  REMOVE_ERROR,
  SET_LOADING,
  SET_SUCCESS
} from "../type";
import { serverErrorMessage } from "../../util/messages";
=======
  ERROR_ITEM
} from "../type";
import { apiUrl } from "../../constants/url";
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4

export const showItems = (items) => ({
  type: SHOW_ITEMS,
  items
});

export const showItem = (item) => ({
  type: SHOW_ITEM,
  item
});

export const createItems = (item) => ({
  type: CREATE_ITEMS,
  item
});

export const filterItems = (id) => ({
  type: FILTER_ITEMS,
  id
});

export const updateItems = (data) => ({
  type: UPDATE_ITEMS,
  data
});

export const setItemErrors = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getItems = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}items`
      );
<<<<<<< HEAD
      const result = response.data.data.map((d) => ({
        ...d,
        key: Math.random() * 100
      }));
=======
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
      // console.log(result)
      if (response.status === 200) {
        dispatch(showItems(result));
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_LOADING });
  };
};

export const getItem = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      // console.log(id);
      const response = await axios.get(
        `${apiUrl}items/${id}`
      );
      const result = response.data.data;
      // console.log(result)
      if (response.status === 200) {
        dispatch(showItem(result));
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_LOADING });
  };
};

export const saveItems = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}items/batchInsert`,
        data
      );
<<<<<<< HEAD
      const result = response.data.data.map((d) => ({
        ...d,
        key: d.id
      }));
      if (response.status === 201) {
        dispatch(createItems(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
=======
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result)
      dispatch(createItems(result));
>>>>>>> 8724a57e2006ec90da33b9eee00e2e1dc7e0c1d4
    } catch (error) {
      const { status, data } = error.response;
      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      } else if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const deleteItems = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.delete(
        `${apiUrl}/items/${id}`
      );
      // console.log(response)
      if (response.status === 204) {
        dispatch(filterItems(id));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const editItems = (id, data) => {
  return async (dispatch) => {
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
    try {
      const response = await axios.post(
        `${apiUrl}items/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log(result);
      if (response.status === 204) {
        dispatch(updateItems(result));
        dispatch({ type: SET_SUCCESS, payload: true });
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 400) {
        dispatch({
          type: ADD_ERROR,
          payload: "The code has already been taken"
        });
      } else if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      } else if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_SUCCESS, payload: false });
    dispatch({ type: SET_LOADING });
  };
};

export const getBestItem = (query) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING });

    try {
      const response = await axios.get(
        `${apiUrl}items/bestItem?${new URLSearchParams(
          query
        ).toString()}`
      );
      // console.log(query.best);
      if (query.best) {
        const result = response.data.data.map((item) => {
          return {
            ...item,
            key: Math.random() * 100
          };
        });
        dispatch(showItems(result));
        dispatch({
          type: REMOVE_ERROR
        });
      } else {
        const result = response.data.data.map((item) => {
          return {
            ...item,
            key: Math.random() * 100
          };
        });
        dispatch(showItems(result));
        dispatch({
          type: REMOVE_ERROR
        });
      }
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("jwtToken");
        dispatch({
          type: ADD_ERROR,
          payload: data.message
        });
      }

      if (status >= 400) {
        dispatch({
          type: ADD_ERROR,
          payload: serverErrorMessage
        });
      }
    }
    dispatch({ type: SET_LOADING });

  };
};
