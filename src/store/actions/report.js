import axios from "axios";
import { SET_REPORTS } from "../type";

export const setReport = (report) => ({
  type: SET_REPORTS,
  report,
});

export const getReport = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/report/sale?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = {
        ...response.data,
        key: response.data.sale_total,
      };

      dispatch(setReport(result));
    } catch (error) {
      console.log(error);
    }
  };
};
