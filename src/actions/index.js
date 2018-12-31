import { FETCH_RENTALS, FETCH_RENTAL_BY_ID } from "./types";

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

export const fetchRentals = () => {
  return {
    type: FETCH_RENTALS,
    rentals: rentals
  };
};

export const featchRentalById = id => {
  const rental = rentals.find(rental => rental.id === id);

  return {
    type: FETCH_RENTAL_BY_ID,
    rental: rental
  };
};
