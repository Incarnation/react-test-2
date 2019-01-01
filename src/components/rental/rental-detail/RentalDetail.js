import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";

class RentalDetail extends React.Component {
  constructor(props) {
    super(props);

    //this.id = this.props.match.params.id;
  }

  //
  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.featchRentalById(rentalId));
  }

  render() {
    const rental = this.props.rental;

    if (!rental._id) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h1>{rental.title}</h1>
        <h1>{rental.city}</h1>
        <h1>{rental.description}</h1>
        <h1>{rental.dailyRate}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, myprops) => {
  //debugger;
  return { rental: state.rental.data };
};

export default connect(mapStateToProps)(RentalDetail);
