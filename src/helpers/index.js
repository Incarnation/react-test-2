import titleize from "./titleize";
import * as moment from "moment";

export const rentalType = isShared => {
  return isShared ? "shared" : "entire";
};

export const toUpperCase = value => {
  return value ? titleize(value) : "";
};

export const pretifyDate = date => moment(date).format("MMM Do YY");
