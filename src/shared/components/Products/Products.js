import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import useFetchCollection from "shared/hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  STORE_PRODUCTS_PRICE,
  selectProducts,
} from "redux/slice/productSlice";
import ProductItem from "feature/products/components/productItem/ProductItem";
import { GET_PRODUCTS, selectFilteredProducts } from "redux/slice/filterSlice";
const Products = ({ grid }) => {
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();
  console.log(filteredProducts);
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(GET_PRODUCTS(products));
  }, [dispatch, products]);

  useEffect(() => {
    dispatch(STORE_PRODUCTS_PRICE(data));
  }, [dispatch, data]);

  return (
    <div className={grid ? "row" : "row flex-column"}>
      {filteredProducts.length === 0 ? (
        <div className="alert alert-danger my-5 py-5 text-center">
          There are no products!
        </div>
      ) : (
        filteredProducts.map((product) => (
          <ProductItem grid={grid} product={product} key={product.id} />
        ))
      )}
    </div>
  );
};

export default Products;
