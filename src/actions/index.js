import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID,
  FETCH_RENTAL_BY_ID_INIT
} from "./types";

const rentals = [
  {
    id: "1",
    title: "Central apartment",
    city: "New York",
    street: "Times Squre",
    category: "apartment",
    dailyRate: 100,
    shared: false,
    createAt: "11/11/2018"
  }
];

const featchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  };
};

export const fetchRentals = () => {
  return {
    type: FETCH_RENTALS,
    rentals: rentals
  };
};

const featchRentalByIdSuccess = rental => {};

export const featchRentalById = id => {
  return function(dispatch) {
    dispatch(featchRentalByIdInit());

    //send request to server async
    setTimeout(() => {
      const rental = rentals.find(rental => rental.id === id);
    }, 1000);
  };
  //const rental = rentals.find(rental => rental.id === id);
};
