import { FETCH_RENTALS } from "./types";

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
