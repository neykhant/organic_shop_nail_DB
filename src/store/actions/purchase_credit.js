import axios from "axios";
import {
  CREATE_PURCHASE_CREDITS,
  FILTER_PURCHASE_CREDITS,
  ERROR_PURCHASE_CREDITS,
  IS_SUCCESS_PURCHASE_CREDITS
} from "../type";
import { apiUrl } from "../../constants/url";

export const createPurchaseCredits = (purchase_credit) => ({
  type: CREATE_PURCHASE_CREDITS,
  purchase_credit
});

export const filterPurchaseCredits = (id) => ({
  type: FILTER_PURCHASE_CREDITS,
  id
});

export const setPurchaseCreditErrors = (error) => ({
  type: ERROR_PURCHASE_CREDITS,
  error
});

export const purchaseCreditSuccess = (isSuccess) => ({
  type: IS_SUCCESS_PURCHASE_CREDITS,
  isSuccess
});

export const savePurchaseCredits = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}purchase-credits`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      //   console.log(result)
      if (response.status === 201) {
        dispatch(createPurchaseCredits(result));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(
          setPurchaseCreditErrors("There was an error during Creating....!")
        );
      }
    }
  };
};

export const deletePurchaseCredits = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}purchase-credits/${id}`
      );
      console.log(response)
      if (response.status === 204) {
        dispatch(filterPurchaseCredits(id));
      }
    } catch (error) {
      if (error.response.status >= 400) {
        dispatch(
          setPurchaseCreditErrors("There was an error during Deleting....!")
        );
      }
    }
  };
};
