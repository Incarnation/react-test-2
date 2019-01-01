import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTAL_BY_ID
} from "../actions/types";

const INTIAL_STATE = {
  rentals: {
    data: []
  },

  rental: {
    data: {}
  }
};

export const rentalReducer = (state = INTIAL_STATE.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return { ...state, data: action.rentals };
      break;
    default:
      return state;
  }
};

export const selectedRentalReducer = (state = INTIAL_STATE.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID:
      return { ...state, data: action.rental };
      break;
    case FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };
    default:
      return state;
  }
};
