import axios from "axios";
import {
  SHOW_SHOPS,
  SHOW_SHOP,
  CREATE_SHOPS,
  UPDATE_SHOPS,
  FILTER_SHOPS,
  ERROR_SHOP,
  IS_SUCCESS_SHOP,
  CLEAR_ALERT
} from "../type";

export const showShops = (shops) => ({
  type: SHOW_SHOPS,
  shops
});

export const showShop = (shop) => ({
  type: SHOW_SHOP,
  shop
});

export const createShops = (shop) => ({
  type: CREATE_SHOPS,
  shop
});

export const filterShops = (id) => ({
  type: FILTER_SHOPS,
  id
});

export const updateShops = (data) => ({
  type: UPDATE_SHOPS,
  data
});

export const setShopErrors = (error) => ({
  type: ERROR_SHOP,
  error
});

export const shopSuccess = (isSuccess) => ({
  type: IS_SUCCESS_SHOP,
  isSuccess
});

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const getShops = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops"
      );
      const result = response.data.data.map((data) => {
        return {
          ...data,
          key: data.id
        };
      });
      if (response.status === 200) {
        dispatch(showShops(result));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setShopErrors("There was an error during Showing....!"));
      } else {
        dispatch(setShopErrors("There was an error during Showing....!"));
      }
    }
  };
};

export const getShop = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showShop(result));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setShopErrors("There was an error during Updating a Data....!"));
      } else {
        dispatch(setShopErrors("There was an error during Updating a Data....!"));
      }
    }
  };
};

export const saveShops = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops",
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      if (response.status === 201) {
        dispatch(createShops(result));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setShopErrors("There was an error during Creating....!"));
      } else {
        dispatch(setShopErrors("There was an error during Creating....!"));
      }
    }
  };
};

export const deleteShops = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops/${id}`
      );
      if (response.status === 204) {
        dispatch(filterShops(id));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setShopErrors("There was an error during Deleting....!"));
      } else {
        dispatch(setShopErrors("There was an error during Deleting....!"));
      }
    }
  };
};

export const editShops = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/shops/${id}?_method=put`,
        data
      );
      if (response.status === 201) {
        dispatch(updateShops(data));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(setShopErrors("There was an error during Updating....!"));
      } else {
        dispatch(setShopErrors("There was an error during Updating....!"));
      }
    }
  };
};
