import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "redux/slice/productSlice";
import { SORT_BRAND, SORT_CATEGORY, SORT_PRICE } from "redux/slice/filterSlice";
const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const currentCategories = ["All"].concat(
    products.map((item) => item.category)
  );
  const currentBrand = ["All"].concat(products.map((item) => item.brand));

  useEffect(() => {
    dispatch(SORT_CATEGORY({ products, category }));
  }, [dispatch, category, products]);

  useEffect(() => {
    dispatch(SORT_BRAND({ products, brand }));
  }, [dispatch, brand, products]);

  useEffect(() => {
    dispatch(SORT_PRICE({ products, price }));
  }, [dispatch, price, products]);


  const changeCategory = (catName) => {
    setCategory(catName);
  };
  const changeBrand = (brandName) => {
    setBrand(brandName);
  };
    const clearFilter=()=>{
      setCategory("All");
      setBrand("All");
      setPrice(maxPrice)
    }
  return (
    <div className={styles["product-filter"]}>
      <div className={styles["filter-item"]}>
        <div className={styles["filter-head"]}>Categories</div>
        <div className={styles["filter-body"]}>
          <div className={styles.categories}>
            {currentCategories?.map((cat, index) => (
              <button
                className={cat === category ? `${styles.active}` : ``}
                onClick={() => changeCategory(cat)}
                key={index}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["filter-item"]}>
        <div className={styles["filter-head"]}>Brand</div>
        <div className={styles["filter-body"]}>
          <div className={styles.brand}>
            {currentBrand?.map((item, index) => (
              <button
                className={brand === item ? `${styles.active}` : ``}
                onClick={() => changeBrand(item)}
                key={index}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["filter-item"]}>
        <div className={styles["filter-head"]}>price</div>
        <div className={styles["filter-body"]}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>
      <button className="btn btn-danger" onClick={clearFilter}>Clear filter</button>
    </div>
  );
};

export default ProductFilter;
