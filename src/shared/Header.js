import React from "react";

export function Header() {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" to="/rentals">
          My App
          <img src={process.env.PUBLIC_URL + "/img/react-logo.svg"} alt="" />
        </a>

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
            <a className="nav-item nav-link" to="/login">
              Login <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" to="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
