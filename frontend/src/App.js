import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppStyled } from "./AppStyle";
import Shop from "./components/Routes/SHOP/index";
import Home from "./components/Routes/Home";
import Layout from "./components/Routes/Layout";
import ProductDetail from "./components/ProductDetail";
import Admin from "./components/Page/Admin/Admin";
import CreateProduct from "./components/Page/Admin/CreateProduct/CreateProduct";
import Checkout from "./components/Checkout/Checkout";
import CreateCategories from "./components/Page/Admin/CreateCategories/CreateCategories";
import RegisterForm from "./components/Login/RegisterForm";
import LoginForm from "./components/Login/LoginForm";
import WhoAmI from "./components/Login/WhoAmI";
import LoginPage from "./components/Login/LoginPage/LoginPage";
import Cart from "./components/cart";

function App() {
  return (
    <AppStyled className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="detailts/:idProduct" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favorites" />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path="product" />
          <Route path="create/product" element={<CreateProduct />} />
          <Route path="create/category" element={<CreateCategories />} />
        </Route>

        <Route path="/login" element={<LoginPage />}>
          <Route index element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>

        <Route path="/login/whoami" element={<WhoAmI />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppStyled>
  );
}

export default App;
