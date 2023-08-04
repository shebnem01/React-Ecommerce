import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  subTotal: 0,
  subQuantity:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_CART: (state, action) => {
      let product = action.payload;
      let newCart = [...state.cartItems];
      const productIndex = newCart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        newCart[productIndex].quantity += 1;
      } else {
        newCart = [...newCart, { ...product, quantity: 1 }];
      }
      toast.success(`${product.name} add to cart`);
      state.cartItems = newCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_QUANTITY: (state, action) => {
      const product = action.payload;
      let newCart = [...state.cartItems];
      let productIndex = newCart.findIndex((item) => item.id === product.id);
      let currentQuantity = newCart[productIndex].quantity;

      if (currentQuantity > 1) {
        newCart[productIndex].quantity -= 1;
      } else if (currentQuantity === 1) {
        let removeItemFromCart = newCart.filter(
          (item) => item.id !== product.id
        );
        newCart = removeItemFromCart;
        toast.success(`${product.name} remove from cart`);
      }
      state.cartItems = newCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART: (state, action) => {
      const product = action.payload;
      let newCart = [...state.cartItems];
      const removeItemFromCart = newCart.filter(
        (item) => item.id !== product.id
      );
      newCart = removeItemFromCart;
      state.cartItems = newCart;
      toast.success(`${product.name} remove from cart`);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success(`Cart cleared`);
    },
    CALCULATE_SUB_TOTAL: (state, action) => {
      const product = action.payload;
      let allPrice = product.map((item) => item.price * item.quantity);
      let calculateTotal = allPrice.reduce((acc, sum) => {
        return (sum += acc);
      }, 0);
      state.subTotal = calculateTotal;
    },
    CALCULATE_SUB_QUANTITY: (state, action) => {
      const product = action.payload;
      let allPrice = product.map((item) => item.quantity);
      let calculateQuantity = allPrice.reduce((acc, sum) => {
        return (sum += acc);
      }, 0);
      state.subQuantity = calculateQuantity;
    },

  },
});

export const {
  DECREASE_QUANTITY,
  ADD_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUB_TOTAL,
  CALCULATE_SUB_QUANTITY
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectSubTotal = (state) => state.cart.subTotal;
export const selectSubQuantity= (state) => state.cart.subQuantity;

export default cartSlice.reducer;
