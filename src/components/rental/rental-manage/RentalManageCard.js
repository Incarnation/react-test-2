import React from "react";
import { Link } from "react-router-dom";
import { toUpperCase, pretifyDate } from "helpers";
import { RentalManageModal } from "./RentalManageModal";

export class RentalManageCard extends React.Component {
  constructor() {
    super();

    //initial state
    this.state = {
      deleted: false
    };
  }

  //change the state
  showDeleteMenu() {
    this.setState({ deleted: true });
  }

  closeDeleteMenu() {
    this.setState({ deleted: false });
  }

  //this function is called when the user click the confirm yes button
  //it will call the deleteRental function in the RentalManage component
  deleteRental(id, index) {
    this.setState({ deleted: false });
    this.props.deleteRentalCallBack(id, index);
  }

  //render fucntion
  render() {
    const { rental, rentalIndex } = this.props;
    const { deleted } = this.state;
    const deleteClass = deleted ? "toBeDeleted" : "";
    return (
      <div className="col-md-4">
        <div className={`card text-center ${deleteClass}`}>
          <div className="card-block">
            <h4 className="card-title">
              {rental.title} - {toUpperCase(rental.city)}
            </h4>
            <Link className="btn btn-bwm" to={`/rentals/${rental._id}`}>
              Go to Rental
            </Link>
            {/*
          <button className="btn btn-bwm"> Bookings </button>
          */}
            <RentalManageModal />
          </div>
          <div className="card-footer text-muted">
            Created at {pretifyDate(rental.createAt)}
            {!this.state.deleted && (
              <button
                onClick={() => {
                  this.showDeleteMenu();
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
            {this.state.deleted && (
              <div className="delete-menu">
                "Do you confirm?
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.deleteRental(rental._id, rentalIndex);
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    this.closeDeleteMenu();
                  }}
                  className="btn btn-success"
                >
                  No
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
