import React from "react";
import styles from "./Footer.module.css";
import Logo from "shared/components/Logo";
import { ROUTER } from "shared/constant/router";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles["footer-top"]}>
          <div className="row">
            <div className="col-md-4 col-sm-6 mb-4">
              <Logo />
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className={styles["footer-title"]}>information</div>
              <nav>
                <ul className={styles.list}>
                  <li>
                    <Link to={ROUTER.ABOUT}>About us</Link>
                  </li>
                  <li>
                    <Link to={ROUTER.ORDERS}>Orders</Link>
                  </li>
                  <li>
                    <Link to={ROUTER.PRODUCTS}>Products</Link>
                  </li>
                  <li>
                    <Link to={ROUTER.CONTACT}>Contact us</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className={styles["footer-title"]}>my account</div>
              <nav>
                <ul  className={styles.list}>
                  <li>
                    <Link to={ROUTER.LOGIN}>login</Link>
                  </li>
                  <li>
                    <Link to={ROUTER.CART}>Cart</Link>
                  </li>
                  <li>
                    <Link>my account</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
