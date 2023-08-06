import React, { memo } from "react";
import styles from "./BreadCrumb.module.css";
import { Link, useLocation } from "react-router-dom";
import { ROUTER } from "shared/constant/router";

const BreadCrumb = () => {
  const location = useLocation();
  let path = location.pathname;
  let pathParts = path.split("/").filter((part) => part !== "");

  return (
    <>
      {path === "/home" ? (
        ""
      ) : path.includes("/product-detail") ? (
        <div className={styles.breadcrumb}>
          <div className={styles.title}>Product detail</div>
          <ul className={styles.list}>
            <li>
              <Link to={ROUTER.HOME}>home</Link>
            </li>
            <li className="active">Product detail</li>
          </ul>
        </div>
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
export default memo(BreadCrumb);
