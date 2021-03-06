import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Header from "../header/Header";
import RandomPlanet from "../random-planet/RandomPlanet";
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import PeoplePage from "../people-page/PeoplePage";
import PlanetPage from "../planet-page/PlanetPage";
import StarshipPage from "../starships-page/StarshipPage";
import "./App.module.css";
import SwapiService from "../../services/swapi-service";

class App extends Component {
  swapiService = new SwapiService();
  state = {
    selectedItem: null,
    hasError: false
  };
  onItemSelected = id => {
    this.setState({ selectedItem: id });
  };
  componentDidCatch() {
    console.log("Componentdidctach");
    this.setState({ hasError: true });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div>
        <Router>
          <Header />
          <RandomPlanet />
          <Switch>
            <PlanetPage path="/planets" />
            <StarshipPage path="/starships" />
            <PeoplePage path="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
