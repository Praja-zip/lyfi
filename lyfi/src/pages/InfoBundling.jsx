import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/LandingPage/Footer";
import ImageProduct from "../components/InfoProduct/ImageProduct";
import DetailProduct from "../components/InfoProduct/DetailBundling";
import Product from "../components/LandingPage/Product";
import Loading from "../components/Loading/Loading";

const InfoBundling = () => {
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
          <div className="container-info-product text-center">
            <div className="row">
              <div className="col">
                <ImageProduct />
              </div>
              <div className="col">
                <DetailProduct />
              </div>
            </div>
          </div>
          <Product />
          <Footer />
        </>
      )}
    </>
  );
};
export default InfoBundling;
