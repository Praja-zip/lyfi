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
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/InfoProduct" element={<InfoProduct />} />
          <Route path="/Bundling" element={<Bundling />} />
          <Route path="/InfoBundling" element={<InfoBundling />} />
          <Route path="/Admin" element={<DashboardAdmin />} />
          <Route path="/Admin/AddProductAdmin" element={<AddProductAdmin />} />
          <Route path="/Admin/AddBundlingAdmin" element={<AddBundlingAdmin />} />
          <Route path="/Admin/ProductAdmin" element={<ProductAdmin />} />
          <Route path="/Admin/AddCategories" element={<AddCategories />} />
          <Route path="/Admin/BundlingAdmin" element={<BundlingAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
