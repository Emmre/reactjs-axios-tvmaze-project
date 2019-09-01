import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Detail from "./Detail";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
      <switch>
        <switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/detail/:id" component={Detail} />
        </switch>
      </switch>
      </Router>
    );
  }
}
