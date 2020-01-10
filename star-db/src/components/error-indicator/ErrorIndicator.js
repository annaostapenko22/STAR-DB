import React from "react";
import styles from "./ErrorIndicator.module.css";
import icon from "./boom.svg";
const ErrorIndicator = () => {
  return (
    <div>
      <img src={icon} alt="error icon" className={styles.icon} />
      <p>BOOM!</p>
      <span>something has gone terribly wrong</span>
      <span>(but we have already sent droid to fix it)</span>
    </div>
  );
};
export default ErrorIndicator;
