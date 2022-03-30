// 


import axios from "axios";
import {
  SHOW_BADITEMS,
  CREATE_BADITEMS,
  UPDATE_BADITEMS,
  FILTER_BADITEMS,
  ERROR_BADITEMS
} from "../type";

export const showBadItems = (baditems) => ({
  type: SHOW_BADITEMS,
  baditems
});


export const createBadItems = (baditem) => ({
  type: CREATE_BADITEMS,
  baditem
});

export const filterBadItems = (id) => ({
  type: FILTER_BADITEMS,
  id
});

// export const updatePurchases = (data) => ({
//   type: UPDATE_BADITEMS,
//   data
// });

export const setBadItemErrors = (error) => ({
  type: ERROR_BADITEMS,
  error
});

export const getBadItems = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/damage-items"
      );
      const result = response.data.data.map((baditem) => {
        return {
          ...baditem,
          key: baditem.id
        };
      });
      // console.log(response.status)
      if (response.status === 200) {
        dispatch(showBadItems(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setBadItemErrors(error.response.data.data));
      } else {
        dispatch(setBadItemErrors(error.response.data));
      }
    }
  };
};

export const saveBadItems = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/damage-items/batchInsert",
        data
      );
      console.log(response);
    } catch (error) {
      if (error) {
        dispatch(setBadItemErrors(error.response.data.data));
      } else {
        dispatch(setBadItemErrors(error.response.data));
      }
    }
  };
};

export const deleteBadItems = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/owner-used-items/${id}`
      );
    //   console.log(response)
      if (response.status === 204) {
      dispatch(filterBadItems(id));
      }
    } catch (error) {
      console.log(error)
      if (error) {
        dispatch(setBadItemErrors(error.response.data.data));
      } else {
        dispatch(setBadItemErrors(error.response.data));
      }
    }
  };
};

// export const editPurchases = (id, data) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/items/${id}?_method=put`,
//         data
//       );
//       // console.log(response);
//       const result = response.data.data;
//       if (response.status === 204) {
//         dispatch(updatePurchases(result));
//       }
//     } catch (error) {
//       console.log(error);
//       // if (error) {
//       //   dispatch(setItemErrors(error.response.data.data));
//       // } else {
//       //   dispatch(setItemErrors(error.response.data));
//       // }
//     }
//   };
// };
