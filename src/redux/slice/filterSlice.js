import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    SEARCH_FİLTER: (state, action) => {
      const { search, products } = action.payload;
      let newProduct = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = newProduct;
    },
    SORT_FİLTER: (state, action) => {
      let newProducts = [];
      const { sort, products } = action.payload;
      if (sort === "latest") {
        newProducts = products;
      }
      if (sort === "lowest-price") {
        newProducts = [...products].sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "highest-price") {
        newProducts = [...products].sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "A-Z") {
        newProducts = [...products].sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "Z-A") {
        newProducts = [...products].sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredProducts = newProducts;
    },
    SORT_CATEGORY: (state, action) => {
      const { category, products } = action.payload;
      let newProducts = [];
      if (category === "All") {
        newProducts = products;
      }
      newProducts = products.filter((item) => item.category === category);
      state.filteredProducts = newProducts;
    },
    SORT_BRAND: (state, action) => {
      const { brand, products } = action.payload;
      console.log(action.payload)
      let newProducts = [];
      if (brand === "All") {
        newProducts = products;
      }
      newProducts = products.filter((item) => item.brand === brand);
      state.filteredProducts = newProducts;
    },
  },
});
export const selectFilteredProducts = (state) => state.filter.filteredProducts;
export const { SEARCH_FİLTER, SORT_FİLTER, SORT_CATEGORY, SORT_BRAND } =
  filterSlice.actions;

export default filterSlice.reducer;
