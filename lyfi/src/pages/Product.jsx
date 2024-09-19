import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import Header from "../components/Product/Header";
import ProductList from "../components/Product/ProductList";
import "./../components/Product/Product.css";
import "./../components/InfoProduct/InfoProduct.css";
import Loading from "../components/Loading/Loading";

const Product = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="product">
            <Header />
            <ProductList />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Product;
