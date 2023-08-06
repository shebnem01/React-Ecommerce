import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_CART,
  CALCULATE_SUB_TOTAL,
  CLEAR_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
  selectCartItems,
  selectSubQuantity,
  selectSubTotal,
} from "redux/slice/cartSlice";
import { FcFullTrash } from "react-icons/fc";
import styles from "./Cart.module.css";
import { ROUTER } from "shared/constant/router";
import { Link } from "react-router-dom";
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartQuantity = useSelector(selectSubQuantity);
  const subTotal = useSelector(selectSubTotal);
  const dispatch = useDispatch();
  const handleIncrease = useCallback(
    (cartProduct) => {
      dispatch(ADD_CART(cartProduct));
    },
    [dispatch]
  );
  const handleDecrease = useCallback(
    (cartProduct) => {
      dispatch(DECREASE_QUANTITY(cartProduct));
    },
    [dispatch]
  );
  const handleRemoveFromCart = useCallback(
    (cartProduct) => {
      dispatch(REMOVE_FROM_CART(cartProduct));
    },
    [dispatch]
  );
  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL(cartItems));
  }, [dispatch,cartItems]);

  return (
    <div className="container">
      <div className={styles["cart-wrapper"]}>
        {cartItems.length === 0 ? (
          <div className="alert alert-danger text-center py-5 my-5">
            Your cart is empty
            <br />
            <Link className={styles.link} to={ROUTER.PRODUCTS}>
              Continue to shopping
            </Link>
          </div>
        ) : (
          <>
            <table className={`${styles["cart-table"]} table table-bordered`}>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT NAME</th>
                  <th>BRAND</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartProduct) => {
                  const { name, id, price, brand, category, imgURL, quantity } =
                    cartProduct;
                  return (
                    <tr key={id}>
                      <td>
                        <img className={styles.img} src={imgURL} alt={name} />
                      </td>
                      <td>{name}</td>
                      <td>{brand}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td className={styles.counter}>
                        <button onClick={() => handleDecrease(cartProduct)}>
                          -
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => handleIncrease(cartProduct)}>
                          +
                        </button>
                      </td>
                      <td>${quantity * price}</td>
                      <td className={styles.remove}>
                        <FcFullTrash
                          onClick={() => handleRemoveFromCart(cartProduct)}
                          size={25}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={`${styles.subtotal} border  `}>
              SUBTOTAL ({cartQuantity}):${subTotal}
            </div>
            <div className={styles["cart-footer"]}>
              <Link to={ROUTER.PRODUCTS}>continue to shopping</Link>
              <button onClick={() => dispatch(CLEAR_CART())}>Clear cart</button>
              <button>proceed to checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
