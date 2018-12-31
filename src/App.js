import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import "./App.css";
import { Header } from "./shared/Header";
import RentalList from "./components/rental/RentalList";
import { RentalDetail } from "./components/rental/RentalDetail";

const store = require("./reducers").init();

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <div className="container">
              <Route
                exact
                path="/"
                render={() => {
                  return <Redirect to="/rentals" />;
                }}
              />
              <Route exact path="/rentals" component={RentalList} />
              <Route exact path="/rentals/:id" component={RentalDetail} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
