import React from "react";
import RentalCard from "./RentalCard";
import { connect } from "react-redux";
import * as actions from "../../actions";

class RentalList extends React.Component {
  constructor(props) {
    super(props);

    //this.addRental = this.addRental.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  //render
  renderRentals() {
    return this.props.rentals.map((rental, index) => {
      return (
        <RentalCard colNum="col-md-3 col-xs-6" key={index} rental={rental} />
      );
    });
  }

  render() {
    //debugger;
    //console.log(this.props);
    return (
      <section id="rentalListing">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">{this.renderRentals()}</div>
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

export default connect(mapStateToProps)(RentalList);
