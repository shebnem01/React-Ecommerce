import React from "react";
import styles from "./Search.module.css";
import { CiSearch } from "react-icons/ci";
const Search = ({ search, onChange, onSubmit }) => {
  return (
    <div className={styles["search-wrapper"]}>
      <form onSubmit={onSubmit} className={styles["search-form"]}>
        <div className={styles["search-content"]}>
          <input
            value={search}
            onChange={onChange}
            type="text"
            placeholder="Search"
            className={styles["search-input"]}
          />
          <button
            type="submit"
            className={styles["search-btn"]}
          >
            <CiSearch size={22} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
