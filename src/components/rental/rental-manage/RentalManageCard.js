import React from "react";
import { Link } from "react-router-dom";
import { toUpperCase, pretifyDate } from "helpers";

export function RentalManageCard(props) {
  const { rental } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-block">
          <h4 className="card-title">
            {rental.title} - {toUpperCase(rental.city)}
          </h4>
          <Link className="btn btn-bwm" to={`/rentals/${rental._id}`}>
            Go to Rental
          </Link>
          <button className="btn btn-bwm"> Bookings </button>
        </div>
        <div className="card-footer text-muted">
          Created at {pretifyDate(rental.createAt)}
        </div>
      </div>
    </div>
  );
}
