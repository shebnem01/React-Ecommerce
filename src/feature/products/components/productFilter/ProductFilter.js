import React, { useEffect, useState } from "react";
import styles from "./ProductFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "redux/slice/productSlice";
import { SORT_BRAND, SORT_CATEGORY } from "redux/slice/filterSlice";
const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const currentCategories = ["All"].concat(
    products.map((item) => item.category)
  );
  const currentBrand = ["All"].concat(products.map((item) => item.brand));
console.log(currentCategories)
  useEffect(() => {
    dispatch(SORT_CATEGORY({ products, category }));
  }, [dispatch, category, products]);
  useEffect(() => {
    dispatch(SORT_BRAND({ products, brand }));
  }, [dispatch, brand, products]);
  const changeCategory = (catName) => {
    setCategory(catName);
  };
  const changeBrand = (brandName) => {
    setBrand(brandName);
  };
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
          <input type="range" name="" id="" min={1500} />
        </div>
      </div>
      <button className="btn btn-danger">Clear filter</button>
    </div>
  );
};

export default ProductFilter;
