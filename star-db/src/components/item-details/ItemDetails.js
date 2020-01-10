import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import styles from "./ItemDetails.module.css";
class ItemDetails extends Component {
  // swapiService = new SwapiService();
  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  updateItem = () => {
    const { itemId, getItems, getImageUrl } = this.props;
    console.log("id", getItems);
    if (!itemId) {
      return;
    }
    getItems(itemId).then(item => {
      console.log("item", item);
      this.setState({ item, image: getImageUrl(item) });
    });
    // console.log("res", res.name);
    // return res;
  };
  render() {
    if (!this.state.item) {
      return <span className={styles.selectItem}>Select a {this.props.title} from the list</span>;
    }
    console.log(this.path)
    const { item } = this.state;
    const { image } = this.state;
    // const type = item.type;
    const params = Object.entries(item)
      .filter(param => param[0] !== "id" && param[0] !== "type")
      .map(param => (
        <li key={param[0]}>
          {param[0]}: {param[1]}
        </li>
      ));
    return (
      <section className={styles.itemDetailsSection}>
        <ul className={styles.itemList}>
          <li>
            <img className={styles.itemImg} src={image} alt="character" />
          </li>
          <li className={styles.itemGroup}>
            <ul>{params}</ul>
          </li>
        </ul>
      </section>
    );
  }
}

export default ItemDetails;
