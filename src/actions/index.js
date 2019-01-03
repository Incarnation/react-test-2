import {
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTALS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from "./types";

import axios from "axios";

const featchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

//action creator to fetch all the listing on the
//index page when the page gets fetch
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

//fetch individual rental by id
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
  return axios.post("/api/v1/users/register", { ...userData }).then(
    //when success
    res => {
      return res.data;
    },
    //when fail
    err => {
      return Promise.reject(err.response.data.errors);
    }
  );
};

//login action creater
export const login = userData => {
  //async call
  return dispatch => {
    return axios
      .post("/api/v1/users/auth", { ...userData })
      .then(
        //when success
        res => res.data
      )
      .then(token => {
        debugger;
        //when success
        localStorage.setItem("auth_token", token);
        dispatch(loginSuccess(token));
      })
      .catch(error => {
        debugger;
        //when fail
        dispatch(loginFailure(error.response.data.errors));
      });
  };
};

//function to dispatch when success
const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    token: token
  };
};

//function to dispatch when failed
const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors: errors
  };
};
