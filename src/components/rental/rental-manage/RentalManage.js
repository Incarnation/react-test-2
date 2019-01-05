import React from "react";
import * as actions from "actions";
import { Link } from "react-router-dom";
import { RentalManageCard } from "./RentalManageCard";
import { ToastContainer, toast } from "react-toastify";

export class RentalManage extends React.Component {
  constructor(props) {
    super(props);

    //initial states for the component
    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };

    //bind context
    this.deleteRental = this.deleteRental.bind(this);
  }

  //call action creator to get the rentals for the logined user
  componentWillMount() {
    //flag is fetching to fetch the warning message
    this.setState({ isFetching: true });

    actions.getUserRentals().then(
      //if success
      rentals => {
        this.setState({ userRentals: rentals, isFetching: false });
      },
      //if fail
      err => {
        this.setState({ errors: err, isFetching: false });
      }
    );
  }

  //action to call the delete rental
  //this function is passing to the RentalManageCard component as prop
  deleteRental(id, index) {
    actions.deleteRental(id).then(
      () => {
        this.deleteRentalFromList(index);
      },
      errors => {
        toast.error(errors[0].detail);
      }
    );
  }

  //create an copy of the list inside state first and then delete from the state
  //this function is called inside the above deleteRental function which is passing
  //to the RentalManageCard component as prop
  deleteRentalFromList(index) {
    const rentals = this.state.userRentals.slice();
    rentals.splice(index, 1);
    this.setState({ userRentals: rentals });
  }

  //display a list of the rentals created by the login user
  renderRentalCards(rentals) {
    return rentals.map((rental, index) => {
      return (
        <RentalManageCard
          key={index}
          rental={rental}
          rentalIndex={index}
          deleteRentalCallBack={this.deleteRental}
        />
      );
    });
  }

  //render function
  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id="userRentals">
        <ToastContainer />
        <h1 className="page-title">My Rentals</h1>
        <div className="row">{this.renderRentalCards(userRentals)}</div>

        {!isFetching && userRentals.length === 0 && (
          <div className="alert alert-warning">
            You dont have any rentals currenty created. If you want advertised
            your property please follow this link.
            <Link
              style={{ marginLeft: "10px" }}
              className="btn btn-bwm"
              to="/rentals/new"
            >
              Register Rental
            </Link>
          </div>
        )}
      </section>
    );
  }
}
