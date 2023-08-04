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
import { SEARCH_FİLTER, selectFilteredProducts } from "redux/slice/filterSlice";
const Products = ({ grid }) => {
  const [search, setSearch] = useState("");
  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);
  const { data, isLoading } = useFetchCollection("products");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SEARCH_FİLTER({ search, products }));
  }, [dispatch, products, search]);

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(STORE_PRODUCTS_PRICE(data));
  }, [dispatch, data]);

  return (
    <div className="row">
      {filteredProducts.length === 0 ? (
        <div className="alert alert-danger my-5 py-5 text-center">
          Product not found
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
