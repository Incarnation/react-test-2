import React from "react";
import RentalCard from "./RentalCard";

export class RentalList extends React.Component {
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
    return <div className="row">{this.renderRentals()}</div>;
  }
}
