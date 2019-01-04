import React from "react";
import { RentalList } from "./RentalList";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalSearchListing extends React.Component {
  constructor() {
    super();

    this.state = {
      searchedCity: ""
    };
  }

  componentWillMount() {
    const city = this.props.match.params.city;
    //update city state if available
    this.setState({ searchedCity: city });
    //dispatch action
    this.props.dispatch(actions.fetchRentals(city));
    //debugger;
  }

  render() {
    //debugger;
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home In {this.state.searchedCity}</h1>

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

export default connect(mapStateToProps)(RentalSearchListing);
