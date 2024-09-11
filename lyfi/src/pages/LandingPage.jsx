import React from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/LandingPage/Home";
import Product from "./../components/LandingPage/Product";
import About from "./../components/LandingPage/About";
import Mail from "./../components/LandingPage/Mail";
import Footer from "./../components/LandingPage/Footer";
import Categories from "./../components/LandingPage/Categories"

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Product />
      <About />
      <Categories />
      <Mail />
      <Footer />
    </>
  );
};

export default LandingPage;
