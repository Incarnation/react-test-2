import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

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

    return <div>rental {rental.title}</div>;
  }
}

const mapStateToProps = (state, myprops) => {
  //debugger;
  return { rental: state.rental.data };
};

export default connect(mapStateToProps)(RentalDetail);
