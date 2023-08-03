import React, { useEffect, useState } from "react";
import styles from "./Products.module.css";
import useFetchCollection from "shared/hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "redux/slice/productSlice";
import ProductItem from "feature/products/components/productItem/ProductItem";
import { SEARCH_FİLTER, selectFilteredProducts } from "redux/slice/filterSlice";
const Products = ({ grid }) => {
  const [search, setSearch] = useState("");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SEARCH_FİLTER({ search, products }));
  }, [dispatch, products, search]);

  const filteredProducts = useSelector(selectFilteredProducts);

  const { data, isLoading } = useFetchCollection("products");
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data));
  }, [dispatch, data]);

  return (
    <div className={grid ? `${styles["products-grid"]}` : `${styles.products}`}>
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
