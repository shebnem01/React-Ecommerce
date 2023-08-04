import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import Products from "shared/components/Products/Products";
import ProductFilter from "feature/products/components/productFilter/ProductFilter";
import { BsFillGridFill, BsGrid1X2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_FİLTER, SORT_FİLTER } from "redux/slice/filterSlice";
import { selectProducts } from "redux/slice/productSlice";
const ProductsPage = () => {
  const [grid, setGrid] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SEARCH_FİLTER({ search, products }));
  }, [dispatch, products, search]);
  useEffect(() => {
    dispatch(SORT_FİLTER({ sort, products }));
  }, [dispatch, products, sort]);
  return (
    <div className={styles["products-page"]}>
      <div className={styles["product-top"]}>
        <div className={styles.actions}>
          <div className={styles.icons}>
            <BsFillGridFill onClick={() => setGrid(true)} size={23} />
            <BsGrid1X2Fill onClick={() => setGrid(false)} size={23} />
          </div>

          <span>
            <b>15</b> products found
          </span>
        </div>
        <div className={styles.search}>
          <input
            placeholder="Search by name or category"
            type="text"
            className="border p-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.sort}>
          <label>Sort:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">latest</option>
            <option value="lowest-price">lowest-price</option>
            <option value="highest-price">highest-price</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>
      <aside>
        <ProductFilter />
      </aside>
      <Products grid={grid} setGrid={setGrid} />
    </div>
  );
};

export default ProductsPage;
