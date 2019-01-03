import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../actions/types";

const INTIAL_STATE = {
  isAuth: false,
  errors: []
};

export const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, errors: [] };
    case LOGIN_FAILURE:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};
