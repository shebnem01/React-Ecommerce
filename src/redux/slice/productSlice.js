import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  minPrice: null,
  maxPrice: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS: (state, action) => {
      state.products = action.payload;
    },
    STORE_PRODUCTS_PRICE: (state, action) => {
      state.products = action.payload;
      let allPrice = [];
      allPrice = state.products.map((item) => item.price);
      let min = Math.min(...allPrice);
      let max = Math.max(...allPrice);
      state.maxPrice = max;
      state.minPrice = min;
    },
  },
});

export const { STORE_PRODUCTS, STORE_PRODUCTS_PRICE } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectMaxPrice = (state) => state.product.maxPrice;
export const selectMinPrice = (state) => state.product.minPrice;
export default productSlice.reducer;
