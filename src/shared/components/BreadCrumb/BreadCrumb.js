import React from "react";
import styles from "./BreadCrumb.module.css";
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "shared/constant/router";

const BreadCrumb = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathParts = path.split("/").filter((part) => part !== "");

  return (
    <>
      {path === "/home" ? (
        ""
      ) : (
        <div className={styles.breadcrumb}>
          <div className={styles.title}>{pathParts[pathParts.length - 1]}</div>
          <ul className={styles.list}>
            <li>
              <Link to={ROUTER.HOME}>home</Link>
            </li>
            <li className="active">{pathParts[pathParts.length - 1]}</li>
          </ul>
        </div>
      )}
    </>
  );
};
export default BreadCrumb;
