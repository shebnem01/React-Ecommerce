import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});
