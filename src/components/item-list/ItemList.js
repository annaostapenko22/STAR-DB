import React, { Component } from "react";
import styles from "./ItemList.module.css";
import Spinner from "../spinner/Spinner";

class ItemList extends Component {
  state = {
    itemList: null
  };
  componentDidMount() {
    const { getData } = this.props;
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
    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    const classNames = [styles.personSection];
    return (
      <section className={classNames.join(" ")}>
        <ul className={styles.itemList}>{items}</ul>
      </section>
    );
  }
}

export default ItemList;
