import axios from "axios";
import {
  SHOW_PURCHASES,
  SHOW_PURCHASE,
  SHOW_PURCHASE_REPORT,
  CREATE_PURCHASES,
  UPDATE_PURCHASES,
  FILTER_PURCHASES,
  ERROR_PURCHASES
} from "../type";

export const showPurchases = (purchases) => ({
  type: SHOW_PURCHASES,
  purchases
});

export const showPurchase = (purchase) => ({
  type: SHOW_PURCHASE,
  purchase
});

export const showPurchaseReport = (purchaseReport) => ({
  type: SHOW_PURCHASE_REPORT,
  purchaseReport
});

export const createPurchases = (purchase) => ({
  type: CREATE_PURCHASES,
  purchase
});

export const filterPurchases = (id) => ({
  type: FILTER_PURCHASES,
  id
});

export const updatePurchases = (data) => ({
  type: UPDATE_PURCHASES,
  data
});

export const setPurchaseErrors = (error) => ({
  type: ERROR_PURCHASES,
  error
});


export const getBestPurchase = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchaseReport?${new URLSearchParams(
          query
        ).toString()}`
      );
      // console.log(response.data.data);
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.id
        };
      });
      // console.log(result);
      // dispatch(showPurchases(result));
      dispatch(showPurchaseReport(result));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};

export const getPurchase = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchases/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showPurchase(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};

export const getPurchases = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchases"
      );
      // console.log('ss',response);

      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showPurchases(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      } else {
        dispatch(setPurchaseErrors(error.response.data));
      }
    }
  };
};

export const savePurchases = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchases",
        data
      );
      // console.log(response);
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      } else {
        dispatch(setPurchaseErrors(error.response.data));
      }
    }
  };
};

export const deletePurchases = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchases/${id}`
      );
      // console.log(response)
      dispatch(filterPurchases(id));
      // if (response.status === 204) {
      // }
    } catch (error) {
      console.log(error);
      // if (error.response.status === 404) {
      //   dispatch(setPurchaseErrors(error.response.data.data));
      // } else {
      //   dispatch(setPurchaseErrors(error.response.data));
      // }
    }
  };
};

export const editPurchases = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}?_method=put`,
        data
      );
      // console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updatePurchases(result));
      }
    } catch (error) {
      console.log(error);
      // if (error) {
      //   dispatch(setItemErrors(error.response.data.data));
      // } else {
      //   dispatch(setItemErrors(error.response.data));
      // }
    }
  };
};

export const getPurchaseReport = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/purchaseReport"
      );
      const result = response.data.data.map((purchase) => {
        return {
          ...purchase,
          key: purchase.merchant_id
        };
      });
      // console.log(result)
      if (response.status === 201) {
        dispatch(showPurchaseReport(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setPurchaseErrors(error.response.data.data));
      }
    }
  };
};
