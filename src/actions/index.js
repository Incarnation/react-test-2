import {
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTALS_SUCCESS
} from "./types";

import axios from "axios";

const featchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

export const fetchRentals = () => {
  return dispatch => {
    axios
      .get("/api/v1/rentals")
      .then(res => {
        return res.data;
      })
      .then(rentals => {
        dispatch(featchRentalsSuccess(rentals));
      });
  };
};

export const featchRentalById = id => {
  return function(dispatch) {
    dispatch(featchRentalByIdInit());

    //send request to server async
    axios
      .get(`/api/v1/rentals/${id}`)
      .then(res => {
        return res.data;
      })
      .then(rental => {
        dispatch(featchRentalByIdSuccess(rental));
      });
  };
};

const featchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals: rentals
  };
};

const featchRentalByIdSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental: rental
  };
};

// USER User Authorization and Registration ACTIONS ---------------------------

//register user action creator
export const register = userData => {
  return axios
    .post("/api/v1/users/register", userData)
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};
