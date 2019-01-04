import React from "react";
import { RentalList } from "./RentalList";
import { connect } from "react-redux";
import * as actions from "actions";
import { toUpperCase } from "helpers";

class RentalSearchListing extends React.Component {
  constructor() {
    super();

    this.state = {
      searchedCity: ""
    };
  }

  searchRentalByCity() {
    const city = this.props.match.params.city;
    //update city state if available
    this.setState({ searchedCity: city });
    //dispatch action
    this.props.dispatch(actions.fetchRentals(city));
  }

  componentWillMount() {
    this.searchRentalByCity();
    //debugger;
  }

  //when the componenet loads the second time
  //compare the previous url with the currentURL
  //if different trigger the function call
  componentDidUpdate(prevProps) {
    //debugger;
    const currentURL = this.props.match.params.city;
    const prevURL = prevProps.match.params.city;
    //debugger;

    if (currentURL !== prevURL) {
      this.searchRentalByCity();
    }
  }

  renderTitle() {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;
    let title = "";

    if (errors.length > 0) {
      title = errors[0].detail;
    }

    if (data.length > 0) {
      title = `Your Home In ${toUpperCase(searchedCity)}`;
    }

    return <h1 className="page-title">{title}</h1>;
  }

  render() {
    //debugger;
    return (
      <section id="rentalListing">
        {this.renderTitle()}

        <RentalList rentals={this.props.rentals.data} />
      </section>
    );
  }
}

const mapStateToProps = (state, myprops) => {
  //debugger;
  return {
    rentals: state.rentals
  };
};

export default connect(mapStateToProps)(RentalSearchListing);
