import React from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/LandingPage/Footer";
import Header from "./../components/Bundling/Header";
import BundlingList from "./../components/Bundling/BundlingList"
import "./../components/Bundling/Bundling.css";
const Bundling = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BundlingList />
      <Footer />
    </>
  );
};
export default Bundling;
