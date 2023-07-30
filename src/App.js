import Footer from "components/Footer";
import Header from "components/Header";
import Admin from "pages/Admin";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Reset from "pages/Auth/Reset";
import Contact from "pages/Contact";
import Home from "pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTER } from "shared/constant/router";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={ROUTER.HOME} replace />} />
        <Route path={ROUTER.HOME} element={<Home />} />
        <Route path={ROUTER.ADMIN} element={<Admin />} />
        <Route path={ROUTER.CONTACT} element={<Contact />} />

        <Route path={ROUTER.LOGIN} element={<Login />} />
        <Route path={ROUTER.REGISTER} element={<Register />} />
        <Route path={ROUTER.RESET} element={<Reset />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
