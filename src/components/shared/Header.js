import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RentalSearchInput from "components/rental/RentalSearchInput";

class Header extends React.Component {
  constructor(props) {
    super(props);

    //binding this
    this.logoutUser = this.logoutUser.bind(this);
  }

  renderAuthButton(isAuth) {
    if (isAuth) {
      return (
        <a className="nav-item nav-link clickable" onClick={this.logoutUser}>
          Logout
        </a>
      );
    }

    return (
      <React.Fragment>
        <Link className="nav-item nav-link" to="/login">
          Login <span className="sr-only">(current)</span>
        </Link>
        <Link className="nav-item nav-link" to="/register">
          Register
        </Link>
      </React.Fragment>
    );
  }

  //Owner's section
  //after login owner can create, manage Rental
  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a
            className="nav-link nav-item dropdown-toggle clickable"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Owner Section
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/rentals/new">
              Create Rental
            </Link>
            <Link className="dropdown-item" to="/rentals/manage">
              Manage Rentals
            </Link>
            <Link className="dropdown-item" to="/bookings/manage">
              Manage Bookings
            </Link>
          </div>
        </div>
      );
    }
  }

  //function to redirect user after logout
  //withRouter higher order function provide 'history' props to this component
  logoutUser() {
    this.props.logout();
    //redirect page call
    this.props.history.push("/rentals");
  }

  render() {
    //check Authorization and user from the props
    const { username, isAuth } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-lg  bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/rentals">
            <img src={process.env.PUBLIC_URL + "/img/home_logo_2.png"} alt="" />
          </Link>
          <RentalSearchInput />
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              {isAuth && <a className="nav-item nav-link">{username}</a>}
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButton(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default withRouter(connect(mapStateToProps)(Header));
