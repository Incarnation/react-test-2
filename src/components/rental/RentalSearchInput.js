import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class RentalSearchInput extends React.Component {
  constructor(props) {
    super(props);

    //create react ref to handle the input
    this.searchInput = React.createRef();

    //function binding
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //redirect route depend on input
  handleSearch() {
    const { history } = this.props;
    const city = this.searchInput.current.value;

    city ? history.push(`/rentals/${city}/homes`) : history.push("/rentals");
  }

  //when press enter call handleSearch function
  handleKeyPress(event) {
    if (event.key === "Enter") {
      this.handleSearch();
    }
  }

  //render the compoenet
  render() {
    return (
      <div className="form-inline my-2 my-lg-0">
        <input
          onKeyPress={e => this.handleKeyPress(e)}
          ref={this.searchInput}
          className="form-control mr-sm-2 bwm-search"
          type="search"
          placeholder="Try New York"
          aria-label="Search"
        />
        <button
          onClick={this.handleSearch}
          className="btn btn-outline-success my-2 my-sm-0 btn-bwm-search"
          type="submit"
        >
          Search
        </button>
      </div>
    );
  }
}

export default withRouter(RentalSearchInput);
