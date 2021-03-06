//import required lib
import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "actions";

//login class component
class Login extends React.Component {
  constructor() {
    super();

    //bind the context
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser(userData) {
    //console.log(userData);

    //dispatch the login function in action creator
    //pass the value to action creater
    this.props.dispatch(actions.login(userData));
  }

  //render the login component
  render() {
    const { isAuth, errors } = this.props.auth;
    //debugger;
    //prop from registration page after successfully resgister
    const { successRegister } = this.props.location.state || false;

    //if user is already authenticated redirect to rental page
    if (isAuth) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }

    //return login component
    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {successRegister && (
                <div className="alert alert-success">
                  <p>you have been successfully registered, please login now</p>
                </div>
              )}

              <LoginForm submitCallBack={this.loginUser} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src={process.env.PUBLIC_URL + "/img/image2.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

//maping redux store to the component using props
//passing the auth to the component from redux store
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

//connect function to map the state to props in the component
export default connect(mapStateToProps)(Login);
