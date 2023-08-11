import Footer from "feature/footer";
import Header from "feature/header";
import { AdminOnlyRoute } from "feature/header/HiddenLinks";
import ProductDetail from "feature/products/components/productDetail/ProductDetail";
import Admin from "pages/Admin";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Reset from "pages/Auth/Reset";
import Cart from "pages/Cart/Cart";
import Contact from "pages/Contact";
import Home from "pages/Home";
import ProductsPage from "pages/ProductsPage/ProductsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import BreadCrumb from "shared/components/BreadCrumb/BreadCrumb";
import { ROUTER } from "shared/constant/router";
function App() {
  return (
    <>
      <Header />
      <BreadCrumb/>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTER.HOME} replace />} />
        <Route path={ROUTER.HOME} element={<Home />} />
        <Route
          path={ROUTER.ADMIN + "/*"}
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
        <Route path={ROUTER.CART} element={<Cart />} />
        {/* <Route path={ROUTER.CONTACT} element={<Contact />} /> */}
        <Route path={ROUTER.LOGIN} element={<Login />} />
        <Route path={ROUTER.REGISTER} element={<Register />} />
        <Route path={ROUTER.RESET} element={<Reset />} />
        <Route path={ROUTER.PRODUCTS} element={<ProductsPage />} />
        <Route path={ROUTER.PRODUCT_DETAIL+"/:id"} element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
