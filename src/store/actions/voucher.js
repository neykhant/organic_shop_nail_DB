import axios from "axios";
import {
  SHOW_VOUCHERS,
  SHOW_VOUCHER,
  CREATE_VOUCHERS,
  UPDATE_VOUCHERS,
  FILTER_VOUCHERS,
  ERROR_VOUCHERS
} from "../type";

export const showVouchers = (vouchers) => ({
  type: SHOW_VOUCHERS,
  vouchers
});

export const setVoucherErrors = (error) => ({
  type: ERROR_VOUCHERS,
  error
});

export const getVouchers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/invoices"
      );
      const result = response.data.data.map((voucher) => {
        return {
          ...voucher,
          key: voucher.id
        };
      });
    //   console.log("rr",result)
      if (response.status === 200) {
        dispatch(showVouchers(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setVoucherErrors(error.response.data.data));
      } else {
        dispatch(setVoucherErrors(error.response.data));
      }
    }
  };
};

// export const getItem = (id) => {
//   return async (dispatch) => {
//     try {
//       // console.log(id);
//       const response = await axios.get(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}`
//       );
//       const result = response.data.data;
//       // console.log(result)
//       if (response.status === 200) {
//         dispatch(showItem(result));
//       }
//     } catch (error) {
//       if (error) {
//         dispatch(setItemErrors(error));
//       } else {
//         dispatch(setItemErrors(error));
//       }
//     }
//   };
// };

// export const saveItems = (data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/batchInsert",
//         data
//       );
//       // console.log(response.data.data)
//       const result = {
//         ...response.data.data,
//         key: response.data.data.id
//       };
//       if (response.status === 201) {
//         dispatch(createItems(result));
//       }
//         // console.log("result",result);
//     } catch (error) {
//       if (error) {
//         dispatch(setItemErrors(error.response.data.data));
//       } else {
//         dispatch(setItemErrors(error.response.data));
//       }
//     }
//   };
// };

// export const deleteItems = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}`
//       );
//       // console.log(response)
//       if (response.status === 204) {
//         dispatch(filterItems(id));
//       }
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setItemErrors(error.response.data.data));
//       } else {
//         dispatch(setItemErrors(error.response.data));
//       }
//     }
//   };
// };

// export const editItems = (id, data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}?_method=put`,
//         data
//       );
//       const result = {
//         ...response.data.data,
//         key: response.data.data.id
//       };
//       // console.log(result);
//       if (response.status === 204) {
//         dispatch(updateItems(result));
//       }
//     } catch (error) {
//       console.log(error);
//       if (error) {
//         dispatch(setItemErrors(error.response.data.data));
//       } else {
//         dispatch(setItemErrors(error.response.data));
//       }
//     }
//   };
// };
