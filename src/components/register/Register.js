//imports
import React from "react";
import RegisterForm from "./RegisterForm";
import { Redirect } from "react-router-dom";

import * as actions from "actions";

//Register component
export class Register extends React.Component {
  constructor(props) {
    super(props);

    //initial state for errors and redirect
    this.state = {
      errors: [],
      redirect: false
    };

    //bind 'this' for registerUser functctoin
    this.registerUser = this.registerUser.bind(this);
  }

  //call action creater to register the user
  registerUser(userData) {
    actions.register(userData).then(
      //when success
      registered => {
        this.setState({
          redirect: true
        });
      },
      //when fail
      errors => {
        console.log(errors);
        this.setState({
          errors: errors
        });
      }
    );
  }

  render() {
    const { errors, redirect } = this.state;

    if (redirect) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { successRegister: true } }}
        />
      );
    }

    //jsx
    return (
      <section id="register">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Register</h1>
              <RegisterForm
                submitCallBack={this.registerUser}
                errors={errors}
              />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  As our member you have access to most awesome places in the
                  world.
                </h2>
                <img src={process.env.PUBLIC_URL + "/img/image1.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
