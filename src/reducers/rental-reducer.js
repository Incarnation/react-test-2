import { FETCH_RENTALS } from "../actions/types";

const INTIAL_STATE = {
  data: []
};

export const rentalReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return { ...state, data: action.rentals };
      break;
    default:
      return state;
  }
};
