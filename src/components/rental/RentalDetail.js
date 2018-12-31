import React from "react";

export class RentalDetail extends React.Component {
  constructor(props) {
    super(props);

    this.id = this.props.match.params.id;
  }

  render() {
    return <div>Hello world id: {this.id}</div>;
  }
}
