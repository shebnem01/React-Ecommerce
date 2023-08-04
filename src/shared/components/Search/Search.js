import React from "react";
import styles from "./Search.module.css";
import {CiSearch} from 'react-icons/ci'
const Search = () => {
  return (
    <div className={styles["search-wrapper"]}>
      <form className={styles["search-form"]}>
        <div className={styles["search-content"]}>
          <input
            type="text"
            placeholder="Search"
            className={styles["search-input"]}
          />
          <button className={styles["search-btn"]}><CiSearch size={22}/></button>
        </div>
      </form>
    </div>
  );
};

export default Search;
