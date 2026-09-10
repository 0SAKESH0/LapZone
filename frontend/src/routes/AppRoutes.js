import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Admin from "../pages/Admin/Admin";
import Checkout from "../pages/Checkout/Checkout";
import Wishlist from "../pages/Wishlist/Wishlist";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Loading from "../pages/Loading/Loading";
import MigrateProducts from "../pages/MigrateProducts/MigrateProducts";
import MyOrders from "../pages/MyOrders/MyOrders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/loading"
          element={<Loading />}
        />

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route path="/my-orders" 
        element={<MyOrders />}
        />

        <Route
          path="/my-orders/:orderId"
          element={<OrderDetails />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
  path="/migrate-products"
  element={<MigrateProducts />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;