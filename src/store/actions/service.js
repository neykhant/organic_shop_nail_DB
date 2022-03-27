import axios from "axios";
import {
  SHOW_SERVICES,
  CREATE_SERVICES,
  UPDATE_SERVICES,
  FILTER_SERVICES,
  ERROR_ITEM
} from "../type";

export const showServices = (services) => ({
  type: SHOW_SERVICES,
  services
});


export const createServices = (service) => ({
  type: CREATE_SERVICES,
  service
});

export const filterServices = (id) => ({
  type: FILTER_SERVICES,
  id
});

export const updateServices = (data) => ({
  type: UPDATE_SERVICES,
  data
});

export const setServiceError = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getServices = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/services"
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });
      if (response.status === 200) {
        dispatch(showServices(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};

export const saveServices = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/services/batchInsert",
        data
      );
      // console.log(response.data.data);
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };
      // console.log("services", result);
      if (response.status === 201) {
        dispatch(createServices(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};

export const deleteServices = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/services/${id}`
      );
      if (response.status === 204) {
        dispatch(filterServices(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};

export const editServices = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/services/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };

      if (response.status === 201) {
        dispatch(updateServices(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};
