import React, { Component } from "react";
import ItemList from "../item-list/ItemList";
import ItemDetails from "../item-details/ItemDetails";
import ErrorIndicator from "../error-indicator/ErrorIndicator";
import SwapiService from "../../services/swapi-service";
import style from "../app/App.module.css";
import styles from "./PeoplePage.module.css";
class PeoplePage extends Component {
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
    const classNames = [style.container, styles.containerSection];
    return (
      <div className={classNames.join(" ")}>
        <ItemList
          onItemSelected={this.onItemSelected}
          getData={this.swapiService.getAllPeople}
          renderItem={item =>
            `${item.name} (${item.gender}, ${item.birthYear})`
          }
        />

        <ItemDetails
          itemId={this.state.selectedItem}
          getItems={this.swapiService.getPersonById}
          getImageUrl={this.swapiService.getPersonImage}
          title={"person"}
        />
      </div>
    );
  }
}

export default PeoplePage;
