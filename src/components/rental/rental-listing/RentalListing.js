import React from "react";
import { RentalList } from "./RentalList";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalListing extends React.Component {
  componentWillMount() {
    //debugger;
    this.props.dispatch(actions.fetchRentals());
    //debugger;
  }

  render() {
    //debugger;
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>

        <RentalList rentals={this.props.rentals} />
      </section>
    );
  }
}

const mapStateToProps = (state, myprops) => {
  //debugger;
  return {
    rentals: state.rentals.data
  };
};

export default connect(mapStateToProps)(RentalListing);
