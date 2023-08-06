import React from "react";
import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { ROUTER } from "shared/constant/router";
import { useDispatch } from "react-redux";
import { ADD_CART } from "redux/slice/cartSlice";
const ProductItem = ({ product, grid }) => {
  const { imgURL, id, name, price,desc } = product;
  const shortName = (n) => {
    return name.length > n ? name.slice(0, n) + "..." : name;
  };
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(ADD_CART(product));
  };
  return (
    <div
      className={
        grid ? "col-lg-3 col-md-4 col-6 mb-4" : `col-12 ${styles["product-item"]}`
      }
    >
      <Link to={ROUTER.PRODUCT_DETAIL + `/${id}`}>
        <div className={styles["product-img"]}>
          <img className={styles.img} src={imgURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.name}>
          <Link to={ROUTER.PRODUCT_DETAIL + `/${id}`}>{shortName(27)}</Link>
        </div>
        <div className={styles.desc}>{!grid&&desc}</div>
        <div className={styles.price}>$ {price} </div>
        <button
          className={styles["product-btn"]}
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
