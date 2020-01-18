import React, { Component } from "react";
import styles from "./RandomPlanet.module.css";
import style from "../app/App.module.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/Spinner";
import ErrorIndicator from "../error-indicator/ErrorIndicator";
export default class RandomPlanet extends Component {
  swapiService = new SwapiService();
  state = {
    planet: {},
    loading: true,
    error: false
  };
  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 2500);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };

  onError = err => {
    this.setState({ error: true, loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 10) + 3;
    this.swapiService
      .getPlanetById(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };
  render() {
    const classNames = [style.container, styles.planetSection];
    const { planet, loading, error } = this.state;
    const hasData = !(loading || error);
    const errMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;
    return (
      <section className={classNames.join(" ")}>
        {errMessage}
        {spinner}
        {content}
      </section>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;

  const image = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  return (
    <>
      <img
        alt="some planet"
        src={image}
        className={styles.planetPicture}
      />
      <div>
        <h2>{name}</h2>
        <ul>
          <li>
            <span className={styles.title}>Population: </span>
            <span>{population}</span>
          </li>
          <li>
            <span className={styles.title}>Rotation period: </span>
            <span>{rotationPeriod}</span>
          </li>
          <li>
            <span className={styles.title}>Diameter: </span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};
