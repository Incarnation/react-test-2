import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { Header } from "./shared/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">I am a component</header>
      </div>
    );
  }
}

export default App;
