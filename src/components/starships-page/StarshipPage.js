import React, { Component } from "react";
import ItemList from "../item-list/ItemList";
import ItemDetails from "../item-details/ItemDetails";
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import SwapiService from "../../services/swapi-service";
import style from "../app/App.module.css";
import stylePage from "../people-page/PeoplePage.module.css";
class StarshipPage extends Component {
  swapiService = new SwapiService();
  state = {
    selectedItem: null,
    hasError: false
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  onItemSelected = id => {
    this.setState({ selectedItem: id });
  };
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const classNames = [style.container, stylePage.containerSection];
    return (
      <div className={classNames.join(" ")}>
        <ItemList
          onItemSelected={this.onItemSelected}
          getData={this.swapiService.getAllStarShips}
          renderItem={item => `${item.name} (${item.model}, ${item.length})`}
        />

        <ItemDetails
          itemId={this.state.selectedItem}
          getItems={this.swapiService.getStarShipById}
          getImageUrl={this.swapiService.getStarshipImage}
          title={"starship"}
        />
      </div>
    );
  }
}

export default StarshipPage;
