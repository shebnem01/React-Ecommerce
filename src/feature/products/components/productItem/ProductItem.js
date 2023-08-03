import React from "react";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { ROUTER } from "shared/constant/router";
const ProductItem = ({ product,grid }) => {
  const { imgURL, id, name, price } = product;
  return (
    <div
      className={
        grid
          ? `${styles["single-product-item"]}`
          : `${styles["product"]}`
      }
    >
      <Link to={ROUTER.PRODUCT_DETAIL + `/${id}`}>
        <div className={styles["product-img"]}>
          <img className={styles.img} src={imgURL} alt={name} />
        </div>{" "}
      </Link>
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price} </div>
      <button className="btn btn-primary">Add to cart</button>
    </div>
  );
};

export default ProductItem;
