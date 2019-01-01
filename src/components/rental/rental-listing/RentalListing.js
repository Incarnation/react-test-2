import React from "react";
import { RentalList } from "./RentalList";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalListing extends React.Component {
  constructor(props) {
    super(props);

    //this.addRental = this.addRental.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    //debugger;
    //console.log(this.props);
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
