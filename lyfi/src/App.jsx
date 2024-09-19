import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import LandingPage from "./pages/LandingPage";
import InfoProduct from "./pages/InfoProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Bundling from "./pages/Bundling";
import InfoBundling from "./pages/InfoBundling";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AddProductAdmin from "./pages/admin/addProductadmin";
import AddBundlingAdmin from "./pages/admin/addBundlingadmin";
import AddCategories from "./pages/admin/addCategories";
import ProductAdmin from "./pages/admin/ProductAdmin";
import BundlingAdmin from "./pages/admin/BundlingAdmin";
import EditProduct from "./pages/admin/EditProduct";
import EditBundlingAdmin from "./pages/admin/EditBundling";
import EditCategoriesAdmin from "./pages/admin/EditCategory";
import Category from "./pages/admin/Category";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Register from "./pages/Register";
import axios from "axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/infoproduct" element={<InfoProduct />} />
          <Route path="/bundling" element={<Bundling />} />
          <Route path="/infobundling" element={<InfoBundling />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/addproductadmin" element={<AddProductAdmin />} />
          <Route
            path="/admin/addbundlingadmin"
            element={<AddBundlingAdmin />}
          />
          <Route path="/admin/productadmin" element={<ProductAdmin />} />
          <Route path="/admin/addcategories" element={<AddCategories />} />
          <Route path="/admin/bundlingadmin" element={<BundlingAdmin />} />
          <Route path="/admin/editproduct" element={<EditProduct />} />
          <Route path="/admin/editbundling" element={<EditBundlingAdmin />} />
          <Route path="/admin/editcategory" element={<EditCategoriesAdmin />} />
          <Route path="/admin/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
