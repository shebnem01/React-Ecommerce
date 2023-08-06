import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import Products from "shared/components/Products/Products";
import ProductFilter from "feature/products/components/productFilter/ProductFilter";
import { BsFillGridFill, BsGrid1X2Fill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  SEARCH_FİLTER,
  SORT_FİLTER,
  selectFilteredProducts,
} from "redux/slice/filterSlice";
import { selectProducts } from "redux/slice/productSlice";
import Search from "shared/components/Search/Search";
const ProductsPage = () => {
  const [grid, setGrid] = useState(true);
  const filteredProducts = useSelector(selectFilteredProducts);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(SEARCH_FİLTER({ search, products }));
    setSearch("");
  },[dispatch,search,products]);
  useEffect(() => {
    dispatch(SORT_FİLTER({ sort, products }));
  }, [dispatch, products, sort]);
  return (
    <div className="container">
      <div className={styles["products-page"]}>
        <div className="row">
          <div className="col-lg-3">
            <aside>
              <ProductFilter />
            </aside>
          </div>
          <div className="col-lg-9">
            <div className={styles["product-top"]}>
              <div className={styles.actions}>
                <div className={styles.icons}>
                  <BsFillGridFill onClick={() => setGrid(true)} size={23} />
                  <BsGrid1X2Fill onClick={() => setGrid(false)} size={23} />
                </div>

                <span>
                  <b>
                    {filteredProducts.length > 0 && filteredProducts.length}{" "}
                  </b>
                  {filteredProducts.length > 0
                    ? `Products found`
                    : `Product not found`}
                </span>
              </div>
              <Search
                search={search}
                onSubmit={onSubmit}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className={styles.sort}>
                <label>
                  <b>Sort</b>:
                </label>
                <select
                  className={`${styles.select} form-select`}
                  aria-label=".form-select-lg example"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="latest">latest</option>
                  <option value="lowest-price">lowest-price</option>
                  <option value="highest-price">highest-price</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>
            <Products grid={grid} setGrid={setGrid} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
