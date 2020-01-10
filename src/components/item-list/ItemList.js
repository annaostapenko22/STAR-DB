import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import style from "../app/App.module.css";
import styles from "./ItemList.module.css";
import Spinner from "../spinner/Spinner";
import shortid from "short-id";
class ItemList extends Component {
  // swapiService = new SwapiService();
  state = {
    itemList: null
  };
  componentDidMount() {
    const { getData } = this.props;
    // this.swapiService.getAllPeople().then(peopleList => {
    //   // this.renderPeople(peopleList);
    //   this.setState({ peopleList });
    //   console.log(this.state.peopleList[1]);
    // });
    getData().then(itemList => {
      this.setState({ itemList });
    });
  }
  renderItems(arr) {
    return arr.map(item => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          onClick={() => this.props.onItemSelected(id)}
          className={styles.item}
        >
          {label}
        </li>
      );
    });
  }
  render() {
    const { itemList } = this.state;
    // console.log("this.props.children", this.props.children);
    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    console.log(itemList);
    const classNames = [styles.personSection];
    return (
      <section className={classNames.join(" ")}>
        <ul className={styles.itemList}>{items}</ul>
      </section>
    );
  }
}

export default ItemList;
