import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import { RentalDetailInfo } from "./RentalDetailInfo";
import { RentalMap } from "./RentalMap";

class RentalDetail extends React.Component {
  //
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.featchRentalById(rentalId));
  }

  render() {
    const rental = this.props.rental;

    if (!rental._id) {
      return <div>Loading...</div>;
    }

    return (
      <section id="rentalDetails">
        <div className="upper-section">
          <div className="row">
            <div className="col-md-6">
              <img src={rental.image} alt="" />
            </div>
            <div className="col-md-6">
              <RentalMap location={`${rental.city}, ${rental.street}`} />
            </div>
          </div>
        </div>

        <div className="details-section">
          <div className="row">
            <div className="col-md-8">
              <RentalDetailInfo rental={rental} />
            </div>
            <div className="col-md-4">{/*<Booking rental={rental} />*/}</div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, myprops) => {
  //debugger;
  return { rental: state.rental.data };
};

export default connect(mapStateToProps)(RentalDetail);
