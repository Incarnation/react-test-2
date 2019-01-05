import React from "react";
import * as actions from "actions";
import { Link } from "react-router-dom";
import { RentalManageCard } from "./RentalManageCard";

export class RentalManage extends React.Component {
  constructor(props) {
    super(props);

    //initial states for the component
    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    };
  }

  componentWillMount() {
    this.setState({ isFetching: true });
    //action create to call get user's rentals
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

  renderRentalCards(rentals) {
    return rentals.map((rental, index) => {
      return <RentalManageCard key={index} rental={rental} />;
    });
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id="userRentals">
        <h1 className="page-title">My Rentals</h1>
        <div className="row">{this.renderRentalCards(userRentals)}</div>

        {!isFetching && userRentals.length == 0 && (
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
