import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import style from "../app/App.module.css";
const Header = () => {
  let headerClassnames = [style.container, styles.header];
  return (
    <header className={headerClassnames.join(" ")}>
      <h1>Star DB</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to="/" className={styles.link}>People</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/planets" className={styles.link}>Planets</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/starships" className={styles.link}>Starships</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
