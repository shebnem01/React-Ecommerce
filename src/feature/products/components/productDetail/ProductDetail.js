import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import {useParams } from "react-router-dom";
import { db } from "../../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "shared/components/Loader/Loader";
import {
  ADD_CART,
  DECREASE_QUANTITY,
  selectCartItems,
} from "redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const singleProduct = cartItems.find((item) => item.id === id);
  const isCartAdded = cartItems.findIndex((item) => item.id === id);
  const addToCart =useCallback( (product) => {
    dispatch(ADD_CART(product));
  },[dispatch])
  const handleIncrease = useCallback((cartProduct) => {
    dispatch(ADD_CART(cartProduct));
  },[dispatch])
  const handleDecrease = (cartProduct) => {
    dispatch(DECREASE_QUANTITY(cartProduct));
  };
  useEffect(() => {
    getSingleProduct();
  }, [product]);
  const getSingleProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const obj = {
          id,
          ...docSnap.data(),
        };
        setProduct(obj);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      {product === null ? (
        <Loader />
      ) : (
        <div className={styles["product-detail"]}>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 mb-3">
              <div className={styles["product-img"]}>
                <img src={product.imgURL} alt="" />
              </div>
            </div>
            <div className="col-md-6 col-lg-7 mb-3">
              {" "}
              <div className={styles["product-content"]}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>${product.price}</div>
                <div className={styles.desc}>{product.desc}</div>
                <div className={styles.brand}>
                  Brand: <b>{product.brand}</b>
                </div>
                <div className={styles["product-action"]}>
                  {isCartAdded < 0 ? null : (
                    <div className={styles.counter}>
                      <button
                        className={styles.dec}
                        onClick={() => handleDecrease(product)}
                        disabled={singleProduct.quantity === 1}
                      >
                        -
                      </button>
                      <div className={styles.count}>
                        {singleProduct.quantity}
                      </div>
                      <button
                        className={styles.inc}
                        onClick={() => handleIncrease(product)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  <button
                    className={styles["add-to-cart"]}
                    onClick={() => addToCart(product)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
