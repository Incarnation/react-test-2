import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const INTIAL_STATE = {
  isAuth: false,
  errors: [],
  username: ""
};

export const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, errors: [], username: action.username };
    case LOGIN_FAILURE:
      return { ...state, errors: action.errors };
    case LOGOUT:
      return { ...state, isAuth: false, username: "" };
    default:
      return state;
  }
};
