import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import "App.css";
import { Header } from "components/shared/Header";
import RentalListing from "components/rental/rental-listing/RentalListing";
import RentalDetail from "components/rental/rental-detail/RentalDetail";

import Login from "components/login/Login";
import { Register } from "components/register/Register";
import * as actions from "actions";

//import setupProxy from "./setupProxy";

//setupProxy();

const store = require("./reducers").init();

class App extends Component {
  componentWillMount() {
    //check the auth state when the component loads up
    //debugger;
    store.dispatch(actions.checkAuthState());
  }

  logout() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logout={this.logout} />
            <div className="container">
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/rentals" />;
                }}
              />
              <Route exact path="/rentals" component={RentalListing} />
              <Route exact path="/rentals/:id" component={RentalDetail} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
