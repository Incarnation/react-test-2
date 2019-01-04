import {
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTALS_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";

import axios from "axios";
import authService from "services/auth-service";
import axiosService from "services/axios-service";

//create axiosService getInstance
const axiosInstance = axiosService.getInstance();

const featchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

//action creator to fetch all the listing on the
//index page when the page gets fetch
export const fetchRentals = () => {
  return dispatch => {
    axiosInstance
      .get("/rentals")
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

//action creaters to be dispatch after getting back the data from api
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

//check auth state action creator
//when the user refresh the pages after login
export const checkAuthState = () => {
  return async dispatch => {
    //debugger;
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  };
};

//login action creater
export const login = userData => {
  //async call
  return async dispatch => {
    return axios
      .post("/api/v1/users/auth", { ...userData })
      .then(
        //when success
        res => res.data
      )
      .then(token => {
        //debugger;
        //when success
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(error => {
        //debugger;
        //when fail
        dispatch(loginFailure(error.response.data.errors));
      });
  };
};

//user logout action creator
export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  };
};

//function to dispatch when success
const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

//function to dispatch when failed
const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors: errors
  };
};
