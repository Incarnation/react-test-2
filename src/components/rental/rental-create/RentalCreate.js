import React from "react";
import RentalCreateForm from "./RentalCreateForm";
import { Redirect } from "react-router-dom";
import * as actions from "actions";

export class RentalCreate extends React.Component {
  constructor(props) {
    super(props);
    //inistal state
    this.state = {
      errors: [],
      redirect: false
    };

    //category initialValues
    this.rentalCateogies = ["apartment", "house", "condo"];

    this.createRental = this.createRental.bind(this);
  }
  //
  componentWillMount() {}

  createRental(values) {
    //debugger;
    //console.log(values);
    //call action create to create rental
    actions.createRental(values).then(
      rental => {
        this.setState({ redirect: true });
      },
      errors => {
        this.setState({ errors: errors });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }

    return (
      <section id="newRental">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1 className="page-title">Create Rental</h1>
              <RentalCreateForm
                submitCallBack={this.createRental}
                options={this.rentalCateogies}
                errors={this.state.errors}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src={process.env.PUBLIC_URL + "/img/image3.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
