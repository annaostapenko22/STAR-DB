export default class SwapiService {
  getResource = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource(`https://swapi.co/api/people/`);
    return res.results.map(this._transformPerson);
  };
  getPersonById = async id => {
    const person = await this.getResource(`https://swapi.co/api/people/${id}`);
    return this._transformPerson(person);
  };
  getAllPlanets = async () => {
    const res = await this.getResource(`https://swapi.co/api/planets/`);
    return res.results.map(this._transformPlanet);
  };
  getPlanetById = async id => {
    const planet = await this.getResource(`https://swapi.co/api/planets/${id}`);
    return this._transformPlanet(planet);
  };
  getAllStarShips = async () => {
    const res = await this.getResource(`https://swapi.co/api/starships/`);
    return res.results.map(this._transformStarShip);
  };
  getStarShipById = async id => {
    const starship = await this.getResource(
      `https://swapi.co/api/starships/${id}`
    );
    return this._transformStarShip(starship);
  };
  getPersonImage = ({ id }) => {
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  };

  getStarshipImage = ({ id }) => {
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  };
  getPlanetImage = ({ id }) => {
    return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  };
  _extractId = item => {
    const idRegexExpr = /\/([0-9]*)\/$/;
    return item.url.match(idRegexExpr)[1];
  };
  _transformPlanet = planet => {
    return {
      type: "planet",
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };
  _transformStarShip = starship => {
    return {
      type: "ship",
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  };
  _transformPerson = person => {
    return {
      type: "person",
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };
}
