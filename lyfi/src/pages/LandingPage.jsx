import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/LandingPage/Home";
import Product from "./../components/LandingPage/Product";
import About from "./../components/LandingPage/About";
import Mail from "./../components/LandingPage/Mail";
import Footer from "./../components/LandingPage/Footer";
import Categories from "./../components/LandingPage/Categories";
import Loading from "./../components/Loading/Loading";

const LandingPage = () => {
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
          <Home />
          <Product />
          <About />
          <Mail />
          <Footer />
        </>
      )}
    </>
  );
};

export default LandingPage;
