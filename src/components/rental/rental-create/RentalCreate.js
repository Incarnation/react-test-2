import React from "react";
import RentalCreateForm from "./RentalCreateForm";
import { Redirect } from "react-router-dom";

export class RentalCreate extends React.Component {
  constructor(props) {
    super(props);

    this.rentalCateogies = ["apartment", "house", "condo"];

    this.createRental = this.createRental.bind(this);
  }
  //
  componentWillMount() {}

  createRental(values) {
    console.log(values);
  }

  render() {
    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <RentalCreateForm
                submitCallBack={this.createRental}
                options={this.rentalCateogies}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img
                  src={process.env.PUBLIC_URL + "/img/create-rental.jpg"}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
